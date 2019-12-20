<template>
  <b-container fluid>
    <b-alert v-if="!orders.length" show variant="info">清單內沒有食物喔！</b-alert>
    <router-link class="btn btn-primary" v-if="!orders.length" :to="{ name: 'foods' }">到食物列表發掘食物吧！</router-link>

    <OrderCardList :orders="orders">
      <template v-slot:top="props">
        <font-awesome-icon icon="store-alt"></font-awesome-icon>
        {{ props.order.shop}}
      </template>

      <template v-slot:item="props">
        <button class="btn btn-danger" @click.prevent="deleteItem(props.item)">
          <font-awesome-icon icon="trash-alt"></font-awesome-icon>
        </button>
      </template>

      <template v-slot:button="props">
        <button
          :disabled="!props.order.items.length"
          @click="placeTheOrder(props.order)"
          class="btn btn-primary"
        >
          <font-awesome-icon icon="money-check-alt"></font-awesome-icon>下訂單
        </button>
      </template>
    </OrderCardList>
  </b-container>
</template>

<script>
import OrderCardList from "../components/OrderCardList"
export default {
  name: "cart",
  components: {
    OrderCardList
  },
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

            self.$emit("remove_order", order);
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
</style>
