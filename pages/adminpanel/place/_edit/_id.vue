<template lang="html">
	<div class="">
		<div class="add">
			<router-link to='/adminpanel/place'>back</router-link>
		</div>

		<div class="">
			<span v-if='itemid'>id is {{itemid}}</span>

			 <!-- {{users}} -->

		</div>
		<form class="" method="post">
			<label >
				name
				<input type="name" name="name" v-model="name">
			</label>
			<selectlist :options='creaturelist'></selectlist>
			<selectlist :options='wordslist'></selectlist>
			<input @click='buttonclick' type="button" :value='edit' >
			<input v-if='(edit=="edit")' @click='delete_item' type="button" value='delete' >
			<!-- <iframe id="ytplayer" type="text/html" width="720" height="405"
src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&controls=0&loop=1&rel=0&showinfo=0"
frameborder="0" allowfullscreen></iframe> -->

		</form>
	</div>
</template>

<script>

import config from '@/nuxt.config.js';
import selectlist from '@/components/selectlist';

export default {
	layout:'base_page',
	components:{
		// tableindex,
		selectlist
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
				return redirect('/adminpanel/place/')
			}

		}
		return obj
	},
	data(){
		return{
			name:'',
			creaturelist:{
				name:'creature',
				arr:'',
				link:'/creature/search',
			},
			wordslist:{
				name:'words',
				arr:'',
				link:'/word/search',
			},
		}
	},

	methods:{
		setmodel(v_target,event){
			v_target=event.target.value;
		},
		buttonclick(){

			var post_data={
				creatures:this.creaturelist.arr,
				words:this.wordslist.arr,
				name:this.name,
			}
			console.log(post_data);
			var id=''
			if(this.itemid){
				id=this.itemid
			}
			var link = '/admin/place/'+this.edit+'/'+ id;
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
				url:'/admin/place/search',
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
			var link = '/admin/place/delete/'+ this.itemid;
			$.ajax({
				url:link,
				type:'POST',
				dataType:'json',
				success:(data)=> {
					console.log(data);
					if(data.status==200){
						this.$router.push('/adminpanel/place')
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
