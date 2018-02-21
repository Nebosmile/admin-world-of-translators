const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const config = require('./config.js');
const nuxtoption =require('./nuxt.config.js');

const mongoose = require('mongoose');
mongoose.Promise=Promise;

var database= require('./config');



var app = new Koa();
app.use(async (ctx, next) => {
  // in the future we'll extend this
  ctx.set('Access-Control-Allow-Origin', '*');

  await next();
});

const handlers = fs.readdirSync('./handlers').sort();
handlers.forEach((handler)=>require('./handlers/'+ handler).init(app));

var db_error =false
var db =  mongoose.connect(database.db,database.options,(err) =>{
    if(err){
        db_error=err
    }
});

// app.use(async(ctx,next)=>{
//     if(db_error){
//         console.log(db_error);
//         ctx.status = 200
//         ctx.type ='json';
//         ctx.body ={
//             error:'Database conection error'
//         }
//     }else{
//         await next();
//     }
// })

app.use(async(ctx,next)=>{
    console.log(db_error);
    if(db_error){
        ctx.databaseconection=false;

    } else{
        ctx.databaseconection=true;
    }
    console.log(ctx.databaseconection);
    await next();

})

app.use(require('./routers').routes());
const {Nuxt, Builder} = require('nuxt')
const options = {}

const nuxt = new Nuxt(nuxtoption);
async function builderok (){
    const builder = new Builder(nuxt)
    await builder.build()
}
 builderok();

app.use(async (ctx, next) => {
    await next()
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res)
      // , promise => {
      //   // nuxt.render passes a rejected promise into callback on error.
      //   promise.then(resolve).catch(reject)
      // })
    })
})


app.listen(config.port)
