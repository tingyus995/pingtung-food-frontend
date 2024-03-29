import Vue from "vue";
import "./plugins/fontawesome";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueSocketIO from 'vue-socket.io'
import eventBus from "./eventBus";
import moment from "moment";
import VueMomentJS from "vue-momentjs";
import VueLodash from 'vue-lodash';

const BASE_URL = process.env.VUE_APP_API_URL

axios.defaults.timeout = 5000;
axios.defaults.baseURL = BASE_URL
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


Vue.use(new VueSocketIO({
  debug: true,
  connection: BASE_URL,
  vuex: {      
  },
  //options: { path: "/my-app/" } //Optional options
}))

moment.locale('zh_TW'); // set language of moment

Vue.use(VueMomentJS, moment);
Vue.use(VueLodash);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
