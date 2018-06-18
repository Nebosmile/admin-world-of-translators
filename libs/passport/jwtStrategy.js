let passport = require('koa-passport');
let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt
let User = require('../../schemas/user.js');

// const jwtsecret = "mysecretkey"; // ключ для подписи JWT
const jwtsecret = require('../../config.js').jwtsecret

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('jwttoken'),
	secretOrKey: jwtsecret
};

passport.use(new JwtStrategy(jwtOptions, function(payload, done) {
	User.findById(payload._id, function(err, user) {
		if (err) {
			return done(err, false);
		}

		if (!user) {
			return done(null, false);
		}

		return done(null, user);
	})
}));
