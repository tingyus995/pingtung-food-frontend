<template>
  <div id="app">
      <Navbar />

      <transition name="slide-fade">
    <router-view :orders="orders" @cart_add="addToCart" @cart_remove="removeFromCart" @remove_order="removeOrder" />
      </transition>
  </div>
</template>
<script>

import Navbar from "./views/Navbar"

export default {
  data(){
    return {
      
      orders : []
      
    }
  },
  components:{
    Navbar
  },
  methods: {
    
    
    addToCart(item){



        let found = false;

        this.orders.forEach(ord => {
          if(ord.shopId === item.shopId){
            found = true;
          }
        })


        if(!found){
          // never seen the shop before
          
          this.orders.push({
            shop: item.shop,
            shopId: item.shopId,
            items : []
          })
        }
        // shop is there
        // find target order
        this.orders.map(ord => {
          if(ord.shopId === item.shopId){
            // found target order
            // find target item
            let found = false;
            
            ord.items.map(it => {
              if(it._id === item._id){
                // found target item
                found = true;
                it.amount += 1;
              }
              return it;
            })

            if(!found){
              ord.items.push({
                name : item.name,
                _id: item._id,
                price : item.price,
                amount : 1
              })
            }
            
          }
          return ord;
        })     

      console.log(this.orders);

    },
    removeFromCart(item){
      this.orders.map(ord => {
        ord.items.map(it => {
          if(it._id === item._id){
            it.amount -= 1;            
          }
          return it;
        })

        ord.items = ord.items.filter(it => {
          return it.amount >= 1
        })
        return ord;
      })

      this.orders = this.orders.filter(ord => {
        return ord.items.length > 0
      })
    
    },
    removeOrder(order){
      console.log("removing order");
      this.orders = this.orders.filter(ord => {
        return ord != order;
      })
    }
  },
  created(){
    console.log("created");
  }
}
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
#app {
  font-family: "微軟正黑體", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

