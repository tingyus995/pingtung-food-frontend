<template>
  <div class="food-list container-fluid">
    <h1>foods</h1>
    <vue-bootstrap-typeahead
      class="mb-2"
      v-model="query"
      :minMatchingChars="1"
      :data="keywords"
      placeholder="搜尋標籤、店家、食物名稱..."
    />
    <b-card class="shadow-sm" v-for="(item,index) in searchResult" :key="index" :img-src="item.picture">      
      <div class="food-card card-body">
        <h5 class="card-title">{{ item.name }}</h5>
        <h6>
          <font-awesome-icon icon="store-alt"></font-awesome-icon>
          {{ item.shop }}
        </h6>
        <p class="tags card-text text-left">
          <span class="badge badge-success" v-for="(tag,index) in item.tags" :key="index">{{ tag }}</span>
        </p>
        <p class="card-text text-left">{{ item.description }}</p>

        <div class="d-flex justify-content-between align-items-center">
          <span class="price">$ {{ item.price }}</span>
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-primary" @click="addToCart(item)">
              <font-awesome-icon icon="cart-plus"></font-awesome-icon>加入購買清單
            </button>
            <button
              v-if="hasLiked(item)"
              type="button"
              class="btn btn-sm btn-warning"
              @click="removeFromFavorite(item)"
            >
              <font-awesome-icon icon="heart-broken"></font-awesome-icon>移除最愛
            </button>

            <button
              v-if="!hasLiked(item)"
              type="button"
              class="btn btn-sm btn-warning"
              @click="addToFavorite(item)"
            >
              <font-awesome-icon icon="heart"></font-awesome-icon>加到最愛
            </button>
          </div>
          <small class="text-muted">
            <font-awesome-icon icon="walking"></font-awesome-icon>步行7分鐘
          </small>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";

export default {
  name: "foods",
  data() {
    return {
      foods: [],
      user: null,
      query: "",
      keywords: []
    };
  },
  components: {
    VueBootstrapTypeahead
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
    addToKeyword(kw) {
      if (this.keywords.indexOf(kw) === -1) {
        this.keywords.push(kw);
      }
    }
  },
  computed: {
    searchResult() {
      let kw = this.query;
      return this.foods.filter(food => {
        if (food.name.indexOf(kw) !== -1) return true;
        //console.log(food.tags);
        if (food.tags.join(" ").indexOf(kw) !== -1) return true;
        return false;
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
          self.keywords = [];
          self.foods.forEach(food => {
            self.addToKeyword(food.name);
            self.addToKeyword(food.shop);
            food.tags.forEach(tag => {
              self.addToKeyword(tag);
            });
          });

          console.log("keywords");
          console.log(self.keywords);
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
.food-img {
  max-height: 200px;
  overflow: hidden;
}
.food-list .price {
  font-weight: bold;
}
.tags span {
  margin: 0 5px;
  font-size: 0.8rem;
}
.food-card h6 {
  color: rgb(109, 109, 109);
}
</style>
