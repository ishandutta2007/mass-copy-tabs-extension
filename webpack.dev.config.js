const HTMLPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const ZipPlugin = require('zip-webpack-plugin');

module.exports = {
  entry: {
    options: './src/options.tsx',
    popup: './src/popup.tsx',
    content: './src/content.tsx',
    background: './src/background.tsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx|jsx|ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        ],
      },
      {
         test: /\.scss$/,
         use: [{
            loader: "style-loader"
          }, {
            loader: "css-loader"
          }, {
            loader: "sass-loader"
         }]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new HTMLPlugin({
      chunks: ['options'],
      filename: 'options.html',
      title: 'Options page title',
    }),
    new HTMLPlugin({
      chunks: ['popup'],
      filename: 'popup.html',
    }),
    new CopyPlugin([
      { from: './src/_locales/', to: './_locales' },
      { from: './src/assets', to: './assets' },
      { from: './src/manifest.json', to: './manifest.json' },
    ]),
    new ZipPlugin({
      filename: 'chromium.zip'
    })
  ],
  optimization: {
    minimize: false,
    minimizer: [    ]
  },
  mode: 'production',
  stats: 'minimal',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};
