let passport = require('koa-passport')
const UserSchema = require('../schemas/user');

module.exports = {
	async loginsession(ctx, next) {
		console.log(ctx);
		await passport.authenticate('local', function(err, user, info) {
			if (err)
				ctx.throw(err);
			if (user) {
				ctx.login(user);
				ctx.body = {
					email: user.email,
					login: user.login,
					id: user._id
				};

				return ctx;
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
	async loginjwt() {
		passport.authenticate(local)
	}
}
