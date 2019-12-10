<template>
  <div class="container-fluid">
    <b-nav>
      <b-nav-item>
        <router-link to="/">Home</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/about">About</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link v-if="isLoggedIn && type== 'student'" :to="{ name: 'foods' }">食物列表</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link v-if="isLoggedIn && type== 'student'" :to="{ name: 'cart' }">購買清單</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link v-if="isLoggedIn && type== 'student'" :to="{ name: 'orderhistory' }">訂單查詢</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link v-if="isLoggedIn && type== 'student'" :to="{ name: 'profile' }">我的帳號</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link v-if="isLoggedIn && type== 'shop'" :to="{ name: 'myfoods' }">我的食物</router-link>
      </b-nav-item>

      <b-nav-item>
        <router-link v-if="isLoggedIn && type== 'shop'" :to="{ name: 'addfood' }">新增食物</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link v-if="isLoggedIn && type== 'shop'" :to="{ name: 'orderlist' }">檢視訂單</router-link>
      </b-nav-item>





      <b-nav-item>
        <a v-if="isLoggedIn" @click.prevent="logout">登出</a>
      </b-nav-item>
      <b-nav-item>
        <router-link v-if="!isLoggedIn" :to="{ name: 'login' }">登入</router-link>
      </b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isLoggedIn : false,
      type : 'guest'
    };
  },
  computed: {

  },
  beforeMount(){
    this.checkLogin();
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$bus.$emit('logged','User logged out.');      
      this.$router.push("/login");
    },
    checkLogin() {
      this.isLoggedIn = localStorage.getItem("token") !== null;
      this.type = localStorage.getItem("user");
    }
  },
  created(){
    let self = this;
    this.$bus.$on('logged', ()=>{
      self.checkLogin();
    })
  }
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    //color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>