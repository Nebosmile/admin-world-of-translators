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
			<div class="">
				<input @click='search' type="button" name="" value="search">
			</div>
			<!-- <iframe id="ytplayer" type="text/html" width="720" height="405"
src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&controls=0&loop=1&rel=0&showinfo=0"
frameborder="0" allowfullscreen></iframe> -->

		</form>
		<tableindex></tableindex>
	</div>
</template>

<script>
import tableindex from '@/components/table/tableindex'
import config from '@/nuxt.config.js'
export default {
	async asyncData({params, env}){
		return{
			'usid':params.id,
			'users':env.users,
		}
	},
	components:{
		tableindex,
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
				url:'/admin/word/add',
				data:post_data,
				type:'POST',
				dataType:'json',
				success:function(data) {
					console.log(data);
				}
			})
		},
		search(){
			$.ajax({
				url:'/admin/word/search',
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
