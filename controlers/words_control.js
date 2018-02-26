const wordShema = require('../schemas/word');
const fs = require('fs');

// console.log(db);

module.exports={
    async save(ctx){
		// console.log('save');
		console.log(ctx.request.body.english);
		var word=new wordShema({
			english:ctx.request.body.english,
			// russian:ctx.request.body.russian,
			// ukrainian:ctx.request.body.ukrainian,
		})

		try{
			console.log('dfgh');
			await word.save(function (err, result) {

            })
			ctx.type ='json';
			ctx.body ={
				result:'saved'
			}

		}catch(err){
			if(err.name !='ValidationError') throw err;
			console.log(err);
			ctx.throw(400, err.message);
		}

    },
	async edit(ctx){

	},
	async search_item(ctx){
		console.log('search');
		var result;
		// await wordShema.findOne({english:ctx.request.body.english},(err, element)=>{
		// 	if(err){
		// 		return done(err);
		// 	}
        //
		// 	result= element
		// });
        await wordShema.find({},(err, element)=>{
            if(err){
                return done(err);
            }

            result= element
        });
        var obj={}
        obj.result=result;
        obj.status='200';
		ctx.type='json';
		ctx.body=obj
	},
	async delete_item(ctx){

	},
}
