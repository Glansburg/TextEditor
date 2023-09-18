const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'TODOs List'
      }),
    
    new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'src-sw.js',
    }), 
      new GenerateSW(),
      new WebpackPwaManifest({
        fingerprints: false,
        name: 'TODOs List App',
        short_name: 'TODOs',
        description: 'Keep track of important tasks.',
        background_color: "#7eb4e2",
        theme_color: "#7eb4e2",
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('writer2.png'),
            sizes: [16, 24, 32, 64, 96, 144], // multiple sizes
            destination: path.join('assets', 'icons'),
            purpose: "any",
            fingerprints: false
          }
        ]
      })

      
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
        
      ],
    },
  };
};
