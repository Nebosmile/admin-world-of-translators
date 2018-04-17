const BaseSchema = require('../schemas/game/battle.js');
const fs = require('fs');

// console.log(db);

module.exports={
    async remove(ctx){
        var obj={};
        obj.result = await BaseSchema.remove({'_id':ctx.params.id});
        obj.status='200';
        ctx.type='json';
        ctx.body=obj;

    },
	async search_item(ctx){
		console.log('search');
        console.log(ctx.request.body);
        var obj={}

        if(ctx.request.body._id){
            obj.result = await BaseSchema.findOne({'_id':ctx.request.body._id});
        }else{
            obj.result =    await BaseSchema.find({});
        }
        if(!obj.result){
            obj.status='404';
            obj.result='not found'
        }else{
            obj.status='200';

        }
        ctx.type='json';
        ctx.body=obj


	},

}
