const Router = require('koa-router');
const router = new Router({
	prefix:'/admin'
});
const serve = require('koa-static');


const base_controller = require('./controlers/index');
const word_controller = require('./controlers/words_control');
const character_controller = require('./controlers/character_control');
const creature_controller = require('./controlers/creature_control');
const battle_controller = require('./controlers/battlesessions');
const users_controller = require('./controlers/user');
const place_controller = require('./controlers/place_control');

const auth = require('./controlers/login');



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
router.post('/word/edit/:id',word_controller.edit);
router.post('/word/delete/:id',word_controller.remove);
router.post('/word/search',word_controller.search_item);
router.post('/word/get_random_word',word_controller.get_random_word);

router.post('/characters/add',character_controller.save);
router.post('/characters/edit/:id',character_controller.edit);
router.post('/characters/delete/:id',character_controller.remove);
router.post('/characters/search',character_controller.search_item);


router.post('/creature/add',creature_controller.save);
router.post('/creature/edit/:id',creature_controller.edit);
router.post('/creature/delete/:id',creature_controller.remove);
router.post('/creature/search',creature_controller.search_item);

router.post('/place/add',place_controller.save);
router.post('/place/edit/:id',place_controller.edit);
router.post('/place/delete/:id',place_controller.remove);
router.post('/place/search',place_controller.search_item);

router.post('/users/add',users_controller.save);
//router.post('/users/edit/:id',users_controller.edit);
router.post('/users/login/',auth.login);
router.post('/users/jwtauth/',auth.loginjwt);
router.post('/users/search',users_controller.search_item);

router.post('/battlesessions/delete/:id',battle_controller.remove);
router.post('/battlesessions/search',battle_controller.search_item);



module.exports= router;
