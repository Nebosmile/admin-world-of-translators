const battleSchema = require('../../schemas/game/battle.js');
const CreatureSchema = require('../../schemas/game/creature.js');
const CharacterSchema = require('../../schemas/game/characters.js');
const fs = require('fs');

module.exports={
	async initbattle(socket, obj){ //obj._id
			var playerchar = await CharacterSchema.findOne({'_id':obj._id});
			var creature = await CreatureSchema.find({});
			var rand = randomInteger(0, creature.length-1);
			var rund_creature=creature[rand];

			console.log(playerchar.name);
			console.log(rund_creature.name);

	},
	async conectbattle(socket, obj){

	},
	async hit(socket){

	},
	async end(){

	},

}
async function makebattlesession(player, creature) {

}
function randomInteger(min, max) {
	var rand = min - 0.5 + Math.random() * (max - min + 1)
	rand = Math.round(rand);
	return rand;
}
