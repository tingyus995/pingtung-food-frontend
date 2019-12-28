<template>
  <div class="login container-fluid">
    <form class="form-signin">
      <!--<img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">-->
      <b-alert variant="info" show>提醒您，本平台目前僅供屏東大學之學生使用，因此需要使用學校提供的E-mail: 學號@nptu.edu.tw 進行驗證才能註冊。</b-alert>
      <h1 class="h3 mb-3 font-weight-normal">申請一個帳號</h1>
      <b-alert v-if="errorMsg" show variant="danger">{{ errorMsg }}</b-alert>
      <label for="inputName" class="sr-only">姓名</label>

      <b-form-input
        :disabled="showVertificationInput"
        :state="inputState.name"
        v-model="user.name"
        type="text"
        id="inputName"
        ref="inputName"
        class="form-control"
        placeholder="姓名"
        required
        autofocus
      />

      <label for="inputEmail" class="sr-only">Email</label>
      <!--<input
        v-model="user.email"
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="E-mail"
        required
      />-->
      <b-input-group>
        <b-form-input
          :disabled="showVertificationInput"
          ref="inputStudentID"
          :state="inputState.studentID"
          v-model="studentID"
          type="text"
          class="form-control"
          placeholder="學號"
          required
        />
        <b-input-group-append>
          <b-input-group-text>
            <small>@{{ this.allowedDomain }}</small>
          </b-input-group-text>
          <b-button
            :disabled="showVertificationInput"
            variant="outline-success"
            @click="getVertificationCode"
          >{{ showVertificationInput ? "驗證碼已傳送" : "取得驗證碼" }}</b-button>
        </b-input-group-append>
      </b-input-group>
      <b-input-group>
        <b-form-input
          :disabled="!showVertificationInput"
          v-if="showVertificationInput"
          v-model="vertificationCode"
          type="text"
          id="inputVertificationCode"
          class="form-control"
          placeholder="驗證碼"
          required
          @keyup="checkVertificationCode"
        />
        <b-input-group-text v-if="vertificationCodeStatus !== null">
          <font-awesome-icon
            v-if="vertificationCodeStatus === true"
            :style="{color:'#6fb98f'}"
            icon="check"
          ></font-awesome-icon>
          <font-awesome-icon
            v-if="vertificationCodeStatus === false"
            :style="{color:'#fa4252'}"
            icon="times"
          ></font-awesome-icon>
        </b-input-group-text>
      </b-input-group>
      <label for="inputPassword" class="sr-only">密碼</label>
      <input
        v-model="user.password"
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="密碼"
        required
      />
      <div class="checkbox mb-3">
        <label>
          <input v-model="agreeTerm" type="checkbox" value="remember-me" /> 我同意
          <b-link v-b-modal.term>使用者合約</b-link>
        </label>
      </div>
      <button
        :disabled="!canCreateAccount"
        class="btn btn-lg btn-primary btn-block"
        type="submit"
        @click.prevent="createStudent"
      >建立帳號</button>
    </form>

    <b-modal @ok="agreeTerm = true" @cancel="agreeTerm = false" id="term" scrollable title="學生帳號申請授權合約">
      <p class="my-4" v-for="i in 20" :key="i">
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
        in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
      </p>
      <template v-slot:modal-footer="{ ok, cancel, }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button variant="success" @click="ok()">我同意</b-button>
        <b-button variant="danger" @click="cancel()">我拒絕</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import lodash from "lodash";
//import axios from "axios";
export default {
  name: "signup",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: ""
      },
      inputState: {
        name: null,
        studentID: null
      },
      agreeTerm: false,
      studentID: "",
      vertificationCode: "",
      showVertificationInput: false,
      gotVertificationCode: false,
      vertificationCodeStatus: null,
      errorMsg: "",
      allowedDomain: "nptu.edu.tw"
    };
  },
  watch: {
    studentID() {
      this.user.email = this.studentID + "@" + this.allowedDomain;
    }
  },
  computed:{
    canCreateAccount(){
      // blank field      
      if(this.user.name === '' || this.user.password === '' || this.user.email === '') return false;
      // agreement and vertification
      return this.agreeTerm && (this.vertificationCodeStatus === true);
    }
  },
  methods: {
    getVertificationCode() {
      let self = this;
      // reset state
      this.errorMsg = "";
      this.inputState.name = null;
      this.inputState.studentID = null;

      // check input
      console.log("debug");
      if (!this.user.name) {
        this.errorMsg = "請輸入姓名";
        this.$refs.inputName.focus();
        return;
      }

      if (!this.studentID) {
        this.errorMsg = "請輸入學號";
        this.$refs.inputStudentID.focus();
        return;
      }

      this.$http
        .post("/student/code", {
          email: this.user.email
        })
        .then(function(response) {
          console.log(response);
          self.showVertificationInput = true;
          //self.$emit('signupComplete', response.data);
          //localStorage.setItem("token", response.data.token);
          //localStorage.setItem("user", response.data.user.type);

          //self.$bus.$emit("logged", "a newly-registered user logged in.");
        })
        .catch(function(error) {
          console.log(JSON.stringify(error.response.data));
        });
    },
    checkVertificationCode: _.debounce(function() {
      let self = this;
      console.log("checking...");
      //console.log(this.user.name);
      if (this.vertificationCode) {
        this.$http
          .post("/student/vertification", {
            email: this.user.email,
            code: this.vertificationCode
          })
          .then(function(response) {
            console.log(response);
            console.log("ok!");
            self.vertificationCodeStatus = true;
            //self.$emit('signupComplete', response.data);
            //localStorage.setItem("token", response.data.token);
            //localStorage.setItem("user", response.data.user.type);

            //self.$bus.$emit("logged", "a newly-registered user logged in.");
          })
          .catch(function(error) {
            self.vertificationCodeStatus = false;
            console.log("error!");
            console.log(JSON.stringify(error.response.data));
          });
      }
    }, 500),

    createStudent() {
      let self = this;
      console.log(this.user);

      this.$http
        .post("/student", {
          user :this.user,
          code : this.vertificationCode})
        .then(function(response) {
          console.log(response);
          //self.$emit('signupComplete', response.data);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", response.data.user.type);

          self.$bus.$emit("logged", "a newly-registered user logged in.");
          self.$router.push({ name: "foods" });
        })
        .catch(function(error) {
          console.log(JSON.stringify(error.response.data));
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.form-signin input {
  border-radius: 0px;
}
.form-signin input:first-of-type {
  margin-bottom: -1px;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
}

.form-signin input:last-of-type {
  margin-top: -1px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
</style>
