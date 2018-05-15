<template lang="html">
	<div class="">

		<input @click='search' type="button" name="" value="battle sessions">
		<tableindex @edit='deleteitem' v-if='table.ansver' :options='table'></tableindex>
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
							name:'delete',
							callevent:'edit',
						}
					},
					{value: 'createdAt', name:'createdAt',status:'checked',default:'1'},
					{value: 'updatedAt', name:'updatedAt',status:'checked',default:'1'},
				]
			},
		}
	},
	methods:{
		search(){
			$.ajax({
				url:'/admin/battlesessions/search',
				type:'POST',
				dataType:'json',
				success:(data)=> {
					console.log(data.result);
					this.table.ansver = data.result;

				}
			})
		},
		deleteitem(item){
			// console.log(item);
			var id = item._id;
			// return
			$.ajax({
				url:'/admin/battlesessions/delete/'+ id,
				type:'POST',
				dataType:'json',
				success:(data)=> {
					this.search()
				}
			})
		}
	},
	mounted(){
		this.search()
	}
}
</script>

<style lang="css">
</style>
