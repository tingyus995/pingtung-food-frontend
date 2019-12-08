<template>
  <div class="add-food container-fluid">
    
    <h1>{{ user.name}} </h1>
    <p>訂餐次數：15</p>
    <p>點餐未領取次數：0</p>

    <b-button variant="primary">檢視我買過的餐點</b-button>
    <div>
      <b-button v-b-toggle.collapse-1 variant="primary">變更密碼</b-button>
      <b-collapse id="collapse-1" class="mt-2">
        <b-card>
          <label for="inputPassword" class>請輸入舊密碼</label>
          <input type="password" id="inputPassword" class="form-control" placeholder="密碼" required />

          <label for="inputPassword" class>請輸入新密碼</label>
          <input type="password" id="inputPassword" class="form-control" placeholder="密碼" required />

          <label for="inputPassword" class>再輸入一次新密碼</label>
          <input type="password" id="inputPassword" class="form-control" placeholder="密碼" required />
          <button class="btn btn-danger" type="submit">變更密碼</button>
        </b-card>
      </b-collapse>
    </div>
  </div>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
export default {
  name: "foods",
  components: {
    VueTagsInput
  },
  data() {
    return {
      user: {
        name: "TingYu Yan",
        email: "cbe107059@nptu.edu.tw"
      }
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
