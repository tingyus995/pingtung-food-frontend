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
        <router-link v-if="isLoggedIn && type== 'student'" :to="{ name: 'cart' }">購買清單 <b-badge v-if="orderCount > 0" variant="info">{{orderCount }}</b-badge></router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link v-if="isLoggedIn && type== 'student'" :to="{ name: 'orderhistory' }">訂單查詢 <b-badge v-if="notifications.length > 0" variant="info">{{ notifications.length }}</b-badge> </router-link>
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
        <router-link v-if="isLoggedIn && type== 'shop'" :to="{ name: 'shopprofile' }">店家設定</router-link>
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
  props : ['orders','notifications'],
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
      let type = localStorage.getItem('user');
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$bus.$emit('logged','User logged out.');      
      if(type === 'student'){
        this.$router.push("/login");
      }else{
        this.$router.push("/shop/login")
      }
    },
    checkLogin() {
      this.isLoggedIn = localStorage.getItem("token") !== null;
      this.type = localStorage.getItem("user");
    }
  },
  computed :{
    orderCount(){

      //console.log(this.orders);

      let count = 0;

      this.orders.forEach( ord => {
        ord.items.forEach(it => {
          count += it.amount;
        })
      });
      return count;
    }
  },
  created(){
    let self = this;

    //console.log(notifications);
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