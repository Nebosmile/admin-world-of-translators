exports.init = app => app.use(async(ctx, next) => {
	try {
		await next();
	} catch (e) {
		if (e.status) {
			// could use template methods to render error page
			ctx.body = e.message;
			ctx.status = e.status;
		} else if (e.name == "CastError") {
			ctx.status=404
            ctx.type='json'
            ctx.body={
                status:404,
                error:'Invalid id'
            };
		} else {
			ctx.body = 'Error 500';
			ctx.status = 500;
			console.error(e.message, e.stack);
		}

	}
});
