<template>
  <div class="add-food container-fluid">
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
        <label for="foodPrice">價錢</label>
        <input v-model="food.price" type="number" class="form-control" id="foodPrice" />
      </div>
      <div class="form-group">
        <label for="foodDesc">食物的敘述</label>
        <input
          v-model="food.description"
          type="textarea"
          class="form-control"
          id="foodDesc"
          value="50"
          placeholder="用一句話描述您的食物（選填）"
        />
      </div>
      <div class="form-group">
        <label for="foodPhoto">食物照片</label>
        <b-form-file
          browse-text="瀏覽"
          placeholder="選擇或拖曳檔案到這裡..."
          drop-placeholder="拖曳檔案到這裡..."
          id="foodPhoto"
          v-on:change="handleFileUpload($event)"
        ></b-form-file>
      </div>
      <div class="form-group">

        <Cropper
        
        classname="cropper"
        :src="fullPicture"
        :stencil-props="{
          aspectRatio: aspectRatio
        }"
        @change="cropperChange"
        ></Cropper>
        
      </div>
      <div class="form-group">
        <vue-tags-input placeholder="新增標籤" v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags" />
      </div>

      <button
        class="btn btn-lg btn-primary btn-block"
        type="submit"
        @click.prevent="startAddFood"
      >新增食物</button>
    </form>
  </div>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
import { Cropper } from 'vue-advanced-cropper';
export default {
  name: "foods",
  components: {
    VueTagsInput,
    Cropper
  },
  data() {
    return {
      hasFile : false,
      food: {
        name: "",
        price: "50",
        tags: [],
        picture: "",
        description: ""
      },
      fullPicture : '',
      aspectRatio: 16/9,
      width: "400",
      tags: [],
      tag: ""
    };
  },
  methods: {
    handleFileUpload(e) {      

      let file = e.target.files[0];
      console.log(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = event => {        
        this.fullPicture = event.target.result;        
      };    
    },
    updateCroppedImage(x, y, w, h){
        let width = this.width;
        let height = parseInt(width * (1/ this.aspectRatio));
        console.log("height:" + height);
        
        let img = new Image();
        img.src = this.fullPicture;
        
        img.onload = () => {
          const elem = document.createElement("canvas");
          elem.width = width;
          elem.height = height;
          const ctx = elem.getContext("2d");
          ctx.drawImage(img, x, y, w, h, 0, 0, width, height);
          let base64 = elem.toDataURL("image/jpeg", 0.5);
          console.log(base64);
          this.food.picture = base64;
          this.hasFile = true;
        };
    },


    cropperChange({coordinates, canvas}) {
      console.log(coordinates, canvas);
      // convert ROI to base64 and store into this.food.picture
      this.updateCroppedImage(
        parseInt(coordinates.left),
        parseInt(coordinates.top),
        parseInt(coordinates.width),
        parseInt(coordinates.height)
        );
		},
    showSuccessMsg() {
      this.$bvModal
        .msgBoxOk("新增成功")
        .then(value => {
          this.food.name = "";
          this.food.price = "";
          this.food.tags = [];
          this.food.picture = "";
          this.food.description = "";
          this.$router.push({ name: "myfoods" });
        })
        .catch(err => {
          // An error occurred
        });
    },
    startAddFood() {
      let self = this;
      let token = localStorage.getItem("token");
      let config = {
        headers: { Authorization: "bearer " + token }
      };

      let new_tags = [];

      this.tags.forEach(t => {
        new_tags.push(t.text);
      });

      this.food.tags = new_tags;

      console.log(this.food);

      this.$http
        .post("/food", this.food, config)
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
