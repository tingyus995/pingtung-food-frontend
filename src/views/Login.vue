<template>
      <LoginForm @login="startLogin" :error-message="errorMsg" >
        <template v-slot:header>
          <h1 class="h3 mb-3 font-weight-normal">請登入</h1>
        </template>
        <template v-slot:footer>
           <p><b-link :to="{name : 'signup'}">申請學生帳號</b-link></p>
           <p><b-link :to="{name : 'shoplogin'}">我是店家</b-link></p>
        </template>
      </LoginForm>
</template>

<script>
import LoginForm from "../components/LoginForm"
export default {
  name: "login",
    components:{
    LoginForm
  },
  data() {
    return {
     
      errorMsg : null
    };
  },
  methods : {
    startLogin(user){
      let self = this;
      self.errorMsg = '';
            this.$http
      .post("/student/login", user)
        .then(function(response) {
          console.log(response);
          //self.$emit('signupComplete', response.data);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', response.data.user.type);
          self.$bus.$emit('logged', 'User logged in.')
          if(response.data.user.type === 'student'){
            self.$router.push({name : 'foods'})
          }
        })
        .catch(function(error) {
          console.log(error.response.data);
          console.log(JSON.stringify(error.response.data));
          self.errorMsg = "帳號或密碼錯誤"
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
