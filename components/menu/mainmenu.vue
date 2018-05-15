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
                {
                    link:'/adminpanel/dictionary',
                    text:'dictionarytext',
                    childs:{

                    }
                },
                {
                    link:'/adminpanel/characters',
                    text:'characters'
                },
                {
                    link:'/adminpanel/creature',
                    text:'creatures'
                },
                {
                    link:'/adminpanel/battlesessions',
                    text:'battlesessions'
                },
                {
                    link:'/adminpanel/game',
                    text:'game'
                },
                {
                    link:'/adminpanel/users',
                    text:'users'
                },
                {
                    link:'/login',
                    text:'login'
                },
                {
                    link:'/registration',
                    text:'registration'
                },

            ]
		}
	}
}
</script>

<style lang="css">
</style>
