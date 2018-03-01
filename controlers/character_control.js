const BaseSchema = require('../schemas/game/characters.js');
const fs = require('fs');

// console.log(db);

module.exports={
    async save(ctx){
		// console.log('save');
		var target_schema=new BaseSchema(ctx.request.body)

		try{
			var target_save=  await target_schema.save(function (err, result) {

            })
			ctx.type ='json';
			ctx.body ={
                status:200,
				result:target_save,
			}

		}catch(err){
			if(err.name !='ValidationError') ;
			console.log(err);
			ctx.throw(400, err.message);
		}

    },
	async edit(ctx){
        // var word=new wordShema({
        //     english:ctx.request.body.english,
        //     russian:ctx.request.body.russian,
        //     ukrainian:ctx.request.body.ukrainian,
        // })
        // var obj={}
        var target_schema =  await BaseSchema.findById(ctx.params.id);
        if(!target_schema){
            ctx.throw(404, 'User not found')
        }

        const up_shema= await target_schema.set(ctx.request.body).save();

        ctx.body = up_shema;


	},
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
	async delete_item(ctx){

	},
}
