<template>
  <div class="food-list container-fluid">
    <h1>foods</h1>

    <div class="card mb-4 shadow-sm" v-for="(item,index) in foods" :key="index">
      <div class="food-img">
        <img class="bd-placeholder-img card-img-top" alt="Vue logo" :src="item.picture" />
      </div>
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
            <button type="button" class="btn btn-sm btn-warning" @click="editFood(item)">
              <font-awesome-icon icon="edit"></font-awesome-icon>編輯
            </button>
            <button type="button" class="btn btn-sm btn-danger" @click="deleteFood(item)">
              <font-awesome-icon icon="trash-alt"></font-awesome-icon>刪除
            </button>
          </div>
          <small class="text-muted">
            <font-awesome-icon icon="walking"></font-awesome-icon>步行7分鐘
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "foods",
  data() {
    return {
      foods: []
    };
  },
  methods: {
    addToCart(item) {
      this.$emit("cart_add", item);
    },
    editFood(item) {
      console.log("edit food");
      console.log(item);
      this.$router.push({ name: "editfood", params: { item } });
    },
    deleteFood(item) {
      var self = this;
      this.$bvModal
        .msgBoxConfirm("刪除食物後將無法復原", {
          title: "您確定嗎？",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "刪除",
          cancelTitle: "取消",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            let self = this;
            let token = localStorage.getItem("token");
            let config = {
              headers: { Authorization: "bearer " + token },
              data : item
            };

            this.$http
              .delete("/food", config)
              .then(function(response) {
                console.log(response);
                if (response.data) {
                  // delete food from dom
                  self.foods = self.foods.filter(food => {
                    return food._id != item._id;
                  })
                }
              })
              .catch(function(error) {
                console.log(error.response.data);
              });
          }
        })
        .catch(err => {
          // An error occurred
        });
    }
  },
  created() {
    let self = this;
    let token = localStorage.getItem("token");
    let config = {
      headers: { Authorization: "bearer " + token }
    };

    this.$http
      .get("/food/shop", config)
      .then(function(response) {
        console.log(response);
        if (response.data) {
          self.foods = response.data;
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
.food-list .card {
  max-width: 480px;
}
</style>
