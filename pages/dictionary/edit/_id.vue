<template lang="html">
	<div class="">
		<script src='https://code.jquery.com/jquery-3.2.1.min.js'></script>
		<div class="">
			id is {{usid}}
			 <!-- {{users}} -->
			 <nuxt-link to="123">123</nuxt-link>
		</div>
		<form class="" method="post">
			<label for="">
				введите новые данные
				<input type="text" name="word" value="" ref='word'>
			</label>
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
			var word = this.$refs.word.value
			var post_data={
				english:word
			}
			$.ajax({
				url:'/word',
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

<style lang="css">
</style>
