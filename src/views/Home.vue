<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>歡迎來到探索屏東美食</h1>
    <h2 class="slogon">想像<transition name="slide-up" ><span :key="slogons[index]">{{ slogons[index] }}</span></transition></h2>
        <b-button v-if="!loggedIn" class="mt-4" variant="warning" :to="{name : 'signup' }">立即註冊</b-button>
        <div class="row mt-4">
      <div class="col-lg-4">        
        <img class="" width="140" height="140" src="../assets/046-online store.png" alt="">
        <h2>食物探索</h2>
        <p>好吃的食物聚集在一個地點，店家幫每樣提供的菜色標上標籤，我們建議這些標籤我們建議這些標籤使用一般化的名稱，例如「義大利麵」、「炒米粉」，讓學生容易快速搜尋到自己想要吃的東西，達到雙贏的局面！</p>
        
      </div>
      <div class="col-lg-4">        
        <img class="" width="140" height="140" src="../assets/066-thumbs up.png" alt="">
        <h2>及時通知</h2>
        <p>免大排長龍，在平台上下單，做好隨時通知你前往取餐，節省等候的時間，這些時間可以拿來閱讀課外書籍、做報告、或是陪朋友聊天。</p>
       
      </div>
      <div class="col-lg-4">        
        <img class="" width="140" height="140" src="../assets/009-online store.png" alt="">
        <h2>我的最愛</h2>
        <p>將常吃的食物加入我的最愛，下次要吃快速下單，省去找不到上次吃的食物的煩惱！</p>
        
      </div>
    </div><!-- /.row -->

  <footer class="container">    
    <div>Icons made by <a href="https://www.flaticon.com/authors/flat-icons" title="Flat Icons">Flat Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data(){
    return {
      slogons : [
        '不必大排長龍排隊買食物',
        '等食物準備好再到店裡取餐',
        '不再被奇怪的食物名稱所困惑',        
        '在手機上就能探索所有美食',
        '節省每天花在購買食物的時間'
      ],
      index : 0
    }
  },
  computed:{
    loggedIn(){
      return localStorage.getItem('token') !== null;
    }
  },
  created(){
      setInterval(()=>{
        if(++this.index === this.slogons.length) this.index = 0;        
      },2000);
  }
};
</script>

<style lang="scss" scoped>
.slide-up-enter-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  
}
.slide-up-leave-active {
  position:absolute;
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-up-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-40px);
  opacity: 0;
}
.slide-up-enter{
  opacity: 0;
  
  
}
.slide-up-enter-to{
  transform: translateY(0px);
  opacity: 1;
}

h1{
  font-weight: bold !important;
}
h2.slogon{
  font-weight:400;
  color: #4d80e4;
}

</style>