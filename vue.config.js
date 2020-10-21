'use strict'
// eslint-disable-next-line no-undef,no-unused-vars
const path = require('path')
// eslint-disable-next-line no-undef
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  runtimeCompiler: true,
  // baseUrl: process.env.NODE_ENV === 'production' ? './' : '',
  publicPath: process.env.NODE_ENV === 'production'
    ? './' : '/',
  // chainWebpack: config => {
  //     config.entry('polyfill').add('@babel/polyfill')
  //     config.resolve.alias
  //         .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  //         .set('_c', resolve('src/views'))
  // }
}