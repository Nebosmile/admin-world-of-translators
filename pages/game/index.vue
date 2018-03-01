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
			<div v-if='battle' class="battle">
				<div class="battle_info">
					<div class="life">
						<div class="red_life">

						</div>
					</div>
					<p>{{user_char.name}}</p>
                    <input type="button" @click='atack(user_char,oponent)' name="" value="atack">
				</div>
				<div class="battle_info">
					<div class="life">
						<div class="red_life">

						</div>
					</div>
					<p>{{oponent.name}}</p>
                    <input type="button" name="" value="atack">
				</div>
			</div>
		</div>
  	</div>
</template>

<script>
export default {
	layout:'base_page',
	components:{
		// tableindex,
	},
	data(){
		return{
			character_list:'',
			user_char:'',
			oponent:'',
			battle:false,
		}
	},
	methods:{
        atack(a,b){
            console.log(a);
            console.log(b);
        },
		life(obj){

		},
        back(){
            this.battle=false;
        },
		init_battle(obj){
			this.character_list.forEach((item)=>{
				item.activ_life=item.base_stamina
			})
			this.user_char = obj;
			var rand = this.randomInteger(0, this.character_list.length-1)
			this.oponent=this.character_list[rand];
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
