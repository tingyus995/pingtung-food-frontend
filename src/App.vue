<template>
  <div id="app">
    <Navbar :orders="orders" :notifications="notifications" />

    <div class="app-view">
      <b-alert
        v-for="(no,index) in notifications"
        :key="index"
        show="true"
        :variant="no.varient"
        @dismissed="deleteNotification(index)"
        dismissible
      >{{ no.message }}</b-alert>
      <transition name="slide-fade">
        <router-view
          :orders="orders"
          :shopOrders="shopOrders"
          @cart_add="addToCart"
          @cart_remove="removeFromCart"
          @remove_order="removeOrder"
        />
      </transition>
    </div>
  </div>
</template>
<script>
import Navbar from "./views/Navbar";

export default {
  data() {
    return {
      orders: [], // for student
      shopOrders: [], // for shop
      notifications: [],
      showDismissibleAlert: true
    };
  },
  components: {
    Navbar
  },
  sockets: {
    connect() {
      console.log("socket connected.");

      if (localStorage.getItem("token")) {
        // logged in => auth now
        this.$socket.emit("auth", localStorage.getItem("token"));
      } else {
        // not logged in => wait until login
        this.$bus.$on("logged", () => {
          this.$socket.emit("auth", localStorage.getItem("token"));
        });
      }
    }
  },
  beforeMount() {
    console.log("created hello");
    /*this.sockets.subscribe('hello', data => {
      console.log(data);
    })*/
    this.sockets.subscribe("new_order", data => {
      // for shop
      console.log("new_order");
      //console.log(data);
      console.log(data);
      this.shopOrders.push(data);
      console.log(this.shopOrders);
    });

    this.sockets.subscribe("order_change", data => {
      // for student
      console.log("order_ready");
      //console.log(data);
      console.log(data);
      //this.shopOrders.unshift(data);
      //console.log(this.shopOrders);
      let verb = "";
      let varient = "info";
      if (data.status === "rejected") {
        verb = "被拒絕";
        varient = "danger";
      } else if (data.status === "finished") {
        verb = "已完成";
      } else if (data.status === "notified") {
        verb = "可以去拿";
      }

      this.notifications.push({
        varient,
        message: "一個訂單已經" + verb + "囉！"
      });

      console.log(this.notifications);
    });
  },
  methods: {
    deleteNotification(index) {
      this.notifications.splice(index, 1);
    },
    addToCart(item) {
      // for students
      let found = false;

      this.orders.forEach(ord => {
        if (ord.shopId === item.shopId) {
          found = true;
        }
      });

      if (!found) {
        // never seen the shop before

        this.orders.push({
          shop: item.shop,
          shopId: item.shopId,
          items: []
        });
      }
      // shop is there
      // find target order
      this.orders.map(ord => {
        if (ord.shopId === item.shopId) {
          // found target order
          // find target item
          let found = false;

          ord.items.map(it => {
            if (it._id === item._id) {
              // found target item
              found = true;
              it.amount += 1;
            }
            return it;
          });

          if (!found) {
            ord.items.push({
              name: item.name,
              _id: item._id,
              price: item.price,
              amount: 1
            });
          }
        }
        return ord;
      });

      console.log(this.orders);
    },
    removeFromCart(item) {
      // for students
      this.orders.map(ord => {
        ord.items.map(it => {
          if (it._id === item._id) {
            it.amount -= 1;
          }
          return it;
        });

        ord.items = ord.items.filter(it => {
          return it.amount >= 1;
        });
        return ord;
      });

      this.orders = this.orders.filter(ord => {
        return ord.items.length > 0;
      });
    },
    removeOrder(order) {
      console.log("removing order");
      this.orders = this.orders.filter(ord => {
        return ord != order;
      });
    }
  },
  created() {
    let self = this;
    console.log("debugggg");
    //this.getAllOrders();
    console.log("after getting orders");
    function getAllOrders() {
      console.log("getting all orders");
      if (localStorage.getItem("user") === "shop") {
        // for shops
        // get all orders
        //let self = this;
        let token = localStorage.getItem("token");
        let config = {
          headers: { Authorization: "bearer " + token }
        };

        self.$http
          .get("/order/shop", config)
          .then(function(response) {
            console.log(response);
            self.shopOrders = response.data;
            //self.$emit('signupComplete', response.data);

            //self.$router.push({ name: "addfood" });
          })
          .catch(function(error) {
            //console.log(JSON.stringify(error.response.data));
          });
      }
    }
    getAllOrders();

    this.$bus.$on("logged", () => {
      getAllOrders();
    });
  }
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

#app {
  font-family: "微軟正黑體", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.modal-content {
  font-family: "微軟正黑體";
}
.slide-fade-enter-active {
  transition: all 0.6s ease;
}
.slide-fade-leave-active {
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.app-view {
  margin: 0 auto;
  margin-top: 70px;
  max-width: 1200px;
}
</style>

