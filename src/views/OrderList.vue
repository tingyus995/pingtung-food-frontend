<template>
  <div class="add-food container-fluid">
    <div class="card" v-for="(order, index) in orders" :key="index">
      <div class="card-header">
        <font-awesome-icon icon="user"></font-awesome-icon>
        {{ order.student.name }}
      </div>

      <div class="card-body">
        <ul class="list-group list-group-flush">
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
      <div class="btn-group">
        <button :disabled="finishBtnDisable(order)" class="btn btn-primary" @click.prevent="finish(order)">
          <font-awesome-icon icon="check"></font-awesome-icon>
          {{ order.finished ? "已完成" : "完成訂單"}}
        </button>
        <button :disabled="notifyBtnDisable(order)" class="btn btn-info" @click.prevent="notify(order)">
          <font-awesome-icon icon="bell"></font-awesome-icon>
          {{ order.notified ? "已通知" : "通知領取"}}
        </button>
        <b-button :disabled="order.rejected" variant="danger" @click="confirmReject(order)">
          <font-awesome-icon icon="user-slash"></font-awesome-icon>
          {{ order.rejected ? "訂單已拒絕" : "拒絕訂單" }}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderlist",
  components: {},
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

  created(){
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
  },
  methods: {
    totalPrice(order) {
      console.log(order);
      let price = 0;

      order.items.forEach(item => {
        price += item.price * item.amount;
      });

      return price;
    },
    notify(order) {
      console.log("debug");
      console.log(order);
      order.notified = true;
      console.log(this.orders);
    },
    finish(order) {
      order.finished = true;
    },

    finishBtnDisable(order){
      if(order.status === 'rejected') return true;
      if(!order.status === 'notified') return true;
      if(order.status === 'finished') return true;
      return false;
    },

    notifyBtnDisable(order){
      if(order.status === 'rejected') return true;
      if(order.status === 'finished') return true;
      if(order.status === 'notified') return true;
      return false;
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
          order.rejected = value;
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
