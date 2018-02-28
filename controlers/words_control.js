const wordShema = require('../schemas/word');
const fs = require('fs');

// console.log(db);

module.exports={
    async save(ctx){
		// console.log('save');
		var word=new wordShema({
			english:ctx.request.body.english,
			russian:ctx.request.body.russian,
			ukrainian:ctx.request.body.ukrainian,
		})

		try{
			console.log('dfgh');
			var word_save=  await word.save(function (err, result) {

            })
			ctx.type ='json';
			ctx.body ={
                status:200,
				result:word_save,
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
        var word =  await wordShema.findById(ctx.params.id);
        if(!word){
            ctx.throw(404, 'User not found')
        }

        const updWordr= await word.set(ctx.request.body).save();

        ctx.body = updWordr;


	},
	async search_item(ctx){
		console.log('search');
        console.log(ctx.request.body);
        var obj={}

        if(ctx.request.body._id){
            obj.result = await wordShema.findOne({'_id':ctx.request.body._id});
        }else{
            obj.result =    await wordShema.find({});
        }
        obj.status='200';
        ctx.type='json';
        ctx.body=obj
	},
	async delete_item(ctx){

	},
}
