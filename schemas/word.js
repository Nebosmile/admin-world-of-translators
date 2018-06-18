const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
mongoose.plugin(beautifyUnique);

const word_schema = mongoose.Schema({
	english:{
		type:String,
		unique: true
	},
	name:{
		type:String,
		unique: true
	},
	russian:{
		type:String,
	},
	ukrainian:{
		type:String,
	}
})

module.exports = mongoose.model("WordShema", word_schema);
