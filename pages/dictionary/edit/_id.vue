<template lang="html">
	<div class="">
		<script src='https://code.jquery.com/jquery-3.2.1.min.js'></script>
		<div class="">
			id is {{usid}}
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


		</form>
	</div>
</template>

<script>
import config from '@/nuxt.config.js'
export default {
	async asyncData({params, env}){
		return{
			'usid':params.id,
			'users':env.users,
		}
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
			$.ajax({
				url:'/admin/word',
				data:post_data,
				type:'POST',
				dataType:'json',
				success:function(data) {
					console.log(data);
				}
			})
		}
	}
}
</script>

<style lang="scss">
</style>
