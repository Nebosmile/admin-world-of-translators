<template lang="html">
  	<div class="menu_wrap container">
  		<ul class="menu">
  			<li v-for='(elem, index) in menu'>
				<router-link :to='elem.link'>{{elem.text}}</router-link>
			</li>
  		</ul>
  	</div>
</template>

<script>
export default {
	name:'mainmenu',
	data(){
		return{
			menu:[
                {link:'/dictionary',text:'dictionarytext'},
                {link:'/dictionary2',text:'dictionarytext2'}
            ]
		}
	}
}
</script>

<style lang="css">
</style>
