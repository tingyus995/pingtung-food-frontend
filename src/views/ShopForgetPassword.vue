<template>
    <ForgetPasswordForm api-prefix="/shop" next-page="shoplogin">
        <template v-slot:header>
            <b-alert variant="info" show>提醒您，這是店家帳號重設密碼頁面。</b-alert>
        </template>
        <template v-slot:footer>
            <b-link :to="{name:'shoplogin'}">回到登入</b-link>
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
