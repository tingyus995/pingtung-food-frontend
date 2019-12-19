<template>
  <div>
    <b-container fluid class="food-list">      
    </b-container>
    <FoodCardList :foods="foods" message-prefix='' v-slot="props">
      
        <button type="button" class="btn btn-sm btn-primary" @click="addToCart(props.item)">
          <font-awesome-icon icon="cart-plus"></font-awesome-icon>加入購買清單
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
      keywords : [] 
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
    },

  },
  computed: {
    
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
          self.keywords = [];

        }
      })
      .catch(function(error) {
        console.log(error.response.data);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
