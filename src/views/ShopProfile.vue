<template>
  <div class="add-food container-fluid">
    <h1>{{ shop.name }}</h1>
    <h2>{{ shop.email }}</h2>
    <b-button-group class="mt-2 mb-2">
      <b-button v-b-modal="'change-shop-info-modal'" variant="info">變更店家資訊</b-button>
      <b-button v-b-modal="'change-password-modal'" variant="danger">變更密碼</b-button>
    </b-button-group>
    <b-card no-body header="統計資料">
      <b-list-group>
        <b-list-group-item class="d-flex justify-content-between align-items-center">
          <span>
            <font-awesome-icon class="mr-2" icon="utensils"></font-awesome-icon>總食物數量
          </span>
          <b-badge variant="primary" pill>{{ totalFoodCount }}</b-badge>
        </b-list-group-item>

        <b-list-group-item class="d-flex justify-content-between align-items-center">
          <span>
            <font-awesome-icon class="mr-2" icon="money-check-alt"></font-awesome-icon>總訂單數量
          </span>
          <b-badge variant="primary" pill>{{ totalOrderCount }}</b-badge>
        </b-list-group-item>

        <b-list-group-item class="d-flex justify-content-between align-items-center">
          <span>
            <font-awesome-icon class="mr-2" icon="calendar-alt"></font-awesome-icon>本月訂單數量
          </span>
          <b-badge variant="primary" pill>{{ totalOrderThisMonth }}</b-badge>
        </b-list-group-item>

        <b-list-group-item class="d-flex justify-content-between align-items-center">
          <span>
            <font-awesome-icon class="mr-2" icon="dollar-sign"></font-awesome-icon>總營業額
          </span>
          <b-badge variant="primary" pill>$ {{ totalIncome }}</b-badge>
        </b-list-group-item>
        <b-list-group-item class="d-flex justify-content-between align-items-center">
          <span>
            <font-awesome-icon class="mr-2" icon="dollar-sign"></font-awesome-icon>本月營業額
          </span>
          <b-badge variant="primary" pill>$ {{ totalIncomeThisMonth }}</b-badge>
        </b-list-group-item>
      </b-list-group>
    </b-card>

    <b-modal ref="change-shop-info-modal" id="change-shop-info-modal" title="變更店家資訊" centered>
      <div class="form-group">
        <label for="shopName">店家名稱</label>
        <input v-model="shop.name" type="text" class="form-control" id="shopName" value="50" />
      </div>

      <div class="form-group">
        <label for="shopEmail">店家E-mail</label>
        <input v-model="shop.email" type="email" class="form-control" id="shopEmail" value="50" />
      </div>

      <template v-slot:modal-footer>
        <button class="btn btn-primary mx-auto" type="submit" @click.prevent="startEditProfile">
          <font-awesome-icon icon="edit"></font-awesome-icon>儲存資訊
        </button>
      </template>
    </b-modal>

    <div>
      <b-modal ref="change-password-modal" id="change-password-modal" title="變更密碼" centered>
        <b-alert v-if="pass.msg.length > 0" show variant="danger">{{ pass.msg }}</b-alert>

        <label for="inputPassword" class>請輸入舊密碼</label>
        <input
          v-model="pass.original"
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="舊密碼"
          required
        />

        <label for="inputPassword" class>請輸入新密碼</label>
        <input
          v-model="pass.newPassword"
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="新密碼"
          required
        />

        <label for="inputPassword" class>再輸入一次新密碼</label>
        <input
          v-model="pass.confirmPassword"
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="新密碼"
          required
        />
        <template v-slot:modal-footer>
          <button class="mx-auto btn btn-danger" type="submit" @click.prevent="changePassword">變更密碼</button>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
export default {
  name: "shopprofile",
  props: ["shopOrders"],
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
      },
      foods: []
    };
  },

  methods: {
    showSuccessMsg(msg, cb) {
      this.$bvModal
        .msgBoxOk(msg)
        .then(value => {
          cb();
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
      if (pass.newPassword === pass.original) {
        pass.msg = "新密碼不可與舊密碼相同";
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
          pass.original = "";
          pass.confirmPassword = "";
          pass.newPassword = "";
          self.showSuccessMsg("密碼變更成功", () => {
            self.$refs["change-password-modal"].hide();
          });
        })
        .catch(function(error) {
          console.log(error.response.data);
          console.log(JSON.stringify(error.response.data));
          //self.errorMsg = "帳號或密碼錯誤";
          pass.msg = "舊密碼錯誤";
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
          self.showSuccessMsg("儲存成功", () => {
            self.$refs["change-shop-info-modal"].hide();
          });
        })
        .catch(function(error) {
          console.log(error.response.data);
          console.log(JSON.stringify(error.response.data));

          //self.errorMsg = "帳號或密碼錯誤";
        });
    }
  },

  computed: {
    totalOrderCount() {
      return this.shopOrders.length;
    },
    totalOrderThisMonth() {
      //return this.shopOrders.length;
      let nowMoment = this.$moment();
      let result = 0;
      this.shopOrders.forEach(ord => {
        console.log(ord.createdAt);
        let ordMoment = this.$moment(ord.createdAt);
        if (
          nowMoment.year() === ordMoment.year() &&
          nowMoment.month() === ordMoment.month()
        ) {
          result++;
        }
      });

      return result;
    },
    totalFoodCount() {
      console.log("FOOD");
      console.log(this.foods);
      return this.foods.length;
    },
    totalIncome() {
      let result = 0;
      this.shopOrders.forEach(ord => {
        ord.items.forEach(item => {
          result += item.price * item.amount;
        });
      });
      return result;
    },
    totalIncomeThisMonth() {
      let nowMoment = this.$moment();
      let result = 0;
      this.shopOrders.forEach(ord => {
        let ordMoment = this.$moment(ord.createdAt);
        if (
          nowMoment.year() === ordMoment.year() &&
          nowMoment.month() === ordMoment.month()
        ) {
          ord.items.forEach(item => {
            result += item.price * item.amount;
          });
        }
      });
      return result;
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

    this.$http
      .get("/food/shop", config)
      .then(function(response) {
        console.log(response);
        if (response.data) {
          self.foods = response.data;

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
