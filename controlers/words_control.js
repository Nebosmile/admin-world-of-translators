const wordShema = require('../schemas/word');
const fs = require('fs');

function 	randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
	rand = Math.round(rand);
	return rand;
}

// console.log(db);
module.exports={
    async save(ctx){
		// console.log('save');
		var word=new wordShema({
			english:ctx.request.body.english,
			russian:ctx.request.body.russian,
			ukrainian:ctx.request.body.ukrainian,
            name:ctx.request.body.english,
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
        var wordedit = ctx.request.body;
        wordedit.name=word.english
        const updWordr= await word.set(wordedit).save();

        ctx.body = updWordr;


	},

    async remove(ctx){
        var obj={};
        obj.result = await wordShema.remove({'_id':ctx.params.id});
        obj.status='200';
        ctx.type='json';
        ctx.body=obj;

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
        if(!obj.result){
            obj.status='404';
            obj.result='not found'
        }else{
            obj.status='200';

        }

        // await upnames()
        ctx.type='json';
        ctx.body=obj


	},
	// async get_random_word(ctx){
    //     var obj={};
    //     var last_word=ctx.request.body._id;
    //     var newword;
    //     var result =  await wordShema.find({});
    //     console.log(result);
    //
    //     function check_last_word(lastword) {
    //         var rand;
    //         if(result.length>1){
    //             rand = this.randomInteger(0, result.length-1);
    //             if(result[rand]._id!=lastword._id){
    //                 obj.result=result[rand]
    //             }else{
    //                  check_last_word(lastword)
    //             }
    //         }  else{
    //             obj.result=result
    //         }
    //     }
    //     console.log(obj.result);
    //     ctx.type='json';
    //     ctx.body=obj
	// },
    async get_random_word(ctx){
            var obj={};
            var last_word=ctx.request.body._id;
            var newword;
            var result =  await wordShema.find({});
            var rand = randomInteger(0, result.length-1);
            obj.result={};
            obj.result=result[rand];
            ctx.type='json';
            ctx.body=obj
    }
}

async function upnames(){
    // var word=new wordShema({
    //     english:ctx.request.body.english,
    //     russian:ctx.request.body.russian,
    //     ukrainian:ctx.request.body.ukrainian,
    // })
    var obj={}
    var result =    await wordShema.find({},(err,items)=>{
        items.forEach((item)=>{
            item.name=item.english;
            try{
                item.save();
            }catch(e){
                console.log(e);
            }

        })
    })

    // var word = ctx.request.body;
    // word.name=word.english
    // const updWordr= await word.set(ctx.request.body).save();
    //
    // ctx.body = updWordr;


}
