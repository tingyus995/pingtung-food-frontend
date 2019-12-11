<template>
  <div class="add-food container-fluid">
     <b-alert v-if="!orders.length" show variant="info">清單內沒有食物喔！</b-alert>
     <router-link class="btn btn-primary" v-if="!orders.length" :to="{ name: 'orderhistory' }" >前往查看您的訂單吧</router-link>
    <div class="card mb-4" v-for="(order,index) in orders" :key="index">
      <div class="card-header">
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
              <button class="btn btn-danger" @click.prevent="deleteItem(item)">
                <font-awesome-icon icon="trash-alt"></font-awesome-icon>
              </button>
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
          :disabled="!order.items.length"
          @click="placeTheOrder(order)"
          class="btn btn-primary"
        >
          <font-awesome-icon icon="money-check-alt"></font-awesome-icon>下訂單
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cart",
  components: {},
  props: ["orders"],
  data() {
    return {};
  },
  methods: {
    deleteItem(item) {
      this.$emit("cart_remove", item);
    },
    totalPrice(order) {
      console.log(order);
      let price = 0;

      order.items.forEach(item => {
        price += item.price * item.amount;
      });

      return price;
    },
    placeTheOrder(order) {
      let self = this;
      console.log("debug");
      if (order.items.length) {
        

        let token = localStorage.getItem("token");
        let config = {
          headers: { Authorization: "bearer " + token }
        };

        this.$http
          .post("/order", order, config)
          .then(function(response) {
            console.log(response);
            //self.$emit('signupComplete', response.data);
            
            self.$emit('remove_order', order);
            //self.$router.push({ name: "addfood" });
          })
          .catch(function(error) {
            //console.log(JSON.stringify(error.response.data));
          });
      }
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
