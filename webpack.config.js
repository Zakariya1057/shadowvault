module.exports = {
  target: 'node',
  mode: 'none',
  entry: './src/register.ts',
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
  },
  output: {
    filename: 'index.js',
    path: __dirname + '/dist',
    libraryTarget: 'commonjs2', // or 'umd'
  },
}
