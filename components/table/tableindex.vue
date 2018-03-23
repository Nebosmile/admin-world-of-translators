<template lang="html">
    <div class="hidewrap overflow_hidden_none" ref = 'hidwrap' >
        <div ref='filter_block' v-bind:class="{hide:hideis}" class='filterblock'>
            <div class="filterblockin" >
                <form>
                    <ul>
                        <li v-for='items in options.initvalue'>
                            <label><input type="checkbox"
                                v-bind:checked="Checkstatus(items)"
                                v-on:change="newStatus(items)"
                            > {{items.name}}</label>
                        </li>
                    </ul>
                    <div><input v-on:click='savefilters' type="submit" value="save" class="btn-success btn-lg btn">
                         <input v-on:click='setdefault' type="button" value="default" class="btn-primary btn-lg btn">
                    </div>
                </form>

            </div>
        </div>

        <div class="rowchik theme_color overflow_hidden_none" ref='rowchik'>
            <p class="left">{{options.tableoption.name}}</p>

            <div class="hideButton right" v-on:click='check($refs.hidwrap)'></div>
            <div v-on:click='seefilter' class="filterButton right"></div>

            <p v-if='options.tableoption.navigationlist' class="right">
                Records<span class="showNow"> {{options.tableoption.navigationlist.records}}</span> of <span class="showpage">{{options.tableoption.navigationlist.count}}</span>
            </p>

            <div v-if='options.tableoption.navigationlist' class="start navigateCenter">
                <input v-on:click ='firstlist' class="firstlist" type="button" value="|<">
                <input v-on:click ='prevlist' class="previoslist" type="button" value="<">
                <p>Page</p>
                <input type="text" @change='pagenumberget' @keyup.enter="pagenumberget" ref='pagenumber' class="pagenumber" name="pagenumber" :value='this.options.tableoption.navigationlist.currenpage'>
                <p>of <span class="allpages">{{this.options.tableoption.navigationlist.allpage}}</span></p>
                <input v-on:click ='nextlist' class="nextlist" type="button" value=">">
                <input v-on:click ='lastlist' class="lastlist" type="button" value=">|">
            </div>

        </div>
        <div class="hidewrapitem">
            <table class="hideitem base_table">
                <thead>
                    <tr>
                        <th v-for='(items,index) in options.initvalue'
                            v-if='Checkstatus(items)'>
                            {{items.name }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='(item, index) in options.ansver '
                        v-on:click='((options.clickevent_tr!=undefined)? checkevent(options.clickevent_tr, item): null)'
                        :class='{click_tr:options.clickevent_tr}'
                    >
                        <td v-for='(elem, index2) in options.initvalue'
                            :class="{clicker:(elem.clickevent!=undefined)}"
                            v-if='Checkstatus(elem)'
                        >
                            <p v-on:click='((elem.clickevent!=undefined)? checkevent(elem.clickevent, item): null)'
                            >{{setvalue(item[elem.value], elem.value, index + 1,elem)}}</p>
                            <div @click='checkevent(elem.button, item)'
                                v-if='elem.button' class="td_button theme_button">
                                {{elem.button.name}}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>

export default {
    data(){
        return{
            hideis:true,
            optionsdate:{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                timezone: 'UTC',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            },
            dragelement:{dom:false,number:''},
            target_elem:{dom:false,number:''},

        }
    },
    props:{
        options:{
            type: Object
        }
    },
    methods:{
        checkevent(checkev, fullobj){
            this.$emit(checkev.callevent, fullobj)
        },
        setvalue(obj,name, index,elem){
                if(name =='counter'){
                    if(this.options.tableoption.navigationlist){
                        return index + this.options.tableoption.navigationlist.step*(this.options.tableoption.navigationlist.currenpage-1);

                    }else{
                        return index;
                    }

            }else if (elem.type=='date'){
                if(obj != '' && obj != undefined && obj !=0){
                    var datestart = new Date(Number(obj))
                    var dateTd = datestart.toLocaleString("ru", this.optionsdate);
                    return dateTd
                }
            }else if (elem.type=='number'){
                if(!(isNaN(elem.fixed))){
                    return obj.toFixed(elem.fixed)
                }
                return obj;
            }else if(name =='wincents'){
              return (obj/100).toFixed(2)
            }
            else {
                if(obj==undefined){return ""}
                else{ return String(obj)}

            }
        },
        firstlist(){
            var active_page= this.$refs.pagenumber;
            this.options.tableoption.navigationlist.currenpage =1;
            this.$emit('get')
        },
        lastlist(){
            var active_page= this.$refs.pagenumber;
            this.options.tableoption.navigationlist.currenpage =this.options.tableoption.navigationlist.allpage;
            this.$emit('get')
        },
        prevlist(){
            var active_page= this.$refs.pagenumber;
            if(active_page.value ==1){return}
            else{
                this.options.tableoption.navigationlist.currenpage= Number(active_page.value) -1
                this.$emit('get')
            }
        },
        nextlist(){
            var active_page= this.$refs.pagenumber;
            if(active_page.value ==this.options.tableoption.navigationlist.allpage){return}
            else{
                this.options.tableoption.navigationlist.currenpage= Number(active_page.value) +1
                this.$emit('get')
            }
        },
        pagenumberget(){
            var active_page= this.$refs.pagenumber;
            this.options.tableoption.navigationlist.currenpage= Number(active_page.value);
            this.$emit('get');
        },
        check_parent(e){
            var elem = e.target


            var result=this.$refs.filter_block.contains(elem);

            if(result==false && !elem.classList.contains('filterButton')){
                this.hideis=true;
            }
        },
        Checkstatus:function(obj) {
            if(obj.status=='checked'){return true}
            else {return false}
        },
        setdefault:function () {
            this.options.initvalue.forEach(function (item) {
                if(item.default=='1'){
                    item.status='checked'
                }else{
                    item.status='hide'
                }
            })
        },
        Checkstatus:function(obj) {
            if(obj.status=='checked'){return true}
            else {return false}
        },
        newStatus:function(obj) {
            console.log(obj);
            if(obj.status=='checked'){obj.status='hide'}
            else {obj.status='checked'}
            console.log(obj);
        },
        check(obj){
            var elem =obj;
            var hideButton = elem.getElementsByClassName('hideButton')[0];
            var hideitem = elem.getElementsByClassName('hideitem')[0];
            var height = hideitem.offsetHeight;
            console.log(this.$refs);
            var newthis =this;

            if (!hideButton.classList.contains('see')) {
                obj.classList.toggle('overflow_hidden_none');
                newthis.$refs.rowchik.classList.toggle('overflow_hidden_none');
                hideitem.style.marginTop = -height + "px";
                hideButton.classList.add("see");
                setTimeout(function() {
                    hideitem.classList.add('hide');
                }, 500)
            } else if (hideButton.classList.contains('see')) {
                hideitem.classList.remove('hide');
                setTimeout(function() {
                    hideitem.style.marginTop = 0 + "px";
                }, 20)
                setTimeout(function functionName() {
                  obj.classList.toggle('overflow_hidden_none');
                  newthis.$refs.rowchik.classList.toggle('overflow_hidden_none');
                }, 500)

                hideButton.classList.remove("see");
            }
            console.log(height);
        },
        savefilters:function (e) {
            e.preventDefault();
            this.hideis=true
            this.$emit('settings');
        },
        seefilter:function () {
            this.hideis=false
        },

    },
    mounted(){
        document.addEventListener('click',this.check_parent)

    },
    destroyed() {
      document.removeEventListener('click',this.check_parent);
    },
}

// table:{
//     tableoption:{
//         name:'Detailed info',
//         navigationlist:{
//             currenpage:'1',
//             count:'1',
//             allpage:'1',
//             records:'all',
//             step:''
//         }
//     },
//     set_value:'',
//     ansver:'',
//     count:'',
//     clickevent_tr: {
//         callevent: 'add_user_to_list',
//     },
//     initvalue:[
//         {value: 'number', name:'ID',status:'checked',default:'1'},
//         {value:'countryISO', name:'country',status:'checked',default:'1',sort:'1'},
//         {
//             value:'sessionID',
//             name:'Session ID',
//             copy:true,
//             status:'checked',
//             default:'1',
//             clickevent:{
//                 callevent:'getrounds',
//             }
//         },
//     ]
// },

</script>

<style lang="scss">
.base_table{
    width: 100%;

    td{
        p{
            margin: 0;
        }
    }
}
.hidewrapitem{
    // overflow: hidden;
}
.hidewrap {
    margin-bottom: 20px;
    overflow: hidden;
}
.hideitem{
    margin-bottom: 0;
    transition: all 0.3s linear
}
.hideButton {
    width: 20px;
    height: 20px;
    color: #ffffff;
    position: relative;
    cursor: pointer;
    margin: 8px 5px 0 0;
}
.hideButton:before {
    content: "";
    position: absolute;
    top: 5px;
    right: 0;
    border: 10px solid transparent;
    border-top: 10px solid #a1a1a1;

}
.hideButton:hover:before{
    border-top: 10px solid #fff;
}
.hideButton.see:before {
        top: 0;
        right: 0;
        border: 10px solid transparent;
        border-right: 10px solid #a1a1a1;
}
.hideButton.see:hover:before {
    border-right: 10px solid #fff;
}
.hidewrap.overflow_hidden_none{
  overflow: inherit;

  // th{
  //   background-color: #ececec;
  //   position:sticky;
  //   top: 83px;
  // }
}
.filterblockin {
    padding: 20px;
    position: fixed;
    z-index: 10;
    width: 50%;
    min-width: 200px;
    max-width: 1600px;
    max-height: 60vh;
    overflow: auto;
    background: #fff;
    border: 1px solid #000;
    border-radius: 3px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -30vh);
    min-height: 100px;
}
.filterblockin label {
    display: inline-block;
    float: left;
    padding: 5px;
    width: 30%;
    margin-right: 3%;
    min-width: 120px;
    max-width: 140px;
    text-align: left;
    margin: 0 auto;
    cursor: pointer;
}
.filterblockin div {
    clear: both;
    width: 100%;
    text-align: center;
}
.filterblockin ul {
    list-style: none;
}
.tableFilter .rowchik.overflow_hidden_none{
    position: sticky;
    top: 50px;
}
.hide{
    display:none;
}
.rowchik {
    position: relative;
    z-index: 1;
    overflow: hidden;
    min-width: 100%;
    box-sizing: border-box;
    // background-color: #3a3a3a;

    padding-right: 10px;
    p{
        font-weight: bold;
        display: inline;
        color: #dadada;
        margin: 0 8px 0 8px;
        padding: 0;
        line-height: 2.5;
        font-size: 14px;
    }
}
.filterButton {
    cursor: pointer;
    margin: 10px 5px 0 0;
    width: 20px;
    height: 20px;
    background-image: url('~@/static/img/gumbdark.png');
    background-repeat: no-repeat;
}
.filterButton:hover {
    background-image: url('~@/static/img/gumbwhite.png');
}
.td_button{
    font-size: 14px;
}

</style>
