const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
	name:{
		type:String,
		unique:true,
	},
	creatures:{
		type:Array
	},
	words:{
		type:Array
	}
})

module.exports = mongoose.model("placeSchema", placeSchema);
