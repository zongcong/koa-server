const Koa = require('koa')
const app = new Koa()
const path = require('path')
const static = require('koa-static')
const { Storage } = require('@google-cloud/storage')
// 解决刷新 404 https://github.com/ishen7/koa2-connect-history-api-fallback#readme
const { historyApiFallback } = require('koa2-connect-history-api-fallback');
// 静态资源目录对于相对入口文件index.js的路径
const staticPath = '/dist'

app.use(historyApiFallback({ whiteList: ['/api'] }));

app.use(static(
  path.join( __dirname,  staticPath)
))

app.listen(80, () => {
  console.log(Storage)
  console.log(`serve success http://nkfmanage.qkagame.net`)
})
