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
			var newobj ={
				players:[playerchar],
				creature:rund_creature,
				battleType:'creature', // creature, boss, duel
			}

			var addBattle = new battleSchema(newobj)
			try{
				var saveBattle= await addBattle.save((err,result)=>{
					socket.emit('battleInited',{
						status: '200',
						result: result
					})
				})
				setTimeout(()=>{
					ai_atack(socket,saveBattle.id);
				},1000)


			}catch(err){
				console.log(err);
			}

	},
	async conectbattle(socket, obj){

	},
	async kick(socket, obj){
		console.log(obj);
		var target_schema =  await battleSchema.findById(obj.battleid);
		if(!target_schema){
			socket.emit('kick_result',{
				status:'404',
				result:'not found'
			})
			return
		}
		var targetobj=target_schema.toObject();
		targetobj.creature.activ_life -= targetobj.players[0].base_strength;
		const up_shema= await target_schema.set(targetobj).save();
		// console.log(up_shema);
		socket.emit('kicked',{
			status:'200',
			result:up_shema
		})


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
async function ai_atack(socket, id){

	console.log('aiatack');
	var target_schema =  await battleSchema.findById(id);
	if(Number(target_schema.players[0].activ_life) > 0 && Number(target_schema.creature.activ_life)>0){
		console.log(target_schema);
		if(!target_schema){
			socket.emit('kick_result',{
				status:'404',
				result:'not found'
			})
			return
		}
		var targetobj=target_schema.toObject();
		console.log(target_schema.creature.activ_life);
		targetobj.players[0].activ_life -= targetobj.creature.base_strength;
		console.log(target_schema.creature.activ_life);

		const up_shema= await target_schema.set(targetobj).save();
		console.log(up_shema);
		console.log('okeyd');
		socket.emit('kicked',{
			status:'200',
			result:up_shema
		})

		if(Number(up_shema.players[0].activ_life) > 0 && Number(up_shema.creature.activ_life)>0){
			setTimeout(()=>{
					ai_atack(socket, id)
			},up_shema.creature.atack_speed*1000)
		}
	}



}
