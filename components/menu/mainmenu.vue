<template lang="html">
  	<div class="menu_wrap container">
  		<ul class="menu">
  			<li v-for='(elem, index) in menu'>
				<router-link :to='index'>{{elem}}</router-link>
			</li>
  		</ul>
  	</div>
</template>

<script>
export default {
	name:'mainmenu',
	data(){
		return{
			menu:{
				dictionary:"dictionaryText",
				dictionary2:"dictionaryText2",
			}
		}
	}
}
</script>

<style lang="css">
</style>
