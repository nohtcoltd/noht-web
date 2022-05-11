const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: [
    path.resolve(__dirname, 'web/scss/main.scss'),
    path.resolve(__dirname, 'web/scss/2_5dbutton.scss'),
    path.resolve(__dirname, 'web/scss/turn_box.scss'),
    path.resolve(__dirname, 'web/scss/alccalc.scss'),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'web/css')
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'assets'),
      "node_modules"
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                  path.resolve(__dirname, 'assets')
              ]
            }
          }
        ]
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      path: path.resolve(__dirname, 'web/css')
    }),
    // new VueLoaderPlugin(),
    // // new UglifyJSPlugin({
    // //   parallel: true,
    // //   cache: true,
    // //   exclude: /node_modules/,
    // //   uglifyOptions: {
    // //     warnings: false,
    // //     output: {
    // //       comments: false,
    // //       beautify: false,
    // //     }
    // //   }
    // // }),
    // new ModernizrWebpackPlugin({
    //   options: ['setClasses'],
    //   'feature-detects': [
    //     'css/transitions',
    //     'touchevents'
    //   ]
    // })
  ],
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: true
  },
  stats: {
    children: false,
    modules: false
  }
};