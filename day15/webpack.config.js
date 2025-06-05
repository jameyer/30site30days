const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin'); // Add this line

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/index.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        include: path.resolve(__dirname, 'src/css'),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        type: 'asset',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css', 
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
      '...',
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['mozjpeg', { quality: 80 }],
              ['pngquant', { quality: [0.7, 0.9] }],
              ['svgo', { plugins: [{ removeViewBox: false }] }],
            ],
          },
        },
      }),
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
    watchFiles: ['src/**/*'],
  },
};

