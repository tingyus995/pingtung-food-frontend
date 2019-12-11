<template>
  <div class="add-food container container-fluid">
    <div class="card" v-for="(order,index) in orders" :key="index">
      <div class="card-header">
         <b-badge class="float-left">{{ getStatus(order) }}</b-badge>
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

            </div>
          </li>
        </ul>
      </div>
      <div class="card-footer">
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
      orders : []
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
  created(){
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
  },

  methods: {
      getStatus(order){
        if(order.status == 'created'){
          return "訂單成立"
        }else if(order.status == 'finished'){
          return "訂單完成"
        }else if(order.status == 'ready'){
          return "可取餐"
        }else if(order.status == 'rejected'){
          return "訂單被拒絕"
        }
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
