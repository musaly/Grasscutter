import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import globalFun from '../src/assets/js/index.js'
import 'echarts-liquidfill'
import * as echarts from "echarts";
import "../src/assets/css/index.scss";
import { Select, Carousel, CarouselItem, Option } from "element-ui";

Vue.use(Select);
Vue.use(Option);
Vue.use(Carousel);
Vue.use(CarouselItem);

Vue.prototype.globalFun = globalFun;
Vue.prototype.axios = axios;
Vue.prototype.echarts = echarts;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
