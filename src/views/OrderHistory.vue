<template>
  <OrderCardList :orders="orders.slice().reverse()" show-time="true">
    <template v-slot:top="props">
      <div class="status">
        <b-badge :variant="getVariant(props.order)" class="float-left">{{ getStatus(props.order) }}</b-badge>
      </div>
      <font-awesome-icon icon="store-alt"></font-awesome-icon>
      {{ props.order.shop}}
    </template>
  </OrderCardList>
</template>

<script>
import OrderCardList from "../components/OrderCardList";
export default {
  name: "orderhistory",
  components: {
    OrderCardList
  },
  data() {
    return {
      orders: []

      /*orders: [
        {
          shop: "捲捲泰式料理",
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
        }
      ],

      tag: "",
      tags: []*/
    };
  },
  created() {
    let self = this;

    let token = localStorage.getItem("token");
    let config = {
      headers: { Authorization: "bearer " + token }
    };

    this.$http
      .get("/order", config)
      .then(function(response) {
        console.log(response);
        self.orders = response.data;
        //self.$emit('signupComplete', response.data);

        //self.$router.push({ name: "addfood" });
      })
      .catch(function(error) {
        //console.log(JSON.stringify(error.response.data));
      });

    this.sockets.subscribe("order_change", data => {
      // for student
      console.log("LISTENED_FROM_ORDERHISTORY_PAGE");
      //console.log(data);
      console.log(data);

      this.orders.map(ord => {
        if (ord._id === data._id) {
          ord.status = data.status;
        }
        return ord;
      });

      //this.shopOrders.unshift(data);
      //console.log(this.shopOrders);
    });
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
      //console.log("debug varient");
      if (order.status == "created") {
        return "primary";
      } else if (order.status == "finished") {
        return "secondary";
      } else if (order.status == "notified") {
        return "warning";
      } else if (order.status == "rejected") {
        return "danger";
      }
    }

  },
  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
