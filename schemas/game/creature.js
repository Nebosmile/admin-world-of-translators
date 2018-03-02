const mongoose = require('mongoose');


const creature_schema= mongoose.Schema({
	name:{
		type:String,
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
	atack_speed:{
		type:Number
	},
	p_abilities:{
		type:Array
	},
	a_abilities:{
		type:Array
	},
})

module.exports = mongoose.model("CreatureSchema", creature_schema);
