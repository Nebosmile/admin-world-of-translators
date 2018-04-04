<template lang="html">
  	<div class="">
  		<h1>Chose character</h1>
		<div class="char_list">
            <div v-for='item in character_list' class="character_wrap">
                <div class="character" >
                    {{item.name}}
                </div>
                <input @click='choose_character(item)' type="button" name="" value="Choose">
                <!-- <input @click='init_battle(item)' type="button" name="" value="Choose"> -->
            </div>
        </div>
        <div v-if='choosed_char' >
            <div class="choosed_char">
                {{choosed_char.name}}
            </div>
            <button @click='init_battle(choosed_char)' type="button" name="button">start</button>
        </div>
        <div class="">
            <input type="button" @click='back' name="" value="back">

            <div class="" v-if='battle' >

                <div class="result">
                    {{battle_result}}
                </div>
                <div class="battle">
                    <div class="battle_info">
                        <div class="life">
                            <div :style='{width: life_line(user_char)}' class="red_life"></div>
                            <p>{{user_char.activ_life}}</p>
                        </div>
                        <p>{{user_char.name}}</p>
                        <p @click='test_socket'>Test socket</p>
                        <div class="">
                            <battle @useratack='useratack'></battle>
                        </div>

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
            choosed_char:'',
			user_char:'',
			oponent:'',
			battle:false,
            active_battle:false,
            battle_result:'',
            user_ansver:'',
            socket:'',
		}
	},
	methods:{
        test_socket(){
            this.socket = io('http://localhost:4000', { transports: ['websocket'], upgrade: false });
            this.socket.on('test',(message)=>{
                console.log(message);
                if (message.status=='200',message.result=='conected' ) {
                    console.log('socket is ready');
                    this.add_battle()
                }
            })
        },
        add_battle(){
            this.socket.emit('initbattle', this.choosed_char);
            console.log('initbattle');
        },
        life_line(target){
            return (target.activ_life/ target.base_stamina)*100 +'%';
        },
        async start(){
            this.battle_result=''

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
        async choose_character(obj){
            this.choosed_char=obj;
        },
		async init_battle(obj){

            this.test_socket()
            // var get_character = await this.search_char(obj._id);

            return
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
        search_char(id){
            console.log(id);
            var postdata={
                '_id':id
            }
            return $.ajax({
                url:'/admin/characters/search',
                type:'POST',
                data:postdata,
                dataType:'json',
            })
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
        async useratack(){
            this.hit(this.user_char,this.oponent);
        },

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
.center{
    text-align: center;
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
    display: flex;
    margin-bottom: 10px;
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
.character_wrap{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.choosed_char{
    border: 1px solid #000;
    background-color: rgb(29, 209, 67)
}
</style>
