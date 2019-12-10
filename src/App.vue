<template>
  <div id="app">
      <Navbar />
    <router-view />
  </div>
</template>
<script>

import Navbar from "./views/Navbar"

export default {
  data(){
    return {

    }
  },
  components:{
    Navbar
  },
  created(){
    console.log("created");
  }
}
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
#app {
  font-family: "微軟正黑體", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
