// in-memory store by default (use the right module instead)
const passport = require('koa-passport')

// sadfhawlufey49fawhfa, sid

/*
const sessions = {
  sadfhawlufey49fawhfa: { name: "Ivan", visitsCount: 1 }
};

if (ctx.cookie.sid && sessions[ctx.cookie.sid])
  ctx.session = sessions[ctx.cookie.sid];
*/

exports.init = app =>{
    app.use(passport.initialize())
    app.use(passport.session())
}
