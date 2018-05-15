const UserSchema = require('../schemas/user');
const mongoose = require('mongoose');
const fs = require('fs');

// console.log(db);

module.exports={
    async get_index(ctx){
        ctx.type ='html';
        ctx.body = fs.createReadStream('public/builds.html')
    },
    async save(ctx){
        console.log(ctx.request.body);
        var userobj={}
        for(var key in ctx.request.body){
            userobj[key]=ctx.request.body[key]
        }
        var user =new UserSchema(userobj)
            try{

                var result= await user.save(function (err, elem) {

                })

                ctx.type ='json';
                ctx.body = {
                    status:200,
                    result:result
                }

            }catch(err){
                if(err.name !='ValidationError') throw err;
                console.log(err);
                ctx.throw(400, err.message);
            }


    },
    async login(ctx){

        var hash;
        var isuser =  await UserSchema.findOne({"login":ctx.request.body.login},(err,userr)=>{
            console.log(userr);
            if (userr==null) {
                return
            }
            hash = userr.checkPassword(ctx.request.body.password);
            console.log(hash);
        })

        if(hash){
            ctx.type ='text';
            ctx.body = 'user is logined'
        }else{
            ctx.type ='text';
            ctx.body = 'user not found, or password is incorect'
        }

    },
    async search_item(ctx){
        console.log('search');
        console.log(ctx.request.body);
        var obj={}

        if(ctx.request.body._id){
            obj.result = await UserSchema.findOne({'_id':ctx.request.body._id});
        }else{
            obj.result =    await UserSchema.find({});
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
