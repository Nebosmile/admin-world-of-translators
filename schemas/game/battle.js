const mongoose = require('mongoose');

const battleSchema = mongoose.Schema({
	player:{
		type:Object,
	},
	oponnent:{
		type:Object,
	}
})
