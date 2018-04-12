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

			playerchar=playerchar.toObject();
			rund_creature=rund_creature.toObject();

			playerchar.activ_life = playerchar.base_stamina;
			rund_creature.activ_life = rund_creature.base_stamina;


			var addBattle = new battleSchema({
				players:[playerchar],
				creature:rund_creature,
				battleType:'creature', // creature, boss, duel
			})
			try{
				saveBattle= await addBattle.save((err,result)=>{
					socket.emit('battleInited',{
						status: '200',
						result: result
					})
				})
			}catch(err){
				console.log(err);
			}

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
