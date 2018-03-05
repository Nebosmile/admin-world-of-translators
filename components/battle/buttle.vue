<template lang="html">
	<div class="">
		<div class="">
			{{word_obj[user_lang]}}
		</div>
		<div class="">
			<input v-for=' item in word_answer' type="button" :name="item" :value="item">
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return{
			word_obj:'',
			user_lang:'',
			translate_lang:'',
			word_question:[],
			active_word:'',
			word_answer:[],
			active_answer:[],
			counter:0,
		}
	},
	props:{
		options:{
			type: Object
		}
	},
	methods:{
		setwordArr(word_obj){
			this.word_obj=word_obj;
			this.word_answer=this.word_obj[this.translate_lang].split('');
		},
		init_round(info){
			if(!info.word_obj){
				throw new Error('need info.word_obj')
			}
			this.word_obj=info.word_obj;
			this.counter=0;
		},
		check_letter(letter,callback){
			if(this.word_answer[this.counter]==letter){
				this.active_answer.push(letter)
				if(this.active_answer.join('')==this.word_answer.join('')){
					this.counter=0
					calback()
				}
				this.counter++
				return true;
			}else{
				return false;
			}
		}
	}
}
</script>

<style lang="css">
</style>
