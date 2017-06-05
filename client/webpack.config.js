module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }, {
        test: /\.(gif|png|jpe?g)$/i,
        exclude: /node_modules/,
        loader: 'file-loader?name=img/[name].[ext]'
    },{
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'resolve-url-loader']
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
