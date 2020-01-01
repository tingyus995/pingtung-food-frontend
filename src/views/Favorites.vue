<template>
<div>
    <template v-if="likedFoods.length === 0">
      <b-alert show variant="info">
        我的最愛清單內沒有食物喔
        <br />趕緊到探索美食展開探險吧
      </b-alert>
      <b-button :to="{name : 'foods'}" variant="primary">探索美食</b-button>
    </template>
  <FoodCardList v-else :foods="likedFoods" show-status="true" message-prefix="在我的最愛中" v-slot="props">
    <button :disabled="props.item.shop.status !== 'open'" type="button" class="btn btn-sm btn-primary" @click="addToCart(props.item)">
      <font-awesome-icon icon="cart-plus"></font-awesome-icon>加入購買清單
    </button>
    <button
      v-if="hasLiked(props.item)"
      type="button"
      class="btn btn-sm btn-warning"
      @click="removeFromFavorite(props.item)"
    >
      <font-awesome-icon class="mr-1" icon="heart-broken"></font-awesome-icon>移除最愛
      <b-badge variant="danger">{{props.item.likes.length }}</b-badge>
    </button>

    <button
      v-if="!hasLiked(props.item)"
      type="button"
      class="btn btn-sm btn-warning"
      @click="addToFavorite(props.item)"
    >
      <font-awesome-icon icon="heart"></font-awesome-icon>加到最愛
    </button>
  </FoodCardList>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import FoodCardList from "../components/FoodCardList";

export default {
  name: "foods",
  data() {
    return {
      foods: [],
      user: null
    };
  },
  components: {
    FoodCardList
  },
  methods: {
    addToCart(item) {
      this.$emit("cart_add", item);
    },

    removeFromFavorite(item) {
      let self = this;
      console.log("remove favorite clicked");
      console.log(item._id);

      //let self = this;
      let token = localStorage.getItem("token");
      let config = {
        headers: { Authorization: "bearer " + token }
      };

      this.$http
        .put(
          "/food/favorite",
          {
            action: "unlike",
            _id: item._id
          },
          config
        )
        .then(function(response) {
          console.log(response);
          if (response.data) {
            console.log(response.data);
            console.log("removing....");
            item.likes.splice(item.likes.indexOf(self.user._id), 1);
            console.log(self.foods);
          }
        })
        .catch(function(error) {
          //console.log(error.response.data);
        });
    },
    hasLiked(item) {
      return item.likes.indexOf(this.user._id) !== -1;
    }
  },
  computed: {
    likedFoods() {
      let self = this;
      return this.foods.filter(food => {
        return food.likes.indexOf(self.user._id) !== -1;
      });
    }
  },
  created() {
    let self = this;
    let token = localStorage.getItem("token");

    this.user = VueJwtDecode.decode(token);

    let config = {
      headers: { Authorization: "bearer " + token }
    };

    this.$http
      .get("/food", this.food, config)
      .then(function(response) {
        console.log(response);
        if (response.data) {
          self.foods = response.data;
        }
      })
      .catch(function(error) {
        console.log(error.response.data);
      });

    this.sockets.subscribe("shop_change", data => {
      console.log(data);
      this.foods = this.foods.map(food => {
        if (food.shop._id === data._id) {
          food.shop = data;
        }
        return food;
      });
    });

    this.sockets.subscribe("food_change", data => {
      console.log("food changed");
      //console.log(data);
      this.foods = this.foods.map(food => {
        if (food._id === data._id) {
          console.log("debug 166");
          console.log(data);
          return data;
        }
        return food;
      });

      console.log(this.foods);
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
