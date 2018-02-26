<template>
    <div class="main_wrap">
        <script src='https://code.jquery.com/jquery-3.2.1.min.js'></script>
        <div class="head_section">
            <div class="">
                <img @click='show_hide_menu' src="@/static/img/gumbdark.png" alt="">
                Show_hide
            </div>
        </div>
        <div class="menu_section open" ref ='menu_section'>
            <mainmenu></mainmenu>
        </div>


        <div class="admin_wrap open" ref ='admin_wrap'>
            <h1>Добро пожаловать на главню страницу</h1>
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
    methods:{
        show_hide_menu(){
            this.$refs.menu_section.classList.toggle('open');
            this.$refs.admin_wrap.classList.toggle('open');
        }
    }
};
</script>
<style lang='scss'>
body{
    margin: 0;
    padding:0;
}
ul{
    padding: 0;
    margin: 0;
}
.head_section{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 50px;
    background-color: rgba(250, 250, 250, 0.5);
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
.admin_wrap{
    padding-left: 20px;
    margin-top: 51px;
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
</style>
