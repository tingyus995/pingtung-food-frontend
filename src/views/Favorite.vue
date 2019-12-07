<template>
  <div class="add-food container-fluid">
    <div class="card" v-for="(favorite,index) in favorites" :key="index">
      <div class="card-header">
        <font-awesome-icon icon="heart"></font-awesome-icon>{{ favorite.shop}}
      </div>

      <div class="card-body" >
        <ul class="list-group list-group-flush">
          <li class="list-group-item text-center" v-if="!favorite.items.length">沒有最愛食物</li>

          <li class="list-group-item text-left" v-for="item in favorite.items" :key="item.id">
            {{ item.name}}            
            <div class="float-right right-price">
              <div class="price">$ {{item.price }}</div>
              <div class="btn-group">
              <button class="btn btn-primary" @click.prevent="deleteItem(favorite, item)">
                <font-awesome-icon icon="cart-plus"></font-awesome-icon>
              </button>
              <button class="btn btn-danger" @click.prevent="deleteItem(favorite, item)">
                <font-awesome-icon icon="trash-alt"></font-awesome-icon>
              </button>
              </div>

            </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "favorite",
  components: {},
  data() {
    return {
      favorites: [
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
        },
        {
          shop: "超好吃中式料理",
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
