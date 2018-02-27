<template lang="html">
	<div class="">
		<div class="add">
			<router-link to='/dictionary'>back</router-link>
		</div>

		<div class="">
			<span v-if='usid'>id is {{usid}}</span>

			 <!-- {{users}} -->
			 <nuxt-link to="123">123</nuxt-link>
		</div>
		<form class="" method="post">
			<div class="inputblock">
				<label for="">
					English
					<input type="text" name="english" value="" ref='word'>
				</label>
				<label for="">
					Russian
					<input type="text" name="russian" value="" ref='russian'>
				</label>
				<label for="">
					Ukrainian
					<input type="text" name="ukrainian" value="" ref='ukrainian'>
				</label>

			</div>
			<input @click='buttonclick' type="button" value='edit' >
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
			'usid':false,
			'users':env.users,
		}
		if(params.id){
			console.log(params.id);
			obj.usid=params.id
			if(params.edit!='edit'){
				return redirect('/dictionary/')
			}

		}
		return obj
	},
	methods:{
		buttonclick(){
			console.log('button cliked');
			var english = this.$refs.word.value;
			var russian = this.$refs.word.value;
			var ukrainian = this.$refs.word.value;
			var post_data={
				'english':english,
				'russian':russian,
				'ukrainian':ukrainian,

			}
			var link = '/admin/word/'+this.edit+'/'+ this.usid
			console.log(link);
			return
			$.ajax({
				url:'/admin/word/add',
				data:post_data,
				type:'POST',
				dataType:'json',
				success:function(data) {
					console.log(data);
				}
			})
		},

	}
}
</script>

<style lang="scss">
</style>
