<template>
    <div class="main_wrap">
        <div class="head_section">
            <div class="">
                <img src="@/static/img/gumbdark.png" alt="">
                Show_hide
            </div>
            header
        </div>
        <div class="menu_section">
            <mainmenu></mainmenu>
        </div>


        <div class="admin_wrap">
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
.menu_section{
    border-bottom: solid 1px #8a8a8a;
    position: fixed;
    overflow: hidden;
    top: 50px;
    border-right: 1px solid #000;
    width: 200px;
    z-index: 3;
    min-height: 100%;
    background-color: #fff;
    transition: width .1s linear;


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

section{
    width: 100%;
}
</style>
