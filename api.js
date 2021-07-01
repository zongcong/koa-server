const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const cors = require('koa2-cors');
const {Storage} = require('@google-cloud/storage')

app.use(cors())

let home = new Router()
// 子路由1
home.get('/', async (ctx) => {
  let html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `
  ctx.body = html
})

// 子路由2
let page = new Router()
page.get('/404', async (ctx) => {
  ctx.body = '404 page!'
}).get('/helloworld', async (ctx) => {
  const storage = new Storage();
  const bucket = storage.bucket('albums');
  //-
  // Upload a file from a local path.
  //-
  bucket.upload('/test-bydjz/path/image.png', function (err, file, apiResponse) {
    // Your bucket now contains:
    // - "image.png" (with the contents of `/local/path/image.png')
    console.log(err, file, apiResponse)
    //
    // `file` is an instance of a File object that refers to your new file.
  });
  ctx.status = 200;
  ctx.body = {
    success: true,
    msg: '',
    data: {
      app_key: '27985254',
      secret: '1212',
      api: [
        {
          method: 'taobao.tbk.dg.material.optional',
          adzone_id: 'mm_124732562_33032153_109589700162',
          desc: '物料搜索'
        },
        {
          method: 'taobao.tbk.dg.optimus.material',
          adzone_id: 'mm_124732562_33032153_109589750184',
          desc: '物料精选'
        }
      ]
    }
  }
})

// 装载所有子路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

// app.use( async ( ctx ) => {
//   ctx.body = 'hello koa2'
// })

app.listen(3000, () => {
  console.log(Storage)
  console.log(`serve success http://localhost:3000`)
})
