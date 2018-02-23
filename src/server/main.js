import React from 'react';
import { StaticRouter } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { flushServerSideRequirePaths } from 'react-loadable';

import Html from './Html';
import App from '../client/pages/App';
import createStore from '../common/redux/store';
import FetchProvider from '../client/FetchProvider';

 function serverRenderer({ clientStats, serverStats, foo }) {

   return (req, res, next) => {

      function renderApp(store, req, res, fetches) {
        return ReactDOMServer.renderToString(
          <Provider store={store}>
            <FetchProvider fetches={fetches}>
              <StaticRouter location={req.url} context={{}}>
                <App />
              </StaticRouter>
            </FetchProvider>
          </Provider>
        );
      }
      let args;
     async function render(req, res) {
      const modules1 = clientStats.modules
        // Waiting for https://github.com/webpack/webpack/issues/4141
        .filter(({identifier}) => !/node_modules/.test(identifier.split('!').pop()))
        .map(({chunks, identifier}) => ({identifier: identifier.split('!').pop(), chunks}));

      const chunks1 = clientStats.chunks
        .map(({id, files}) => ({id, files}));

      const mod = {};
      const bund = {};


      modules1.forEach((module) => {
          mod[module.identifier] = module.chunks;
      });

      chunks1.forEach((chunk) => {
        bund[chunk.id] = chunk.files;
      })

      const store = createStore();

      // First render to collect all fetches
      const fetches = [];
      renderApp(store, req, res, fetches);
      const promises = fetches.map(fetch => fetch(store));
      await Promise.all(promises);

      const requires = flushServerSideRequirePaths();

      console.log('requires', requires);
      const scripts = [];

      const mainScripts = clientStats.assetsByChunkName;

      requires.forEach((file) => {
        const matchedBundles = modules[`${file}.js`];
        matchedBundles.forEach((bundle) => {
          bundles[bundle].forEach((script) => {
            scripts.unshift(script);
          });
        });
      });

      const html = renderApp(store, req, res);

      const markup = ReactDOMServer.renderToString(
        <Html
          html={html}
          state={store.getState()}
          scripts={scripts}
          mainScripts={mainScripts}
        />,
      );

      res.status(200).send(`<!DOCTYPE html>${markup}`);

    }

    render(req, res);
  }
}

export default serverRenderer;
