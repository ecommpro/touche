import webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import path from 'path'

const libraryName = 'touche'
const libraryFilename = 'touche'
const outputFile = libraryFilename + '.js'

export default {
  context: __dirname + "/src",
  entry: [
    "webpack-hot-middleware/client?path=/__webpack_hmr&reload=true",
    "./index"
  ],
  devtool: 'source-map',
  output: {
    path: __dirname + "/dist",
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    publicPath: '/dist/'
  },
  resolve: {
    modules: [
      "dev_modules",
      "node_modules"
    ],
    alias: {
      touche: path.resolve(__dirname, 'src/')
    }
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: '/(node_modules|bower_components)/'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    //new BundleAnalyzerPlugin()
  ],
  mode: 'development',
}