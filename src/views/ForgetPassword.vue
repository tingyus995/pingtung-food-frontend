<template>
    <ForgetPasswordForm allowedDomain="nptu.edu.tw" api-prefix="/student" next-page="login">
        <template v-slot:header>
            <b-alert variant="info" show>提醒您，本平台目前僅供屏東大學之學生使用，因此需要使用學校提供的E-mail: 學號@nptu.edu.tw 進行驗證才能註冊。</b-alert>
        </template>
        <template v-slot:footer>
            <b-link :to="{name:'login'}">回到登入</b-link>
        </template>
    </ForgetPasswordForm>
</template>

<script>
import lodash from "lodash";
import ForgetPasswordForm from "../components/ForgetPasswordForm";
//import axios from "axios";
export default {
  name: "shopsignup",
  components:{
    ForgetPasswordForm
  },
  data() {
    return {
    allowedDomain : "nptu.edu.tw",
      user: {
        name: "",
        email: "",
        password: ""
      },
      inputState: {
        name: null,
        email: null
      },
      agreeTerm: false,
     
      vertificationCode: "",
      showVertificationInput: false,
      gotVertificationCode: false,
      vertificationCodeStatus: null,
      errorMsg: ""      
    };
  },
  computed:{
   
  },
  methods: {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
