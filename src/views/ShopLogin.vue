<template>
  <LoginForm @login="startLogin" :error-message="errorMsg">
    <template v-slot:header>
      <h1 class="h3 mb-3 font-weight-normal">店家端登入</h1>
      <b-alert variant="success" show>
        提醒您，這裡是店家端登入頁面，如果您是學生，請按
        <router-link :to="{name:'login'}">這裡</router-link>前往學生端登入頁面。
      </b-alert>
    </template>
    <template v-slot:footer>
       <b-link :to="{name : 'shopsignup'}">申請店家帳號</b-link>
    </template>
  </LoginForm>
</template>

<script>
import LoginForm from "../components/LoginForm";
export default {
  name: "login",
  components: {
    LoginForm
  },
  data() {
    return {
      errorMsg: ""
    };
  },
  methods: {
    startLogin(user) {
      this.errorMsg = "";
      console.log("user:");
      console.log(user);
      let self = this;
      this.$http
        .post("/shop/login", user)
        .then(function(response) {
          console.log(response);
          //self.$emit('signupComplete', response.data);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", response.data.user.type);
          self.$bus.$emit("logged", "User logged in.");
          if (response.data.user.type === "shop") {
            self.$router.push({ name: "myfoods" });
          }
        })
        .catch(function(error) {
          console.log(error.response.data);
          console.log(JSON.stringify(error.response.data));
          self.errorMsg = "帳號或密碼錯誤";
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
