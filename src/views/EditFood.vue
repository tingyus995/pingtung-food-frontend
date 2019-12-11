<template>
  <div class="add-food container container-fluid">
    <form>
      <b-alert variant="success" show>開始新增食物，讓使用者購買吧！</b-alert>
      <div class="form-group">
        <label for="foodName">食物名稱</label>
        <input
          v-model="food.name"
          type="text"
          class="form-control"
          id="foodName"
          placeholder="e.g. 什錦炒麵"
        />
      </div>
      <div class="form-group">
        <label for="foodName">價錢</label>
        <input v-model="food.price" type="number" class="form-control" id="foodName" value="50" />
      </div>
       <b-button variant="primary" v-if="!changePicture" @click="changePicture=true"><font-awesome-icon icon="image"></font-awesome-icon>修改食物圖片</b-button>
      
      <div v-if="changePicture" class="form-group">
        <label for="foodPhoto">食物照片</label>
        <input type="file" class="form-control-file" id="foodPhoto" v-on:change="handleFileUpload($event)"/>
      </div>

      <div class="form-group">
        <vue-tags-input v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags" />
      </div>

      <button
        class="btn btn-lg btn-primary btn-block"
        type="submit"
        @click.prevent="startEditFood"
      ><font-awesome-icon icon="edit"></font-awesome-icon>修改食物</button>
    </form>
  </div>
</template>

<script>

import { VueTagsInput, createTag, createTags } from '@johmun/vue-tags-input';
export default {
  name: "foods",
  components: {
    VueTagsInput
  },
  props : ['item'],
  data() {
    return {
      changePicture : false,
      food: {
        name: "",
        price: "",
        tags: [],
        picture : ""
      },
      
      tag: "",
      tags : []
    };
  },
  created(){
    this.food = this.item;
    this.tags = createTags(this.food.tags, []);
  },
  methods: {
    handleFileUpload(e){
      
      //console.log(type(this.tags));


      let file = e.target.files[0]
      console.log(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);

      let width = 800
      let height = 800
      reader.onload = event => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const elem = document.createElement("canvas")
          elem.width = width
          elem.height = height
          const ctx = elem.getContext('2d')
          ctx.drawImage(img, 0,0, width, height);
          let base64 = elem.toDataURL('image/jpeg', 0.5);
          console.log(base64);
          this.food.picture = base64;
        }
      }
      //console.log(base64);

    },
    showSuccessMsg() {
        
        this.$bvModal.msgBoxOk('修改成功')
          .then(value => {
            this.$router.push({name: 'myfoods'})
          })
          .catch(err => {
            // An error occurred
          })
      },
    startEditFood() {
      let self = this;
      let token = localStorage.getItem("token");
      let config = {
        headers: { Authorization: "bearer " + token }
      };

  
      let new_tags = []

      this.tags.forEach(t => {
        new_tags.push(t.text);
      })

      this.food.tags = new_tags;

      console.log(this.food);

      this.$http
        .put("/food", this.food, config)
        .then(function(response) {
          console.log(response);
          //self.$emit('signupComplete', response.data);       
          //self.$router.push({ name: "foods" });
          self.showSuccessMsg();
        })
        .catch(function(error) {
          console.log(error.response.data);
          console.log(JSON.stringify(error.response.data));
          //self.errorMsg = "帳號或密碼錯誤";
        });
    }
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

.vue-tags-input {
  max-width: none !important;
  width: 100%;
}
.ti-input {
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
}

.ti-input:hover {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  -webkit-box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>
