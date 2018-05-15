<template lang="html">
	<div class="">
		<div class="add">
			<router-link to='/dictionary'>back</router-link>
		</div>

		<div class="">
			<span v-if='itemid'>id is {{itemid}}</span>

			 <!-- {{users}} -->
			 <nuxt-link to="123">123</nuxt-link>
		</div>
		<form class="" method="post">
			<div class="inputblock">
				<label for="">
					English
					<input type="text" name="english" v-model="inputs.english" ref='word'>
					<!-- {{inputs.english}} -->
				</label>
				<label for="">
					Russian
					<input type="text" name="russian" v-model="inputs.russian" ref='russian'>
					<!-- {{inputs.russian}} -->
				</label>
				<label for="">
					Ukrainian
					<input type="text" name="ukrainian" v-model="inputs.ukrainian" ref='ukrainian' >
					<!-- {{inputs.ukrainian}} -->
				</label>

			</div>
			<input @click='buttonclick' type="button" :value='edit' >
			<input v-if='(edit=="edit")' @click='delete_item' type="button" value='delete' >
			<!-- <iframe id="ytplayer" type="text/html" width="720" height="405"
src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&controls=0&loop=1&rel=0&showinfo=0"
frameborder="0" allowfullscreen></iframe> -->

		</form>
	</div>
</template>

<script>

import config from '@/nuxt.config.js'
export default {
	layout:'base_page',
	components:{
		// tableindex,
	},

	async asyncData({params, env, redirect}){
		var obj={
			'edit':params.edit,
			'itemid':false,
			'users':env.users,
		}
		if(params.id){
			console.log(params.id);
			obj.itemid=params.id
			if(params.edit!='edit'){
				return redirect('/dictionary/')
			}

		}
		return obj
	},
	data(){
		return{
			inputs:{
				english:'',
				russian:'',
				ukrainian:'',
			}
		}
	},

	methods:{
		setmodel(v_target,event){
			v_target=event.target.value;
		},
		buttonclick(){

			var post_data={
				'english':this.inputs.english,
				'russian':this.inputs.russian,
				'ukrainian':this.inputs.ukrainian,

			}
			var id=''
			if(this.itemid){
				id=this.itemid
			}
			var link = '/admin/word/'+this.edit+'/'+ id;
			console.log(link);
			// return
			$.ajax({
				url:link,
				data:post_data,
				type:'POST',
				dataType:'json',
				success:(data)=> {
					console.log(data);
				}
			})
		},
		set_form_value(obj){
			for(var elem in this.inputs){
				// if(obj[elem]){
					this.inputs[elem]=obj[elem];
				// }

			}
		},
		findOne(){
			var post_data={
				'_id':this.itemid
			};
			console.log(post_data);
			$.ajax({
				url:'/admin/word/search',
				data:post_data,
				type:'POST',
				dataType:'json',
				success:(data)=> {
					console.log(data);
					this.set_form_value(data.result);
				}
			})
		},
		delete_item(){
			var id=''
			var link = '/admin/word/delete/'+ this.itemid;
			$.ajax({
				url:link,
				type:'POST',
				dataType:'json',
				success:(data)=> {
					console.log(data);
					if(data.status==200){
						this.$router.push('/dictionary')
					}
				}
			})
		}

	},
	mounted(){
		if(this.itemid){
			this.findOne()
		}
	}
}
</script>

<style lang="scss">
</style>
