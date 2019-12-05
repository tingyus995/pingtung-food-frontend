<template>
  <div class="add-food container-fluid">
    <div class="card">
      <div class="card-header">
        <font-awesome-icon icon="user"></font-awesome-icon>TingYuYan
      </div>

      <div class="card-body">
        <ul class="list-group list-group-flush">
          <li class="list-group-item text-left">
            番茄炒飯
            <span class="badge badge-success">1</span>
          </li>
          <li class="list-group-item text-left">
            鮮奶茶
            <span class="badge badge-success">2</span>
          </li>
        </ul>


      </div>
      <div class="card-footer"> <font-awesome-icon icon="coins"></font-awesome-icon>共150元</div>
              <div class="btn-group">
          <a href="#" class="btn btn-primary">
            <font-awesome-icon icon="check"></font-awesome-icon>完成訂單
          </a>
          <a href="#" class="btn btn-danger">
            <font-awesome-icon icon="user-slash"></font-awesome-icon>拒絕訂單
          </a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderlist",
  components: {},
  data() {
    return {
      tag: "",
      tags: []
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
