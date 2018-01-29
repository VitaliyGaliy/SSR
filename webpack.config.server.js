const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
module.exports = {
    entry: [
        'webpack/hot/poll?1000',
        './src/server/index'
    ],
    watch: true,
    target: 'node',
    externals: [nodeExternals({
        whitelist: ['webpack/hot/poll?1000']
    })],
    module: {
      rules: [
          { test: /\.js?$/,
            use: "babel-loader",
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  plugins: [
                    'syntax-dynamic-import',
                    'dynamic-import-node',
                    'transform-runtime'
                  ],
                  presets: [
                    'react',
                    // ['env', { targets: { node: true } }],
                  ],
                }
              }
            ]
          },
      ],
    },
    plugins: [
        new StartServerPlugin('server.js'),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "BUILD_TARGET": JSON.stringify('server')
            }
        }),
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.js'
    }
}
