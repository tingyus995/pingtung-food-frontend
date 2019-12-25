<template>
  <div class="add-food container-fluid">
    <h1>{{ user.name}}</h1>
    <h2>{{ user.email }}</h2>

    <b-button class="mt-3 mb-3" v-b-modal="'change-password-modal'" variant="primary">變更密碼</b-button>
    <b-card no-body header="統計資料">
      <b-list-group>
        <b-list-group-item class="d-flex justify-content-between align-items-center">
          <span>
            <font-awesome-icon class="mr-2" icon="calendar-alt"></font-awesome-icon>本月訂餐次數
          </span>
          <b-badge variant="primary" pill>{{ ordersThisMonth }}</b-badge>
        </b-list-group-item>

        <b-list-group-item class="d-flex justify-content-between align-items-center">
          <span>
            <font-awesome-icon class="mr-2" icon="info-circle"></font-awesome-icon>總訂餐次數
          </span>
          <b-badge variant="primary" pill>{{ orders.length }}</b-badge>
        </b-list-group-item>

        <b-list-group-item class="d-flex justify-content-between align-items-center">
          <span>
            <font-awesome-icon class="mr-2" icon="store-alt"></font-awesome-icon>曾消費的店家總數
          </span>
          <b-badge variant="primary" pill>{{ shopCount }}</b-badge>
        </b-list-group-item>
      </b-list-group>
    </b-card>

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
  name: "foods",
  components: {},
  computed: {
    ordersThisMonth() {
      let result = 0;
      let month = this.$moment().month();
      this.orders.forEach(ord => {
        if (month === this.$moment(ord.createdAt).month()) result++;
      });
      return result;
    },
    shopCount() {
      let s = new Set();
      0;
      this.orders.forEach(ord => {
        s.add(ord.shopId);
      });
      console.log(s);
      return s.size;
    }
  },
  methods: {
    showSuccessMsg(msg) {
      this.$bvModal
        .msgBoxOk(msg)
        .then(value => {
          this.$refs["change-password-modal"].hide();
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
          "/student/changepasswd",
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
          self.showSuccessMsg("密碼變更成功");
        })
        .catch(function(error) {
          console.log(error.response.data);
          console.log(JSON.stringify(error.response.data));
          //self.errorMsg = "帳號或密碼錯誤";
          pass.msg = "舊密碼錯誤";
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
      .get("/student", config)
      .then(function(response) {
        console.log(response);
        if (response.data) {
          self.user = response.data;
          //console.log(self.shop.name);
        }
      })
      .catch(function(error) {
        //console.log(error.response.data);
      });

    this.$http
      .get("/order", config)
      .then(function(response) {
        console.log(response);
        if (response.data) {
          self.orders = response.data;
          //console.log(self.shop.name);
        }
      })
      .catch(function(error) {
        //console.log(error.response.data);
      });
  },
  data() {
    return {
      user: {
        name: "",
        email: ""
      },
      pass: {
        msg: "",
        original: "",
        newPassword: "",
        confirmPassword: ""
      },
      orders: []
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
