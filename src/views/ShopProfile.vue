<template>
  <div class="add-food container-fluid">
    <div class="form-group">
      <label for="shopName">店家名稱</label>
      <input v-model="shop.name" type="text" class="form-control" id="shopName" value="50" />
    </div>

    <div class="form-group">
      <label for="shopEmail">店家E-mail</label>
      <input v-model="shop.email" type="email" class="form-control" id="shopEmail" value="50" />
    </div>
    <button
      class="btn btn-lg btn-primary btn-block"
      type="submit"
      @click.prevent="startEditProfile"
    >
      <font-awesome-icon icon="edit"></font-awesome-icon>儲存資訊
    </button>
    <p>訂餐次數：15</p>
    <p>點餐未領取次數：0</p>

    <div>
      <b-button v-b-toggle.collapse-1 variant="primary">變更密碼</b-button>
      <b-collapse id="collapse-1" class="mt-2">
        <b-card>
          <b-alert v-if="pass.msg.length > 0" show variant="danger">{{ pass.msg }}</b-alert>

          <label for="inputPassword" class>請輸入舊密碼</label>
          <input
            v-model="pass.original"
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="密碼"
            required
          />

          <label for="inputPassword" class>請輸入新密碼</label>
          <input
            v-model="pass.newPassword"
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="密碼"
            required
          />

          <label for="inputPassword" class>再輸入一次新密碼</label>
          <input
            v-model="pass.confirmPassword"
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="密碼"
            required
          />
          <button class="btn btn-danger" type="submit" @click.prevent="changePassword">變更密碼</button>
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
      shop: {
        name: "",
        email: ""
      },
      pass: {
        msg: "",
        original: "",
        newPassword: "",
        confirmPassword: ""
      }
    };
  },
  methods: {
    showSuccessMsg(msg) {
      this.$bvModal
        .msgBoxOk(msg)
        .then(value => {
          //this.$router.push({name: 'myfoods'})
        })
        .catch(err => {
          // An error occurred
        });
    },
    changePassword() {
      let pass = this.pass;
      if (pass.original.length === 0) {
        pass.msg = "請輸入舊密碼";
        return;
      }
      if (pass.newPassword.length === 0) {
        pass.msg = "請輸入新的密碼";
        return;
      }
      if (pass.newPassword !== pass.confirmPassword) {
        pass.msg = "確認密碼不一致";
        return;
      }

      pass.msg = "";

      let self = this;
      let token = localStorage.getItem("token");
      let config = {
        headers: { Authorization: "bearer " + token }
      };

      this.$http
        .put(
          "/shop/changepasswd",
          {
            original_password: pass.original,
            password: pass.newPassword
          },
          config
        )
        .then(function(response) {
          console.log(response);
          //self.$emit('signupComplete', response.data);
          //self.$router.push({ name: "foods" });
          self.showSuccessMsg("密碼變更成功");
        })
        .catch(function(error) {
          console.log(error.response.data);
          console.log(JSON.stringify(error.response.data));
          //self.errorMsg = "帳號或密碼錯誤";
          pass.msg = '舊密碼錯誤'
        });
    },
    startEditProfile() {
      let self = this;
      let token = localStorage.getItem("token");
      let config = {
        headers: { Authorization: "bearer " + token }
      };

      this.$http
        .put("/shop", this.shop, config)
        .then(function(response) {
          console.log(response);
          //self.$emit('signupComplete', response.data);
          //self.$router.push({ name: "foods" });
          self.showSuccessMsg("儲存成功");
        })
        .catch(function(error) {
          console.log(error.response.data);
          console.log(JSON.stringify(error.response.data));
          
          //self.errorMsg = "帳號或密碼錯誤";
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
      .get("/shop", config)
      .then(function(response) {
        console.log(response);
        if (response.data) {
          self.shop = response.data;

          console.log(self.shop.name);
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
