<template>
  <div>
    <template v-if="foods.length === 0">
      <b-alert show variant="info">
        您的店家目前沒有食物喔
        <br />趕緊新增食物讓學生點吧！
      </b-alert>
      <b-button :to="{name : 'addfood'}" variant="primary">新增食物</b-button>
    </template>
    <FoodCardList v-else :foods="foods" message-prefix="在我的食物中" v-slot="props">
      <button type="button" class="btn btn-sm btn-warning" @click="editFood(props.item)">
        <font-awesome-icon icon="edit"></font-awesome-icon>編輯
      </button>
      <button type="button" class="btn btn-sm btn-danger" @click="deleteFood(props.item)">
        <font-awesome-icon icon="trash-alt"></font-awesome-icon>刪除
      </button>
    </FoodCardList>
  </div>
</template>

<script>
import FoodCardList from "../components/FoodCardList";
export default {
  name: "myfoods",
  data() {
    return {
      foods: []
    };
  },
  components: {
    FoodCardList
  },
  methods: {
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
              data: item
            };

            this.$http
              .delete("/food", config)
              .then(function(response) {
                console.log(response);
                if (response.data) {
                  // delete food from dom
                  self.foods = self.foods.filter(food => {
                    return food._id != item._id;
                  });
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
<style lang="scss" scoped>
</style>
