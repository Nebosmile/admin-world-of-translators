let passport = require('koa-passport')
const jwt = require('jsonwebtoken'); // аутентификация по JWT для hhtp

const jwtsecret = require('../config.js').jwtsecret

module.exports = {
	async login(ctx, next) {

		await passport.authenticate('local', function(err, manager, info) {
			if (err)
				ctx.throw(err);
			if (manager) {

				const payload={
					email: manager.email,
					_id: manager._id,
				}


				 const token = jwt.sign(payload, jwtsecret); //здесь создается JWT

				 ctx.body = {
					 email: manager.email,
					 token:token,
					 _id: manager._id
				 };
			} else {
				if (info) {
					ctx.body = {
						status: 404,
						result: info
					};
				}
				return ctx;
			}
		})(ctx, next)
	},
	async loginjwt(ctx, next) {
		await	passport.authenticate('jwt', function (err, manager, info){
			if(err){
				ctx.throw(err)
			}
			if(manager){
				ctx.body = {
					status: 200,
					result: 'success'
				};
			}
		})(ctx,next)
	}
}
