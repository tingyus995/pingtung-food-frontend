<template>
  <div>
    <b-container fluid class="food-list"></b-container>
    <FoodCardList :foods="foods" show-status="true" message-prefix v-slot="props">
      <button
        :disabled="props.item.shop.status !== 'open'"
        type="button"
        class="btn btn-sm btn-primary"
        @click="addToCart(props.item)"
      >
        <font-awesome-icon icon="cart-plus"></font-awesome-icon>加入點菜清單
      </button>
      <button
        v-if="hasLiked(props.item)"
        type="button"
        class="btn btn-sm btn-warning"
        @click="removeFromFavorite(props.item)"
      >
        <font-awesome-icon icon="heart-broken"></font-awesome-icon>移除最愛
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
      user: null,
      keywords: []
    };
  },
  components: {
    FoodCardList
  },
  methods: {
    addToCart(item) {
      this.$emit("cart_add", item);
    },
    addToFavorite(item) {
      let self = this;
      console.log("add favorite clicked");
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
            action: "like",
            _id: item._id
          },
          config
        )
        .then(function(response) {
          console.log(response);
          if (response.data) {
            console.log(response.data);
            item.likes.push(self.user._id);
          }
        })
        .catch(function(error) {
          //console.log(error.response.data);
        });
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
  computed: {},
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
          self.keywords = [];
        }
      })
      .catch(function(error) {
        console.log(error.response.data);
      });

    // socket
    this.sockets.subscribe("shop_change", data => {
      console.log(data);
      this.foods = this.foods.map(food => {
        if (food.shop._id === data._id) {
          food.shop = data;
        }
        return food;
      });
    });
    this.sockets.subscribe("new_food", data => {
      console.log(data);
      this.foods.push(data);
    });
    this.sockets.subscribe("delete_food", data => {
      console.log("food changed");
      //console.log(data);
      console.log(data);
      this.foods = this.foods.filter(food => {
        return food._id !== data._id;
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
