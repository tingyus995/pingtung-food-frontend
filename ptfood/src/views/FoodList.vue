<template>
  <div class="food-list container-fluid">
    <h1>foods</h1>

    <div class="card mb-4 shadow-sm">
      <div class="food-img">
        <img
          class="bd-placeholder-img card-img-top"
          alt="Vue logo"
          src="../assets/tomato_rice.webp"
        />
      </div>
      <div class="food-card card-body">
        <h5 class="card-title">番茄炒飯</h5>
        <h6><font-awesome-icon icon="store-alt"></font-awesome-icon>捲捲泰式料理</h6>
        <p class="tags card-text text-left">
          <span class="badge badge-success">番茄</span>
          <span class="badge badge-success">炒飯</span>
          <span class="badge badge-success">營養</span>
        </p>
        <p class="card-text text-left">
          牛番茄果肉厚實, 滋味甜美, 籽少口感佳, 拿來炒飯最適合了。
        </p>

        <div class="d-flex justify-content-between align-items-center">
          <span class="price">$350 起</span>
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-primary">
              <font-awesome-icon icon="info-circle"></font-awesome-icon>查看詳情
            </button>
            <button type="button" class="btn btn-sm btn-warning">
              <font-awesome-icon icon="heart"></font-awesome-icon>加到最愛
            </button>
          </div>
          <small class="text-muted"><font-awesome-icon icon="walking"></font-awesome-icon>步行7分鐘</small>
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
.food-img {
  max-height: 200px;
  overflow: hidden;
}
.food-list .price{
  font-weight: bold;
}
.tags span{
  margin: 0 5px;
  font-size: 0.8rem;
}
.food-card h6{
  color:rgb(109, 109, 109);
}
</style>
