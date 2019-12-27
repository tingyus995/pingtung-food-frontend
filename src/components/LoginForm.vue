<template>
  <div>
    <form class="form-signin" @submit.prevent="startLogin">
      <!--<img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">-->
      <slot name="header"></slot>
      <b-alert v-if="errorMsg" show variant="danger">{{ errorMsg }}</b-alert>
      <b-alert v-if="errorMessage" show variant="danger">{{ errorMessage }}</b-alert>
      <label for="inputEmail" class="sr-only">Email</label>
      <b-form-input
        ref="inputEmail"
        :state="inputState"
        v-model="user.email"
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="E-mail"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">密碼</label>
      <b-form-input
        :state="inputState"
        v-model="user.password"
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="密碼"
        required
      />
      <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
    </form>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: "loginform",
  props: ["errorMessage"],
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      errorMsg: null
    };
  },
  computed: {
    inputState() {
      if (this.errorMessage) {
        return false;
      }
      return null;
    }
  },
  methods: {
    startLogin() {
      this.errorMsg = "";
      let email_re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!this.user.email) {
        this.errorMsg = "請輸入正確的E-mail";
        return;
      }
      if (!email_re.test(this.user.email)) {
        this.errorMsg = "E-mail 格式不正確";
        return;
      }
      if (!this.user.password) {
        this.errorMsg = "密碼不能是空的";
        return;
      }

      this.$emit("login", this.user);
    }
  },
  watch:{
      errorMessage(){
          if(this.errorMessage){
            this.$refs.inputEmail.focus();
          }
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
