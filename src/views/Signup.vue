<template>
  <!--<img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">-->
  <SignupForm
    :allowedDomain="allowedDomain"
    api-prefix="/student"
    next-page="foods"
    name-field="姓名"
    role-name="學生"
  >
    <template v-slot:header>
      <b-alert variant="info" show>提醒您，本平台目前僅供屏東大學之學生使用，因此需要使用學校提供的E-mail: 學號@nptu.edu.tw 進行驗證才能註冊。</b-alert>
    </template>
    <template v-slot:agreement>
      <p class="my-4" v-for="i in 20" :key="i">
        Student Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
        in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
      </p>
    </template>

    <template v-slot:footer>
      <b-link :to="{name:'login'}">回到登入</b-link>
    </template>
  </SignupForm>
</template>

<script>
import SignupForm from "../components/SignupForm";
//import axios from "axios";
export default {
  name: "signup",
  components: {
    SignupForm
  },
  data() {
    return {
      allowedDomain: "nptu.edu.tw"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
