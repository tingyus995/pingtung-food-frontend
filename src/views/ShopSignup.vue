<template>
  <!--<img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">-->
  <SignupForm api-prefix="/shop" next-page="addfood" name-field="店家名稱" role-name="店家">
    <template v-slot:header>
      <b-alert variant="success" show>
        提醒您，這裡是店家帳號申請頁面，如果您是學生，請按
        <router-link :to="{name:'signup'}">這裡</router-link>前往學生帳號申請頁面。
      </b-alert>
    </template>
    <template v-slot:agreement>
      <p class="my-4" v-for="i in 20" :key="i">
        Shop Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
        in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
      </p>
    </template>
    <template v-slot:footer>
      <b-link :to="{name:'shoplogin'}">回到登入</b-link>
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
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
