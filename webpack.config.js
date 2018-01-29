const webpack = require('webpack');
const path = require('path');
const dist = path.join(__dirname, 'dist');


module.exports = [
  {
    name: 'client',
        target: 'web',
        entry: {
        vendor: [
          'react',
          'react-dom',
          'react-router-dom',
          'react-redux',
        ],
        app: './src/client/index.js'
      },
        output: {
          filename: '[name]-[hash].js',
          publicPath: '/assets/',
          path: dist,
        },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                'syntax-dynamic-import'
              ],
              presets: [
                'react',
                ['env', {
                  targets: {browsers: ['last 2 versions']},
                  modules: false
                }]
              ]
            }
          }
        ]
        }
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'manifest'],
        minChunks: Infinity
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 1
      })
    ]
  },
  {
      name: 'server',
      target: 'node',
      entry: './src/server/main',
      output: {
          path: dist,
          filename: 'server.js',
          libraryTarget: 'commonjs2',
          publicPath: '/assets/'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  plugins: [
                    'syntax-dynamic-import',
                    'dynamic-import-node',
                  ],
                  presets: [
                    'react',
                  ]
                }
              }
            ]
          }
        ]
      },
    },
];
