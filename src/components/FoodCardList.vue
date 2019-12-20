<template>
  <b-container fluid class="food-list">
    <vue-bootstrap-typeahead
      class="mb-2"
      v-model="query"
      ref="typehead"
      :minMatchingChars="1"
      :data="keywordList"
      :placeholder="messagePrefix + '搜尋標籤、店家、食物名稱...'"
    />
    <b-row>
      <b-col sm="12" md="6" lg="4" v-for="(item,index) in searchResult" :key="index">
        <div class="food-card card shadow-sm mb-3">
          <div class="img-wrapper">
            <img :src="item.picture" class="card-img-top" alt="image of the food." />
          </div>
          <div class="card-body">
            <h5 class="card-title"><span class="searchable" @click="setQuery(item.name)">{{ item.name }}</span></h5>
            <h6>
              <span class="searchable" @click="setQuery(item.shop)">
                <font-awesome-icon icon="store-alt"></font-awesome-icon>
                {{ item.shop }}
              </span>
            </h6>
            <p class="tags card-text text-left">
              <span
                class="badge badge-success searchable"
                v-for="(tag,index) in item.tags"
                :key="index"
                @click="setQuery(tag)"
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
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
export default {
  name: "foodcardlist",
  props: ["foods", "messagePrefix"],
  components: {
    VueBootstrapTypeahead
  },
  data() {
    return {
      query: ""
    };
  },

  methods: {
    setQuery(s){
      this.query = s;
      this.$refs.typehead.inputValue = s;
      //console.log(this.$refs.typehead);
      //this.$refs.typehead.$refs.input.focus();
    }
  },
  computed: {
    searchResult() {
      console.log("debug 62");
      console.log(this.foods);

      let kw = this.query;
      return this.foods.filter(food => {
        if(food.shop.indexOf(kw) !== -1) return true;
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
.food-card {
  .price {
    font-weight: bold;
  }
  .tags span {
    margin: 0 5px;
    font-size: 0.8rem;
  }
  h6 {
    color: rgb(109, 109, 109);
  }
  .img-wrapper{
      overflow:hidden;
      img{
          filter:brightness(95%);
          transition: filter .8s ease,transform .8s ease;
          &:hover{
            transform: scale(1.2);
            filter:brightness(105%);
          }
      }
  }
  .searchable{
    cursor: pointer;
    transition: background-color .5s ease, color .5s ease;
    &:hover{
      background:#fff3af;
      color:#2d132c;
    }
  }

}
</style>