<template>
    <OrderCardList :orders="shopOrders.slice().reverse()" show-time="true">
      <template v-slot:top="props">
        <b-badge :variant="getVariant(props.order)" class="float-left">{{ getStatus(props.order) }}</b-badge>
        <font-awesome-icon icon="user"></font-awesome-icon>
        {{ props.order.student.name }}
      </template>
      <template v-slot:button="props">
        <button
          :disabled="finishBtnDisable(props.order)"
          class="btn btn-primary"
          @click.prevent="finish(props.order)"
        >
          <font-awesome-icon icon="check"></font-awesome-icon>
          {{ props.order.finished ? "已完成" : "完成訂單"}}
        </button>
        <button
          :disabled="notifyBtnDisable(props.order)"
          class="btn btn-info"
          @click.prevent="notify(props.order)"
        >
          <font-awesome-icon icon="bell"></font-awesome-icon>
          {{ props.order.status === 'notified' ? "已通知" : "通知領取"}}
        </button>
        <b-button
          :disabled="rejectBtnDisable(props.order)"
          variant="danger"
          @click="confirmReject(props.order)"
        >
          <font-awesome-icon icon="user-slash"></font-awesome-icon>
          {{ props.order.status ==='rejected' ? "訂單已拒絕" : "拒絕訂單" }}
        </b-button>
      </template>
    </OrderCardList>

</template>

<script>
import OrderCardList from "../components/OrderCardList";
export default {
  name: "orderlist",
  components: {
    OrderCardList
  },
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
        return "已通知取餐";
      } else if (order.status == "rejected") {
        return "已拒絕訂單";
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
