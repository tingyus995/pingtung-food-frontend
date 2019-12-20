<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12" :md="orders.length === 1 ? 12 : 6" v-for="(order, index) in orders" :key="index">
        <div class="card mb-4">
          <div class="card-header">
            <slot name="top" :order="order"></slot>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item text-left" v-for="item in order.items" :key="item.id">
                {{ item.name}}
                <span class="badge badge-success">{{ item.amount }}</span>
                <div class="float-right right-price">
                  <div class="price">{{ item.amount }} x {{item.price }}</div>
                  <slot name="item" :item="item"></slot>
                </div>
              </li>
            </ul>
          </div>
          <div class="card-footer">
            <font-awesome-icon icon="coins"></font-awesome-icon>
            共{{ totalPrice(order) }}元
            <div v-if="showTime" class="float-right">{{ getTime(order.createdAt) }}</div>
          </div>
          <div class="btn-group">
            <slot name="button" :order="order"></slot>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "ordercardlist",
  components: {},
  props: ["orders", "showTime"],
  data() {
    return {};
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
    getTime(time) {
      //console.log("getting from now");
      this.tick--;
      return this.$moment(time).format("llll");
    },
    totalPrice(order) {
      console.log(order);
      let price = 0;

      order.items.forEach(item => {
        price += item.price * item.amount;
      });

      return price;
    }
  }
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
