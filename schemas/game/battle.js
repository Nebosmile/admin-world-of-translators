const mongoose = require('mongoose');

const battleSchema = mongoose.Schema({
	players:{
		type:Array,
	},
	creature:{
		type:Object,
	},
	battleType:{
		type:String,
	}
})

module.exports = mongoose.model("battleSchema", battleSchema);
