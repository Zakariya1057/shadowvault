const path = require('path')

module.exports = {
  target: 'node',
  mode: 'none',
  entry: './src/index.ts',
  optimization: {
    minimize: false, // Disable Terser plugin
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
      '@entities': path.resolve(__dirname, 'src/entities/'),
      '@libs': path.resolve(__dirname, 'src/libs/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@providers': path.resolve(__dirname, 'src/providers/'),
      '@tests': path.resolve(__dirname, 'tests/'),
    },
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2', // or 'umd'
  },
}
