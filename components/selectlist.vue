<template lang="html">
  	<div class="forselect">
  		<label>{{options.name}}
            <div class="selectlist_wrap">
                <div v-if='itemlist' @click='add(item)' v-for='(item, index) in itemlist' class="select_item">
                    <div v-if='item.name'  class="item_name">
                        {{item.name}}
                    </div>
                    <div v-if='item.english'  class="item_name">
                        {{item.english}}
                    </div>

                </div>

                <div v-if='options.arr' class="results">
                    <div v-for='(item, key) in results' class="">
                        <div class="">
                            {{item}}
                        </div>
                        <div @click='remove(key)' class="item_x">
                            X
                        </div>
                    </div>

                </div>
                <div>
                    {{options.arr}}
                </div>
            </div>
		</label>
  	</div>
</template>

<script>
export default {
    props:{
        options:{
            type: Object,
        }
    },
	data(){
		return{
			itemlist:'',
            results:{},
		}
	},
	methods:{
        add(item){

            this.$set(this.results, item._id, item.name);

            var midleArr=[];
            for(var key in this.results){
                midleArr.push(key)
            }
            this.options.arr=midleArr;

        },
        remove(key){
            console.log(key);
            this.$delete(this.results, key);
            var midleArr=[];
            for(var key in this.results){
                midleArr.push(key)
            }
            this.options.arr=midleArr;
        },
        setEditValue(){
            if(this.options.arr){
                var tempitem;
                this.options.arr.forEach((item)=>{
                    tempitem = item;
                    this.$set(this.results, item, this.itemlist.find(fastfind).name);
                })
                function fastfind(elem){
                    if(elem._id==tempitem){
                        return true;
                    }
                }
            }

        },
		search(){
			$.ajax({
				url:'/admin' + this.options.link,
				type:'POST',
				dataType:'json',
				success:(data)=> {
					console.log(data.result);
					if(data.status==200){
						this.itemlist = data.result;
                        this.setEditValue(data.result)
					}
				}
			})
		},

	},
	mounted(){
		this.search()
        this.$parent.$on('update', this.setEditValue);
	}
}
</script>

<style lang="scss">
    .selectlist_wrap{
        display: flex;
        flex-direction: column;

        .select_item{
            display: flex;
            width: 200px;
            justify-content: space-between;
            padding: 3px;
            border: 2px solid rgb(193, 178, 186);
            margin-bottom: 3px;

            div{
                margin: 3px;
            }

        }
        .item_x{
            border: 1px solid #949393;
            background-color: rgb(235, 228, 234);
            line-height: 1;
            width: 20px;
            height: 20px;
            padding: 3px;
            box-sizing: border-box;
        }
    }
</style>
