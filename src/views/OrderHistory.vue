<template>
  <div class="add-food container container-fluid">
    <div class="card mb-4" v-for="(order,index) in orders.slice().reverse()" :key="index">
      <div class="card-header">
        <div class="status">
          <b-badge :variant="getVariant(order)" class="float-left">{{ getStatus(order) }}</b-badge>
        </div>
        <font-awesome-icon icon="store-alt"></font-awesome-icon>
        {{ order.shop}}
      </div>

      <div class="card-body">
        <ul class="list-group list-group-flush">
          <li class="list-group-item text-center" v-if="!order.items.length">沒有訂單</li>

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
        <div class="float-right">{{ getTime(order.createdAt) }}</div>
        <font-awesome-icon icon="coins"></font-awesome-icon>
        共{{ totalPrice(order) }}元
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderhistory",
  components: {},
  data() {
    return {
      orders: [],
      
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
        return "已通知取餐";
      } else if (order.status == "rejected") {
        return "已拒絕訂單";
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
    },
    totalPrice(order) {
      console.log(order);
      let price = 0;

      order.items.forEach(item => {
        price += item.price * item.amount;
      });

      return price;
    },
    getTime(time){
      //console.log("getting from now");
      this.tick--;
      return this.$moment(time).format('llll');
    }
  },
  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.right-price > * {
  display: inline-block;
}
.right-price .price {
  padding-right: 10px;
}
</style>
