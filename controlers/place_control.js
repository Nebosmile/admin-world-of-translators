const targetSchema = require('../schemas/game/place');
const fs = require('fs');

// console.log(db);
module.exports={
    async save(ctx){
		// console.log('save');
		var activeSchema=new targetSchema({
			creatures:ctx.request.body.creatures,
            words:ctx.request.body.words,
            name:ctx.request.body.name,
		})

		try{
			var save=  await activeSchema.save(function (err, result) {

            })
			ctx.type ='json';
			ctx.body ={
                status:200,
				result:save,
			}

		}catch(err){
			if(err.name !='ValidationError') ;
			console.log(err);
			ctx.throw(400, err.message);
		}

    },
	async edit(ctx){
        var activeSchema =  await targetSchema.findById(ctx.params.id);
        if(!activeSchema){
            ctx.throw(404, 'not found')
        }

        const upSchema= await activeSchema.set(ctx.request.body).save();

        ctx.body = upSchema;


	},
    async remove(ctx){
        var obj={};
        obj.result = await targetSchema.remove({'_id':ctx.params.id});
        obj.status='200';
        ctx.type='json';
        ctx.body=obj;

    },
	async search_item(ctx){
		console.log('search');
        console.log(ctx.request.body);
        var obj={}

        if(ctx.request.body._id){
            obj.result = await targetSchema.findOne({'_id':ctx.request.body._id});
        }else{
            obj.result =    await targetSchema.find({});
        }
        if(!obj.result || obj.result.length < 1){
            obj.result='';
            obj.status='404';
            obj.error='not found'
        }else{
            obj.status='200';

        }
        ctx.type='json';
        ctx.body=obj


	},
}
