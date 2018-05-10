<template>
    <div class="main_wrap">
        <script src='https://code.jquery.com/jquery-3.2.1.min.js'></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js"></script>
        <div class="head_section">
            <div class="">
                <span><img @click='show_hide_menu' src="@/static/img/gumbdark.png" alt="">
                Show_hide</span>
                <form v-if='$store.state.access==false' class="right" action="index.html" method="post">
                    <label>login <input type="text" /></label>
                    <label>password <input type="password" /></label>
                </form>
                <div class="right">
                    <span v-if='$store.state.access==true' class="">
                        {{$store.state.user}}
                    </span>
                </div>

                <button @click='changeState' type="button" name="button">change state</button>

            </div>
        </div>
        <div class="menu_section open" ref ='menu_section'>
            <mainmenu></mainmenu>
        </div>


        <div class="admin_wrap open" ref ='admin_wrap'>
            <!-- <h1>Добро пожаловать на главню страницу</h1> -->
            <nuxt/>
        </div>

    </div>

</template>

<script>

import mainmenu from '@/components/menu/mainmenu'
export default {
    components: {
        mainmenu
    },
    fetch(){

    },

    mounted(){
        // console.log(this.access);
    },
    methods:{
        show_hide_menu(){
            this.$refs.menu_section.classList.toggle('open');
            this.$refs.admin_wrap.classList.toggle('open');
        },
        changeState(){
            this.$store.commit('changeState');
        }
    }
};
</script>
<style lang='scss'>
$theme_color:#0868c5;
$theme_color_hd:darken($theme_color, 10%);
$theme_color_hl:lighten($theme_color, 10%);


body{
    font-family: sans-serif;
}
.main_wrap{
    position: absolute;
    min-width: 100%;
    min-height: 100vh;
}
.theme_color{
    background-color: $theme_color;
}
.theme_button{
    background-color: $theme_color;
    color: #fff;
    cursor: pointer;
    padding: 1px 4px;;
    border: solid 1px;
    border-radius: 4px;
    display: inline-block;
    line-height: 1;
    &:hover{
        background-color: $theme_color_hl;
    }
}

body{
    margin: 0;
    padding:0;
}
ul{
    padding: 0;
    margin: 0;
}
table{
    border-spacing: 0;
    border-collapse: collapse;
}
td,th{
    border: solid 1px ;

}
.head_section{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 50px;
    background-color: rgba(250, 250, 250, 0.9);
    border-bottom: solid 1px #000;
}
.menu_section{
    border-bottom: solid 1px #8a8a8a;
    position: fixed;
    overflow: hidden;
    top: 51px;
    border-right: 1px solid #000;
    transition: 'width' 0.5s linear;
    z-index: 3;
    min-height: 100%;
    background-color: #fff;
    transition: width 0.3s linear;
    width: 0;

    &.open{
        width: 200px;
    }


    .menu_wrap{
        .menu{
            // display: flex;
            li{
                list-style: none;
                padding: 5px;
                a{
                    width: 100%;
                    display: inline-block;
                    color: #000;
                    text-transform: uppercase;
                    text-decoration: none;
                    border-bottom: solid 1px #000;
                    padding: 7px;
                }
                a:hover{
                    text-decoration: underline;
                }

            }
            li:first-child a{
                border-left: none;
            }
        }
    }
}
.add{
    display: inline-block;
    margin-right: 5px;
    border: 1px solid;
    border-radius: 2px;
    a{
        display: inline-block;
        color: #000;
        text-decoration: none;
        padding: 1px;
    }
}
.admin_wrap{
    padding-left: 20px;
    margin-top: 71px;
    margin-right: 20px;
    transition: margin-left 0.3s linear;

    &.open{
        margin-left: 200px;
    }
}
section{
    width: 100%;
}
.right{
    float: right;
}
.left{
    float: left;
}
.inputblock{
    display:flex;
    flex-wrap: wrap;

    label{
        width: 33%;
        min-width: 300px;
        text-align: right;
    }
}
</style>
