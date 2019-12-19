<template>
  <div class="login container-fluid">
    <form class="form-signin">
      <!--<img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">-->
      <h1 class="h3 mb-3 font-weight-normal">店家端登入</h1>
       <b-alert v-if="errorMsg" show variant="danger">{{ errorMsg }}</b-alert>
      <label for="inputEmail" class="sr-only">Email</label>
      <input
        v-model="user.email"
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="E-mail"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">密碼</label>
      <input
        v-model="user.password"
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="密碼"
        required
      />
      <div class="checkbox mb-3">
        <label> <input type="checkbox" value="remember-me" /> 記住我 </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="startLogin">
        登入
      </button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      user : {
        email : "",
        password : ""
      },
      errorMsg : null
    };
  },
  methods : {
    startLogin(){
      let self = this;
            this.$http
      .post("/shop/login", this.user)
        .then(function(response) {
          console.log(response);
          //self.$emit('signupComplete', response.data);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', response.data.user.type);
          self.$bus.$emit('logged', 'User logged in.')
          if(response.data.user.type === 'shop'){
            self.$router.push({name : 'myfoods'})
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
