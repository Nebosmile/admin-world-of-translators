<template lang="html">
	<div class="">
		<div class="add">
			<router-link to='/adminpanel/characters'>back</router-link>
		</div>

		<div class="">
			<span v-if='itemid'>id is {{itemid}}</span>

			 <!-- {{users}} -->
			 <nuxt-link to="123">123</nuxt-link>
		</div>
		<form class="" method="post">
			<div class="inputblock">
				<label for="">
					name
					<input type="text" name="name" v-model="inputs.name">
				</label>
				<label for="">
					guild
					<input type="text" name="guild" v-model="inputs.guild" >
				</label>
				<label for="">
					base_strength
					<input type="number" name="base_strength" v-model="inputs.base_strength">
				</label>
				<label for="">
					base_stamina
					<input type="number" name="base_stamina" v-model="inputs.base_stamina" >
				</label>
				<label for="">
					base_agility
					<input type="number" name="base_agility" v-model="inputs.base_agility" >
				</label>

				<label for="">
					base_critical
					<input type="number" name="base_critical" v-model="inputs.base_critical">
				</label>

				<label for="">
					base_blockchance
					<input type="number" name="base_blockchance" v-model="inputs.base_blockchance">
				</label>
				<label for="">
					armor_coefficient
					<input type="number" name="armor_coefficient" v-model="inputs.armor_coefficient">
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
		}
		if(params.id){
			console.log(params.id);
			obj.itemid=params.id
			if(params.edit!='edit'){
				return redirect('/adminpanel/characters/')
			}

		}
		return obj
	},
	data(){
		return{
			inputs:{
				name:'',
				guild:'',
				base_strength:'',
				base_stamina:'',
				base_agility:'',
				base_critical:'',
				base_blockchance:'',
				armor_coefficient:'',
			}
		}
	},

	methods:{
		setmodel(v_target,event){
			v_target=event.target.value;
		},
		buttonclick(){

			var post_data={
				'name':this.inputs.name,
				'guild':this.inputs.guild,
				'base_strength':this.inputs.base_strength,
				'base_stamina':this.inputs.base_stamina,
				'base_agility':this.inputs.base_agility,
				'base_critical':this.inputs.base_critical,
				'base_blockchance':this.inputs.base_blockchance,
				'armor_coefficient':this.inputs.armor_coefficient,
			}
			var id=''
			if(this.itemid){
				id=this.itemid
			}
			var link = '/admin/characters/'+this.edit+'/'+ id;
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
				url:'/admin/characters/search',
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
			var link = '/admin/characters/delete/'+ this.itemid;
			$.ajax({
				url:link,
				type:'POST',
				dataType:'json',
				success:(data)=> {
					console.log(data);
					if(data.status==200){
						this.$router.push('/adminpanel/characters')
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
