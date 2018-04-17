<template lang="html">
	<div class="center">
		<input @click='start' type="button" name="" value="start">
		<div class="">
			<h1>{{word_obj.active_word[word_obj.user_lang]}}</h1>

		</div>
		<div class="">
			<span v-for='item in active_answer'>{{item}}</span>
		</div>
		<div class="">
			<div @click='check_letter(item, index)' class="letter" v-for=' (item, index) in word_answer' type="button" >{{item}}</div>
		</div>
		<!-- <input type="button" @click='useratack' name="" value="atack"> -->

	</div>
</template>

<script>
export default {
	data(){
		return{
			word_question:[],
			active_word:'',
			word_answer:[],
			active_answer:[],
			counter:0,
			word_obj:{
				active_word:'',
				user_lang:'russian',
				translate_lang:'english',

			}
		}
	},
	props:{
		socket:{
			type: Object
		},
		battleid:{
			type:String
		}
	},
	methods:{
		async useratack(){
			this.active_answer=[];
			this.word_question=[];
			this.counter=0;
			var kickobj={
				type:'creature',
				battleid:this.battleid
			}
			var answer= await this.get_random_word();
			this.word_obj.active_word=answer.result;
			this.socket.emit('kick', kickobj);
			this.setwordArr();
		},
		setwordArr(){
			console.log(this.word_obj.active_word);
			this.word_question=this.word_obj.active_word[this.word_obj.translate_lang].split('');
			this.word_answer=this.get_rund_wordarr(this.word_question);
			console.log(this.word_answer);

		},
		compareRandom(a, b) {
			return Math.random() - 0.5;
		},
		get_rund_wordarr(arr){
			var newarr;
			var newthis =this;
			function return_unique() {
				newarr = arr.concat()
				newarr.sort(newthis.compareRandom);
				console.log(newarr);
				console.log(arr);
				if(newarr==arr){
					return_unique();
				}
			}
			return_unique(newarr)

			return newarr

		},
		init_round(info){
			if(!info.word_obj){
				throw new Error('need info.word_obj')
			}
			this.word_obj=info.word_obj;
			this.counter=0;
		},
		check_letter(letter,index){
			if(this.word_question[this.counter]==letter){
				this.counter++
				this.active_answer.push(letter)
				this.word_answer[index]=''
				if(this.active_answer.join('')==this.word_question.join('')){
					this.useratack();
				}

				return true;
			}else{
				return false;
			}
		},
		get_random_word(){
			return $.ajax({
					url:'/admin/word/get_random_word',
					type:'POST',
					dataType:'json',
				})
		},
		async start(){
			this.active_answer=[];
			this.word_question=[];
			this.counter=0;
			var answer= await this.get_random_word();
			this.word_obj.active_word=answer.result;
			this.setwordArr();
		},
		setSocketListener(){

		}
	},
	mounted(){
		this.start()
		this.setSocketListener()
	}
}
</script>

<style lang="scss">
.letter{
	display: inline-block;
	padding: 5px;
	width: 30px;
	margin-right: 5px;
	background-color: rgb(223, 219, 222);
	border:solid 1px #000;
}
</style>
