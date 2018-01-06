const merge = require('webpack-merge')
const base = require('./webpack.base.js')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

module.exports = merge(base, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS: {
        output: {
          comments: false
        },
        compress: {
          warnings: false
        }
      }
    })
  ]
})
