<template lang="html">
  	<div class="">
  		<form ref='form' class="" action="index.html" method="post">
            <label for="">
                name
                <input type="text" name="name" value="">
            </label>
  			<label for="">
  				login
				<input type="text" name="login" value="">
  			</label>
            <label for="">
                email
                <input type="text" name="emailin" value="">
            </label>
			<label for="">
				password
				<input type="password" name="passin" value="">
			</label>
            <div class="">
                <input @click='registration' type="button" name="" value="registration">
            </div>
  		</form>
  	</div>
</template>

<script>
export default {
	layout:'base_page',
    methods:{
        registration(){
            var form = this.$refs.form;
            var name = form.name.value;
            var login = form.login.value;
            var email = form.emailin.value;
            var password = form.passin.value;

            var formdata={
                name:name,
                login:login,
                email:email,
                password:password
            }
            $.ajax({
                url:'/admin/users/add',
                type:'POST',
                data:formdata,
                dataType:'json',
                success:(data)=> {
                    console.log(data.result);
                }
            })
        }
    }
}
</script>

<style lang="css">
</style>
