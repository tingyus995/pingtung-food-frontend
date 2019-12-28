<template>
  <div class="login container-fluid">
    <form class="form-signin">
      <!--<img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">-->
      <slot name="header"></slot>
      
      <h1 class="h3 mb-3 font-weight-normal">重設密碼</h1>
      <b-alert v-if="errorMsg" show variant="danger">{{ errorMsg }}</b-alert>

      <b-input-group>
        <b-form-input
          :disabled="showVertificationInput"
          ref="inputStudentID"
          :state="inputState.studentID"
          v-model="studentID"
          type="text"
          class="form-control"
          :placeholder="domainRestricted ? '學號' : 'E-mail'"
          required
        />
        <b-input-group-append>
          <b-input-group-text v-if="domainRestricted">
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






      <label for="inputPassword" class="sr-only">新密碼</label>
      <input
        v-model="user.password"
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="新密碼"
        required
      />

      <button
        :disabled="!canChangePassword"
        class="btn btn-lg btn-primary btn-block mt-3"
        type="submit"
        @click.prevent="changePassword"
      >變更密碼</button>
    </form>

    <slot name="footer"></slot>


  </div>
</template>

<script>
import lodash from "lodash";
//import axios from "axios";
export default {
  name: "changepasswordform",
  props : ['allowedDomain','apiPrefix','nextPage'],
  data() {
    return {
      user: {        
        email: "",
        password: ""
      },      
      inputState:{
        studentID : null,
        password : null
      },
      studentID: "",
      vertificationCode: "",
      showVertificationInput: false,
      gotVertificationCode: false,
      vertificationCodeStatus: null,
      errorMsg: ""
      
    };
  },
  watch: {
    studentID() {      
      
      if(this.domainRestricted){
        console.log('watching');
        this.user.email = this.studentID + "@" + this.allowedDomain;
      }else{
        this.user.email = this.studentID;
      }
    }
  },
  computed:{
    canChangePassword(){
      // blank field      
      if(this.user.password === '' || this.user.email === '') return false;
      // vertification
      return this.vertificationCodeStatus;
    },
    domainRestricted(){
      return this.allowedDomain !== undefined;
    }
  },
  methods: {
    getVertificationCode() {
      let self = this;
      // reset state
      this.errorMsg = "";
      this.inputState.studentID = null;
      

      // check input
      console.log("debug");
      
      if(!this.user.email){
        this.errorMsg = "請輸入" + (this.domainRestricted ? "學號" : "E-mail");
        this.$refs.inputStudentID.focus();
        return;
      }


      this.$http
        .post( this.apiPrefix + "/code", {
          email: this.user.email,
          type : "reset"
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
          //console.log(error.response);
          let result = error.response.data;
          if(result.msg.includes("Account not found")){
            self.errorMsg = '查無此帳號！';
            self.$refs.inputStudentID.focus();
            self.inputState.studentID = false;
          }
        });
    },
    checkVertificationCode: _.debounce(function() {
      let self = this;
      console.log("checking...");
      //console.log(this.user.name);
      if (this.vertificationCode) {
        this.$http
          .post(this.apiPrefix + "/vertification", {
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
    showSuccessMsg() {
      this.$bvModal
        .msgBoxOk("重設成功！")
        .then(value => {
          this.$router.push({ name: this.nextPage });
        })
        .catch(err => {
          // An error occurred
        });
    },

    changePassword() {
      let self = this;
      console.log(this.user);

      this.$http
        .post( this.apiPrefix + "/resetpasswd", {
          email : this.user.email,
          password : this.user.password,
          code : this.vertificationCode})
        .then(function(response) {
          console.log(response);
          self.showSuccessMsg();
          //self.$emit('signupComplete', response.data);
          // localStorage.setItem("token", response.data.token);
          // localStorage.setItem("user", response.data.user.type);

          // self.$bus.$emit("logged", "a newly-registered user logged in.");
          //self.$router.push({ name: "login" });
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
