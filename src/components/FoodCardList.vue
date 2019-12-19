<template>
  <b-container fluid class="food-list">
    <vue-bootstrap-typeahead
      class="mb-2"
      v-model="query"
      :minMatchingChars="1"
      :data="keywordList"
      :placeholder="messagePrefix + '搜尋標籤、店家、食物名稱...'"
    />
    <b-row>
      <b-col sm="12" md="6" lg="4" v-for="(item,index) in searchResult" :key="index">
        <b-card class="shadow-sm" :img-src="item.picture">
          <div class="food-card card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <h6>
              <font-awesome-icon icon="store-alt"></font-awesome-icon>
              {{ item.shop }}
            </h6>
            <p class="tags card-text text-left">
              <span
                class="badge badge-success"
                v-for="(tag,index) in item.tags"
                :key="index"
              >{{ tag }}</span>
            </p>
            <p class="card-text text-left">{{ item.description }}</p>

            <b-card-text class="price">
              <h4>${{ item.price }}</h4>
            </b-card-text>
            <div class="text-center">
              <div class="btn-group">
                <slot :item="item"></slot>
              </div>
              <!--<small class="text-muted">
            <font-awesome-icon icon="walking"></font-awesome-icon>步行7分鐘
              </small>-->
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
export default {
  name: "foodcardlist",
  props: ["foods","messagePrefix"],
  components: {
    VueBootstrapTypeahead
  },
  data() {
    return {
      query: ""
    };
  },

  methods: {},
  computed: {
    searchResult() {
      console.log("debug 62");
      console.log(this.foods);

      let kw = this.query;
      return this.foods.filter(food => {
        if (food.name.indexOf(kw) !== -1) return true;
        //console.log(food.tags);
        if (food.tags.join(" ").indexOf(kw) !== -1) return true;
        return false;
      });
    },
    keywordList() {
      let self = this;
      let kw = [];

      function addToKeyword(k) {
        if (kw.indexOf(k) === -1) {
          kw.push(k);
        }
      }

      self.foods.forEach(food => {
        addToKeyword(food.name);
        addToKeyword(food.shop);
        food.tags.forEach(tag => {
          addToKeyword(tag);
        });
      });

      console.log("keywords");
      return kw;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.food-list {
  max-width: 1200px;
}
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
