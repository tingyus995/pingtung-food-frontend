<template>
  <div>
     <b-navbar toggleable="md" type="light" variant="light" fixed="top">
    <b-navbar-brand href="#">探索屏東美食</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
      <b-nav-item>
        <router-link to="/">Home</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/about">About</router-link>
      </b-nav-item>

      <template v-if="isLoggedIn">
        <template v-if="type== 'student'">
          <b-nav-item :to="{ name: 'foods' }">食物列表</b-nav-item>
          <b-nav-item :to="{ name: 'favorites' }">我的最愛</b-nav-item>
          <b-nav-item :to="{ name: 'cart' }">
            購買清單
            <b-badge v-if="orderCount > 0" variant="info">{{orderCount }}</b-badge>
          </b-nav-item>
          <b-nav-item :to="{ name: 'orderhistory' }">
            訂單查詢
            <b-badge v-if="notifications.length > 0" variant="info">{{ notifications.length }}</b-badge>
          </b-nav-item>
          <b-nav-item :to="{ name: 'profile' }">我的帳號</b-nav-item>
        </template>

        <template v-if="type== 'shop'">
          <b-nav-item :to="{ name: 'myfoods' }">我的食物</b-nav-item>

          <b-nav-item :to="{ name: 'addfood' }">新增食物</b-nav-item>
          <b-nav-item :to="{ name: 'orderlist' }">檢視訂單</b-nav-item>

          <b-nav-item :to="{ name: 'shopprofile' }">店家設定</b-nav-item>
        </template>
        
      </template>

      
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <template v-if="isLoggedIn">          
          <b-nav-item @click.prevent="logout">登出 {{ userName }}</b-nav-item>
        </template>        
        <b-nav-item v-if="!isLoggedIn" :to="{ name: 'login' }">登入</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
export default {
  name: "Navbar",
  props: ["orders", "notifications"],
  data() {
    return {
      isLoggedIn: false,
      type: "guest"
    };
  },    
  beforeMount() {
    this.checkLogin();
  },
  methods: {
    logout() {
      let type = localStorage.getItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.$bus.$emit("logged", "User logged out.");
      if (type === "student") {
        this.$router.push("/login");
      } else {
        this.$router.push("/shop/login");
      }
    },
    checkLogin() {
      this.isLoggedIn = localStorage.getItem("token") !== null;
      this.type = localStorage.getItem("user");
    }
  },
  computed: {
    orderCount() {
      //console.log(this.orders);

      let count = 0;

      this.orders.forEach(ord => {
        ord.items.forEach(it => {
          count += it.amount;
        });
      });
      return count;
    },

    userName(){
      if(!this.isLoggedIn) return '';
      let token = localStorage.getItem("token");
      let user = VueJwtDecode.decode(token);
      
      return user.name;      
    }
  },
  created() {
    let self = this;

    //console.log(notifications);
    this.$bus.$on("logged", () => {
      self.checkLogin();
    });
  }
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

/*#nav {
  padding: 30px;

  a {
    font-weight: bold;
    //color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}*/
</style>