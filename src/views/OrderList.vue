<template>
  <div class="add-food container container-fluid">
    <div class="card" v-for="(order, index) in shopOrders.slice().reverse()" :key="index">
      <div class="card-header">
        <div class="status">
          <b-badge :variant="getVariant(order)" class="float-left">{{ getStatus(order) }}</b-badge>
        </div>
        <font-awesome-icon icon="user"></font-awesome-icon>
        {{ order.student.name }}
      </div>

      <div class="card-body">
        <ul class="list-group list-group-flush">
          <li class="list-group-item text-left" v-for="item in order.items" :key="item.id">
            {{ item.name}}
            <span class="badge badge-success">{{ item.amount }}</span>
            <div class="float-right right-price">
              <div class="price">{{ item.amount }} x {{item.price }}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="card-footer">
        <font-awesome-icon icon="coins"></font-awesome-icon>
        共{{ totalPrice(order) }}元
      </div>
      <div class="btn-group">
        <button
          :disabled="finishBtnDisable(order)"
          class="btn btn-primary"
          @click.prevent="finish(order)"
        >
          <font-awesome-icon icon="check"></font-awesome-icon>
          {{ order.finished ? "已完成" : "完成訂單"}}
        </button>
        <button
          :disabled="notifyBtnDisable(order)"
          class="btn btn-info"
          @click.prevent="notify(order)"
        >
          <font-awesome-icon icon="bell"></font-awesome-icon>
          {{ order.status === 'notified' ? "已通知" : "通知領取"}}
        </button>
        <b-button
          :disabled="rejectBtnDisable(order)"
          variant="danger"
          @click="confirmReject(order)"
        >
          <font-awesome-icon icon="user-slash"></font-awesome-icon>
          {{ order.status ==='rejected' ? "訂單已拒絕" : "拒絕訂單" }}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderlist",
  components: {},
  props: ["shopOrders"],
  data() {
    return {
      orders: [
        /*{
          notified: false,
          finished: false,
          rejected: false,

          shop: "捲捲泰式料理",
          user: {
            name: "TingYuYan"
          },
          items: [
            {
              id: 1,
              name: "番茄炒飯",
              amount: 1,
              price: 150
            },
            {
              id: 2,
              name: "鮮奶茶",
              amount: 2,
              price: 60
            }
          ]
        }*/
      ]
    };
  },

  created() {
    //this.orders = this.shopOrders;
    /* moved to App.vue
        let self = this;
           let token = localStorage.getItem("token");
        let config = {
          headers: { Authorization: "bearer " + token }
        };

        this.$http
          .get("/order/shop", config)
          .then(function(response) {
            console.log(response);
            self.orders = response.data;
            //self.$emit('signupComplete', response.data);
            
            
            //self.$router.push({ name: "addfood" });
          })
          .catch(function(error) {
            //console.log(JSON.stringify(error.response.data));
          });
    */
  },
  methods: {
    getStatus(order) {
      if (order.status == "created") {
        return "訂單成立";
      } else if (order.status == "finished") {
        return "訂單完成";
      } else if (order.status == "notified") {
        return "可取餐";
      } else if (order.status == "rejected") {
        return "訂單被拒絕";
      }
    },
    getVariant(order) {
      console.log("debug varient");
      if (order.status == "created") {
        return "primary";
      } else if (order.status == "finished") {
        return "secondary";
      } else if (order.status == "notified") {
        return "warning";
      } else if (order.status == "rejected") {
        return "danger";
      }
    },
    totalPrice(order) {
      console.log(order);
      let price = 0;

      order.items.forEach(item => {
        price += item.price * item.amount;
      });

      return price;
    },
    sendOrderRequest(data) {
      let self = this;
      let token = localStorage.getItem("token");
      let config = {
        headers: { Authorization: "bearer " + token }
      };

      return this.$http.put("/order/shop", data, config);
    },

    notify(order) {
      console.log("notify clicked");
      console.log(order);
      this.sendOrderRequest({
        action: "notify",
        _id: order._id
      })
        .then(function(response) {
          console.log(response);
          self.shopOrders = response.data;

          order.status = "notified";
          //self.$emit('signupComplete', response.data);

          //self.$router.push({ name: "addfood" });
        })
        .catch(function(error) {
          console.log(error);
          console.log(error.response.data);
          //console.log(JSON.stringify(error.response.data));
        });
    },
    finish(order) {
      //order.finished = true;

      this.sendOrderRequest({
        action: "finish",
        _id: order._id
      })
        .then(function(response) {
          console.log(response);
          self.shopOrders = response.data;

          order.status = "finished";
          //self.$emit('signupComplete', response.data);

          //self.$router.push({ name: "addfood" });
        })
        .catch(function(error) {
          console.log(error);
          console.log(error.response.data);
          //console.log(JSON.stringify(error.response.data));
        });
    },

    finishBtnDisable(order) {
      if (order.status === "rejected") return true;
      if (!order.status === "notified") return false;
      if (order.status === "created") return true;
      if (order.status === "finished") return true;
    },

    notifyBtnDisable(order) {
      if (order.status === "rejected") return true;
      if (order.status === "finished") return true;
      if (order.status === "notified") return true;
      if (order.status === "created") return false;
    },
    rejectBtnDisable(order) {
      if (order.status === "rejected") return true;
      if (order.status === "finished") return true;
      if (order.status === "notified") return true;
      if (order.status === "created") return false;
    },

    confirmReject(order) {
      //this.boxTwo = ''
      this.$bvModal
        .msgBoxConfirm("拒絕訂單後將無法復原", {
          title: "您確定嗎？",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "拒絕訂單",
          cancelTitle: "取消",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          //order.rejected = value;
          if (value) {
            this.sendOrderRequest({
              action: "reject",
              _id: order._id
            })
              .then(function(response) {
                console.log(response);
                self.shopOrders = response.data;

                order.status = "rejected";
                //self.$emit('signupComplete', response.data);

                //self.$router.push({ name: "addfood" });
              })
              .catch(function(error) {
                console.log(error);
                console.log(error.response.data);
                //console.log(JSON.stringify(error.response.data));
              });
          }
        })
        .catch(err => {
          // An error occurred
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
