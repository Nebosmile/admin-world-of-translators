const Router = require('koa-router');
const router = new Router({
	prefix:'/admin'
});
const serve = require('koa-static');


const base_controller = require('./controlers/index');
const word_controller = require('./controlers/words_control');



router.use('/*',async (ctx,next)=>{
	if(ctx.databaseconection){
		await next()
	}else{
	   	ctx.status = 200
	   	ctx.type ='json';
	   	ctx.body ={
	       	error:'Database conection error'
	   	}
	}

});
router.get('/',base_controller.get_index);
router.post('/',base_controller.post_index)

router.post('/word/add',word_controller.save);
router.post('/word/search',word_controller.search_item)



module.exports= router;
