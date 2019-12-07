<template>
  <div class="add-food container-fluid">
    <div class="card" v-for="(order,index) in orders" :key="index">
      <div class="card-header">
        <font-awesome-icon icon="store-alt"></font-awesome-icon>{{ order.shop}}
      </div>

      <div class="card-body" >
        <ul class="list-group list-group-flush">
          <li class="list-group-item text-center" v-if="!order.items.length">沒有訂單</li>

          <li class="list-group-item text-left" v-for="item in order.items" :key="item.id">
            {{ item.name}}
            <span class="badge badge-success">{{ item.amount }}</span>
            <div class="float-right right-price">
              <div class="price">{{ item.amount }} x {{item.price }}</div>
              <button class="btn btn-danger" @click.prevent="deleteItem(order, item)">
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
        <button :disabled="!order.items.length" class="btn btn-primary">
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
  data() {
    return {
      orders: [
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
      tags: []
    };
  },
  methods: {
    deleteItem(order, i) {
      //console.log("debug");
      //console.log(id);
      order.items = order.items.filter(item => {
        return item != i;
      });
      //this.orders.splice(1,1);
      //console.log(this.orders);
    },
        totalPrice(order) {
      console.log(order);
      let price = 0;

      order.items.forEach(item => {
        price += item.price * item.amount;
      });

      return price;
    }
  },
  computed: {

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
