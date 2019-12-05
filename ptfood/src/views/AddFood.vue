<template>
  <div class="add-food container-fluid">
    <form>
      <div class="form-group">
        <label for="foodName">食物名稱</label>
        <input type="text" class="form-control" id="foodName" placeholder="e.g. 什錦炒麵" />
      </div>
      <div class="form-group">
        <label for="foodName">價錢</label>
        <input type="number" class="form-control" id="foodName" value="50" />
      </div>

      <div class="form-group">
        <label for="foodPhoto">食物照片</label>
        <input type="file" class="form-control-file" id="foodPhoto" />
      </div>


      <div class="form-group">
           <vue-tags-input
      v-model="tag"
      :tags="tags"
      @tags-changed="newTags => tags = newTags"
      
    />

      </div>


    </form>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
export default {
  name: "foods",
  components : {
    VueTagsInput
  },
  data() {
    return {
      tag : '',
      tags : []
    };
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


.vue-tags-input{
  max-width:none !important;
  width:100%;
}
.ti-input{
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
}

.ti-input:hover{
  color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    -webkit-box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}


</style>
