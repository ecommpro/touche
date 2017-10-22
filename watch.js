import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import browserSync from 'browser-sync'

import webpackConfig from './webpack.config.babel'

const bundler = webpack(webpackConfig)

browserSync.init({
  server: {
    baseDir: '.',
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: '/dist/'
      }),
      webpackHotMiddleware(bundler, {
        log: browserSync.notify
      })
    ]
  },
  startPath: "/examples/index.html",
})