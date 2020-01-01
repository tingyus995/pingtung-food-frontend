<template>
  <div>
    <div v-if="isLoggedIn" class="notification-count d-block d-sm-none" >    
      <b-badge v-if="(orderCount + notifications.length) > 0" variant="danger">{{ orderCount + notifications.length }}</b-badge>
    </div>
    <div v-if="isLoggedIn" class="navigation-icon d-none d-sm-block d-lg-none" >
      <ul>
        <template v-if="type== 'student'">
          <li><router-link :to="{ name: 'foods' }" ><font-awesome-icon size="lg" icon="utensils"></font-awesome-icon></router-link></li>
          <li><router-link :to="{ name: 'favorites' }" ><font-awesome-icon size="lg" icon="heart"></font-awesome-icon></router-link></li>
          <li><router-link :to="{ name: 'cart' }" ><font-awesome-icon size="lg" icon="shopping-cart"></font-awesome-icon><b-badge v-if="orderCount > 0" variant="danger">{{orderCount }}</b-badge></router-link></li>
          <li><router-link :to="{ name: 'orderhistory' }" ><font-awesome-icon size="lg" icon="clipboard-list"></font-awesome-icon><b-badge v-if="notifications.length > 0" variant="danger">{{ notifications.length }}</b-badge></router-link></li>
          <li><router-link :to="{ name: 'profile' }" ><font-awesome-icon size="lg" icon="user"></font-awesome-icon></router-link></li>
        </template>
        <template v-if="type== 'shop'">
          <li><router-link :to="{ name: 'myfoods' }" ><font-awesome-icon size="lg" icon="utensils"></font-awesome-icon></router-link></li>
          <li><router-link :to="{ name: 'addfood' }" ><font-awesome-icon size="lg" icon="plus-square"></font-awesome-icon></router-link></li>
          <li><router-link :to="{ name: 'orderlist' }" ><font-awesome-icon size="lg" icon="clipboard-list"></font-awesome-icon><b-badge v-if="notifications.length > 0" variant="danger">{{ notifications.length }}</b-badge></router-link></li>
          <li><router-link :to="{ name: 'shopprofile' }" ><font-awesome-icon size="lg" icon="store-alt"></font-awesome-icon></router-link></li>
          
        </template>
      </ul>
      
    </div>
    <b-navbar toggleable="lg" type="light" variant="light" fixed="top">
      <b-navbar-brand :to="{ name : 'home'}">探索屏東美食</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>          
            <b-nav-item to="/" >首頁</b-nav-item>  
            <b-nav-item to="/about" >關於</b-nav-item>
          <template v-if="isLoggedIn">
            <template v-if="type== 'student'">
              <b-nav-item :to="{ name: 'foods' }">探索美食</b-nav-item>
              <b-nav-item :to="{ name: 'favorites' }">我的最愛</b-nav-item>
              <b-nav-item :to="{ name: 'cart' }">
                點菜清單
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

              <b-button-group class="ml-2">
                <b-button
                  id="shop-open-button"
                  @click="changeShopState('open')"
                  :variant="openBtnVarient"
                >
                  <font-awesome-icon
                    v-if="shop.status === 'open'"
                    class="mr-2"
                    size="xs"
                    :style="{color:'rgb(66,183,42)', position: 'relative',top : '-1px'}"
                    icon="circle"
                  ></font-awesome-icon>營業中
                </b-button>
                <b-tooltip
                  v-if="shop.status !== 'open'"
                  target="shop-open-button"
                  triggers="hover"
                >按這裡將您的店家設為營業狀態，開始接收訂單吧！</b-tooltip>
                <b-tooltip
                  v-else
                  target="shop-open-button"
                  triggers="hover"
                >您的店家目前已設為營業狀態，學生可隨時向您下訂單！</b-tooltip>
                <b-button
                  id="shop-closed-button"
                  @click="changeShopState('closed')"
                  :variant="closedBtnVarient"
                >
                  <font-awesome-icon
                    v-if="shop.status === 'closed'"
                    class="mr-2"
                    size="xs"
                    :style="{color:'#f67280', position: 'relative',top : '-1px'}"
                    icon="circle"
                  ></font-awesome-icon>休息中
                </b-button>
                <b-tooltip
                  v-if="shop.status !== 'closed'"
                  target="shop-closed-button"
                  triggers="hover"
                >按這裡將您的店家設為休息狀態，學生將無法下訂單！</b-tooltip>
                <b-tooltip
                  v-else
                  target="shop-closed-button"
                  triggers="hover"
                >您的店家目前已設為休息狀態，學生無法向您下訂單！</b-tooltip>
                <b-button
                  id="shop-full-button"
                  @click="changeShopState('full')"
                  :variant="fullBtnVarient"
                >
                  <font-awesome-icon
                    v-if="shop.status === 'full'"
                    class="mr-2"
                    size="xs"
                    :style="{color:'#f67280', position: 'relative',top : '-1px'}"
                    icon="circle"
                  ></font-awesome-icon>訂單已滿
                </b-button>
                <b-tooltip
                  v-if="shop.status !== 'full'"
                  target="shop-full-button"
                  triggers="hover"
                >按這裡將您的店家設為已滿狀態，學生將無法下訂單！</b-tooltip>
                <b-tooltip
                  v-else
                  target="shop-full-button"
                  triggers="hover"
                >您的店家目前已設為已滿狀態，學生無法向您下訂單！</b-tooltip>
              </b-button-group>
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
      type: "guest",
      shop: "",
      student: "",
      buttonVariant: {
        active: "primary",
        inactive: "outline-primary"
      }
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
      let self = this;

      this.isLoggedIn = localStorage.getItem("token") !== null;
      this.type = localStorage.getItem("user");
      if (this.isLoggedIn) {
        let token = localStorage.getItem("token");
        let config = {
          headers: { Authorization: "bearer " + token }
        };
        if (this.type === "student") {
          this.$http
            .get("/student", config)
            .then(function(response) {
              console.log(response);
              if (response.data) {
                self.student = response.data;
                console.log(self.student);
              }
            })
            .catch(function(error) {
              console.log(error.response.data);
            });
        }

        if (this.type === "shop") {
          this.$http
            .get("/shop", config)
            .then(function(response) {
              console.log(response);
              if (response.data) {
                self.shop = response.data;
                console.log(self.shop);
              }
            })
            .catch(function(error) {
              console.log(error.response.data);
            });
        }
      }
    },
    changeShopState(target) {
      if (!(target === "open" || target === "full" || target === "closed"))
        return;
      if (target === this.shop.status) return;

      let self = this;
      let token = localStorage.getItem("token");
      let config = {
        headers: { Authorization: "bearer " + token }
      };

      this.$http
        .put(
          "/shop/status",
          {
            status: target
          },
          config
        )
        .then(function(response) {
          console.log(response);
          self.shop.status = target;
        })
        .catch(function(error) {
          console.log(error);
          console.log(error.response.data);
        });

      console.log(target);
    }
  },
  computed: {
    openBtnVarient() {
      if (this.shop.status === "open") return this.buttonVariant.active;
      return this.buttonVariant.inactive;
    },
    closedBtnVarient() {
      if (this.shop.status === "closed") return this.buttonVariant.active;
      return this.buttonVariant.inactive;
    },
    fullBtnVarient() {
      if (this.shop.status === "full") return this.buttonVariant.active;
      return this.buttonVariant.inactive;
    },
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

    userName() {
      if (!this.isLoggedIn) return "";
      if (this.type === "student") {
        return this.student.name;
      }
      if (this.type === "shop") {
        return this.shop.name;
      }
      return "";
    }
  },
  created() {
    let self = this;

    //console.log(notifications);
    this.$bus.$on("logged", () => {
      self.checkLogin();
    });
    this.$bus.$on("navbar_update", () => {
      self.checkLogin();
    });

    this.sockets.subscribe("shop_change_self", data => {      
      console.log("shop change self");
      this.shop = data;
    });
  }
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
.navbar-nav .router-link-exact-active {
  font-weight: bold;
  background: #ddd;
  border-radius: 5px;
}
nav{
  .logo-img{
    height:25px;
  }
}
.navigation-icon{
  position: fixed;
  z-index:1031;
  top:0;
  left:150px;
  height: 56px;
  /*background:#ddd;*/

  a{
    transition: color .4s ease;
    color:#999999;
    &:hover{
      color:#1b2a49;
    }
    &.router-link-exact-active{
      color:#465881;
    }

  }
  ul{
    padding-left:0;
    li{
      height:56px;
      display: inline-block;
      text-align:center;
      width:56px;
      text-align:center;
      line-height: 56px;
      .badge{
        position: relative;
        top:-10px;
        left:-5px;
      }

    }
  }

}
.notification-count{
  position: fixed;
  z-index:1032;
  top:0;
  right:6px;
  
}

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