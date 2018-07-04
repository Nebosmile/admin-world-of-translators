const BaseSchema = require('../schemas/game/battle.js');
const targetSchema = require('../schemas/game/place');
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

        var newobj = await updateunsver(obj.result)
        if(!obj.result){
            obj.status='404';
            obj.result='not found'
        }else{

            obj.status='200';
            ctx.type='json';
            ctx.body=obj

        }
	},

}
async function updateunsver(result){
    var places = await search_location()
    if(places){
        result.forEach((item,index)=>{
            item.placename=places[item.location]
        })
    }
    return result;

}
async function  search_location(){
    var obj={}
    try{
        var result = await targetSchema.find({});
    }catch(e){
        console.log(e);
    }
    if(result){
        result.forEach((item,key)=>{
            obj[item._id]=item.name
        })
    }else{
        obj=false
    }
    console.log(obj);


    return obj
}
