const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js', // Entry point (needed for dev server, even if not bundling)
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/index.js', // Output JS file (matches your original)
    clean: true, // Clean /dist on build
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        include: path.resolve(__dirname, 'src/css'),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          context: path.resolve(__dirname, 'src/css'),
          to: 'css',
        },
        { from: '**/*', context: path.resolve(__dirname, 'src/js'), to: 'js' },
        {
          from: '**/*',
          context: path.resolve(__dirname, 'src/img'),
          to: 'img',
        },
      ],
    }),
  ],
  optimization: {
    minimizer: [
      '...', // Extend existing minimizers (i.e. `terser-webpack-plugin` for JS)
      new CssMinimizerPlugin(),
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    liveReload: true,
    watchFiles: ['src/**/*'], // Watch all source files for changes
  },
  // No need for module.rules if not transpiling or processing files
};
