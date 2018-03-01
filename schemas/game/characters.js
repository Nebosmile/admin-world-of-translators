const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
mongoose.plugin(beautifyUnique);

const character_schema= mongoose.Schema({
	name:{
		type:String,
	},
	guild:{
		type:String
	},
	base_strength:{
		type:Number
	},
	base_stamina:{
		type:Number
	},
	base_critical:{
		type:Number
	},
	base_agility:{
		type:Number
	},
	base_blockchance:{
		type:Number
	},
	armor_coefficient:{
		type:Number
	},
	p_abilities:{
		type:Array
	},
	a_abilities:{
		type:Array
	},
	left_hand:{
		type:String
	},
	right_hand:{
		type:String
	},
	body:{
		type:String
	},
	head:{
		type:String
	},
	legs:{
		type:String
	},
	shoes:{
		type:String
	},


})

module.exports = mongoose.model("CharacterSchema", character_schema);
