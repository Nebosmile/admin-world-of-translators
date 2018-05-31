<template lang="html">
	<div class="">
		<div class="add">
			<router-link to='/adminpanel/dictionary/add'>add new</router-link>
		</div>

		<input @click='search' type="button" name="" value="dictionary">
		<tableindex @edit='edit_redirect' v-if='table.ansver' :options='table'></tableindex>
	</div>
</template>

<script>
import tableindex from '@/components/table/tableindex'

export default {
	layout:'base_page',
	components:{
		tableindex,
	},
	async asyncData(){
		return{
			table:{
				tableoption:{
					name:'Detailed info',

				},
				set_value:'',
				ansver:'',
				count:'',
				// clickevent_tr: {
				// 	callevent: 'add_user_to_list',
				// },
				initvalue:[
					{value: 'counter', name:'Counter',status:'checked',default:'1'},
					{value:'_id', name:'ID',status:'checked',default:'1',
						// clickevent:{
						// 	callevent:'getrounds',
						// },
						button:{
							name:'edit',
							callevent:'edit',
						}
					},
					{value: 'english', name:'English',status:'checked',default:'1'},
					{value: 'russian', name:'Russian',status:'checked',default:'1'},
					{value: 'ukrainian', name:'Ukrainian',status:'checked',default:'1'},
				]
			},
		}
	},
	methods:{
		search(){
			$.ajax({
				url:'/admin/word/search',
				type:'POST',
				dataType:'json',
				success:(data)=> {
					console.log(data.result);
					this.table.ansver = data.result;
				}
			})
		},
		edit_redirect(obj){
			this.$router.push('/adminpanel/dictionary/edit/'+obj._id)
			console.log(obj);
		}
	},
	mounted(){
		this.search()
	}
}
</script>

<style lang="css">
</style>
