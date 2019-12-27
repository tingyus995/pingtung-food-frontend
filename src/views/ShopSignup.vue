<template>
  <div class="login container-fluid">
    <form class="form-signin">
      <!--<img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">-->
      <h1 class="h3 mb-3 font-weight-normal">申請一個帳號</h1>
      <b-alert variant="success" show>提醒您，這裡是店家帳號申請頁面，如果您是學生，請按<router-link :to="{name:'signup'}">這裡</router-link>前往學生帳號申請頁面。</b-alert>
      <label for="inputName" class="sr-only">店家名稱</label>
      <input
        v-model="user.name"
        type="text"
        id="inputName"
        class="form-control"
        placeholder="店家名稱"
        required
        autofocus
      />
      <label for="inputEmail" class="sr-only">Email</label>
      <input
        v-model="user.email"
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="E-mail"
        required
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
        <label>
          <input type="checkbox" value="remember-me" /> 我同意使用者合約
        </label>
      </div>
      <button
        class="btn btn-lg btn-primary btn-block"
        type="submit"
        @click.prevent="createStudent"
      >建立帳號</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
    </form>
  </div>
</template>

<script>
//import axios from "axios";
export default {
  name: "signup",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: ""
      }
    }; 
  },
  methods: {
    createStudent() {
      let self = this;
      console.log(this.user);

      this.$http
      .post("/shop", this.user)
        .then(function(response) {
          console.log(response);
          //self.$emit('signupComplete', response.data);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', response.data.user.type);

          self.$bus.$emit('logged', 'User logged in.')
          self.$router.push({name : 'addfood'})
        })
        .catch(function(error) {
          console.log(JSON.stringify(error.response.data));
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.form-signin input {
  border-radius: 0px;
}
.form-signin input:first-of-type {
  margin-bottom: -1px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
}

.form-signin input:last-of-type {
  margin-top: -1px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
}

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
</style>
