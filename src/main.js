import Vue from "vue";
import "./plugins/fontawesome";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import eventBus from "./eventBus";

axios.defaults.timeout = 5000;
axios.defaults.baseURL = "http://localhost:3030"
Vue.prototype.$http = axios;
Vue.prototype.$bus = eventBus;
/*axios.interceptors.request.use(
  config => {
    config.data = JSON.stringify(config.data);
    config.headers = { // 如果沒有cors的問題則可以都不加
      "Access-Control-Allow-Origin": "localhost:3030",
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
      "Access-Control-Max-Age": "86400"
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);*/






Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
