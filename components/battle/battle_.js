


module.exports = function (settings) {
	var obj={
		word_obj:'',
		user_lang:'',
		translate_lang:'',
		word_question:[],
		active_word:'',
		word_answer:[],
		active_answer:[],
		counter:0,
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

	if(settings){
		if(!settings.translate_lang){
			throw new Error('translate_lang is undefined')
		}else{
			this.translate_lang=settings.translate_lang;
		}
	}
	return obj
}
