const express = require('express');
const app = express();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const config = require('../../webpack.config.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  serverSideRender: true,
  hot: true
}));

app.use(webpackHotMiddleware(compiler.compilers.find(compiler => compiler.name === 'client')));
app.use(webpackHotServerMiddleware(compiler));

app.listen(8000);
