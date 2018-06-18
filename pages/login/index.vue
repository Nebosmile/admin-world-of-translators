<template lang="html">
  	<div class="">
  		<form ref='form' class="" action="index.html" method="post">
  			<label for="">
  				login
				<input type="text" name="in" value="">
  			</label>
			<label for="">
				password
				<input type="password" name="passin" value="">
			</label>
			<div class="">
				<input @click='login' type="button" name="" value="login">
                <input @click='jwtauth' type="button" name="" value="jwtauth">
			</div>
  		</form>
  	</div>
</template>

<script>
export default {
	layout:'base_page',
    methods:{
        login(){
            var form = this.$refs.form;
            var login = form.in.value;
            var password = form.passin.value;

            var formdata={
                login:login,
                password:password
            }
            $.ajax({
                url:'/admin/users/login',
                type:'POST',
                data:formdata,
                dataType:'json',
                success:(data)=> {
                    console.log(data);
                    if(data.token){
                        this.$store.commit('setToken', data.token);
                    }
                }
            })
        },
        jwtauth(){
            $.ajax({
                url:'/admin/users/jwtauth',
                headers: {"jwttoken": this.$store.state.token},
                type:'POST',
                success:(data)=>{
                    console.log(data);
                }
            })
        }
    }
}
</script>

<style lang="css">
</style>
