<template lang="html">
  	<div class="">
  		<h1>Chose character</h1>
		<div class="char_list">
			<div
				v-for='item in character_list' class="character"
				@click='init_battle(item)'
			>
				{{item.name}}
			</div>
            <input type="button" @click='back' name="" value="back">

            <div class="" v-if='battle' >
                <input @click='start' type="button" name="" value="start">
                <div class="result">
                    {{battle_result}}
                </div>
                <div class="battle">
                    <div class="battle_info">
                        <div class="life">
                            <div :style='{width: life_line(user_char)}' class="red_life">

                            </div>
                            <p>{{user_char.activ_life}}</p>

                            <div class="">
                                <battle v-if='word_obj.active_word' :options='word_obj'></battle>
                            </div>

                        </div>
                        <p>{{user_char.name}}</p>
                        <input v-if='active_battle' type="button" @click='user_atack' name="" value="atack">
                    </div>
                    <div class="battle_info">
                        <div class="life">
                            <div :style='{width: life_line(oponent)}' class="red_life">

                            </div>
                            <p>{{oponent.activ_life}}</p>
                        </div>
                        <p>{{oponent.name}}</p>
                        <!-- <input type="button" name="" value="atack"> -->
                    </div>
                </div>
            </div>

		</div>
  	</div>
</template>

<script>

import battle from '@/components/battle/battle.vue'

// var battle = new Battle({
//     translate_lang:'english'
// })
console.log(battle);
export default {
	layout:'base_page',
	components:{
		battle
	},
	data(){
		return{
			character_list:'',
            creature_list:'',
			user_char:'',
			oponent:'',
			battle:false,
            active_battle:false,
            battle_result:'',
            user_ansver:'',

            word_obj:{
                active_word:'',
                user_lang:'russian',
                translate_lang:'english',

            }
		}
	},
	methods:{
        life_line(target){
            return (target.activ_life/ target.base_stamina)*100 +'%';
        },
        async start(){
            this.battle_result=''
            var answer= await this.get_random_word();

            this.word_obj.active_word=answer.result;
            this.active_battle=true;
            console.log(this.word_obj);
            // this.creature_atack(this.oponent,this.user_char);
        },
        hit(source, target,callback){
            if(this.check_life()){
                this.active_battle=false;
                this.result();
                callback()
                return
            }
            target.activ_life = target.activ_life - source.base_strength;
            console.log(this.user_char.activ_life);

        },
        check_life(){
                if(this.user_char.activ_life<=0 || this.oponent.activ_life<=0){
                    return true
                }
                return false
        },
        result(){
            if(this.user_char.activ_life>this.oponent.activ_life){
                this.battle_result=`${this.user_char.name} win`
            }else if(this.user_char.activ_life<this.oponent.activ_life){
                this.battle_result=`${this.oponent.name} win`
            }else{
                this.battle_result='dead heat'
            }
        },
        creature_atack(oponent,player){
            console.log('creature_atack');
            setTimeout(()=>{
                this.hit(oponent,player);
                if(this.check_life()){
                    this.active_battle=false;
                    this.result();
                    return;
                }
                this.creature_atack(oponent,player);
            },oponent.atack_speed*1000)

        },
        back(){
            this.battle=false;
        },
        get_creature_list(){
            return $.ajax({
                url:'/admin/creature/search',
                type:'POST',
                dataType:'json',
                // success:(data)=> {
                //     console.log(data.result);
                //     if(data.status='200'){
                //         this.creature_list=data.result
                //     }
                // }
            })
        },
		async init_battle(obj){
            var get_creature = await this.get_creature_list();
            this.creature_list=get_creature.result;
            var rand = this.randomInteger(0, this.creature_list.length-1)

            var op_obj=this.creature_list[rand];
            op_obj.activ_life=op_obj.base_stamina;
            this.oponent=JSON.parse(JSON.stringify(op_obj))
            obj.activ_life=obj.base_stamina
			this.user_char =JSON.parse(JSON.stringify(obj));



            this.battle=true;
		},
		randomInteger(min, max) {
		    var rand = min - 0.5 + Math.random() * (max - min + 1)
		    rand = Math.round(rand);
		    return rand;
		},
		search(){
			$.ajax({
				url:'/admin/characters/search',
				type:'POST',
				dataType:'json',
				success:(data)=> {
					console.log(data.result);
					if(data.status='200'){
						this.character_list=data.result
					}
				}
			})
		},
        async user_atack(){
            var answer= await this.get_random_word();
            this.word_obj.active_word=answer.result;
            this.hit(this.user_char,this.oponent);
        },
        get_random_word(){
            return $.ajax({
                    url:'/admin/word/get_random_word',
                    type:'POST',
                    dataType:'json',
                })
        }
	},
	mounted(){
		this.search()
	}
}
</script>

<style lang="scss">
.battle{
    display: flex;
	width: 100%;
	.battle_info{
		width: 50%;
		.life{
            width: 80%;
            .red_life{
                background-color: red;
                min-height: 30px;
            }
		}
	}
}
.red_life{
    transition: width 0.3s linear;
}
.result{
    text-align: center;
    font-size: 20px;
}
.char_list{
	width: 100%;
	.character{
		display: inline-block;
		background-color: rgb(227, 225, 245);
		box-shadow: 0px 1px 1px 1px #000;
		cursor: pointer;
		border-radius: 5px;
		width: 100px;
		padding: 5px;
		margin: 5px;
        webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none;
	}
}
</style>
