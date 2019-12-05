<template>
  <div class="food-list container-fluid">
    <h1>foods</h1>

    <div class="card mb-4 shadow-sm">
    <div class="food-img">
        <img class="bd-placeholder-img card-img-top" alt="Vue logo" src="../assets/tomato_rice.webp" />        
    </div>       
      <div class="card-body">
        <h5 class="card-title">番茄炒飯</h5>
        <p
          class="card-text text-left"
        >牛番茄果肉厚實, 滋味甜美, 籽少口感佳, 拿來炒飯最適合了。</p>
        <div class="d-flex justify-content-between align-items-center">
          <span class="">350 NTD</span>
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-primary"><i class="material-icons">face</i>查看詳情</button>
            <button type="button" class="btn btn-sm btn-warning"><i class="fas fa-ad"></i>加到最愛</button>
          </div>
          <small class="text-muted">走路7分鐘</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "foods",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.food-img{
    max-height:200px;
    overflow:hidden;
}
</style>
