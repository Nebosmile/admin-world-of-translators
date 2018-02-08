<template lang="html">
	<div class="">
		<div class="">
			id is {{usid}}
			 <!-- {{users}} -->
			 <nuxt-link to="123">123</nuxt-link>
		</div>
		<form class="" action="index.html" method="post">
			<label for="">
				введите новые данные
				<input type="text" name="" value="">
			</label>
			<input @click='buttonclick' type="button" name="" value="edit">

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
		}
	}
}
</script>

<style lang="css">
</style>
