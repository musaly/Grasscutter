import Vue from "vue";
import VueRouter from "vue-router";
// import cockpit from "../views/cockpit.vue";
 import homePage from "../views/homePage.vue";

Vue.use(VueRouter);

const routes = [
  // 驾驶舱主页
  // {
  //   path: "/",
  //   name: "cockpit",
  //   component: cockpit,
  //   // redirect: '/productionBoard'
  // },
  // 车间设备生产看板
  {
    path: "/",
    name: "homePage",
    component: homePage,
    // redirect: '/productionBoard'
  },
  // 销售看板
  {
    path: "/sellBoard",
    name: "sellBoard",
    component: () => import("../views/sellBoard.vue")
  },
  // 稼动率
  {
    path: "/activation",
    name: "activation",
    component: () => import("../views/activation.vue")
  },
  // 生产看板
  {
    path: "/productionBoard",
    name: "productionBoard",
    component: () => import("../views/productionBoard.vue")
  },
  // 库存分析
  {
    path: "/repertoryAnalyse",
    name: "repertoryAnalyse",
    component: () => import("../views/repertoryAnalyse.vue")
  },
  // 品质看板
  {
    path: "/qualityBoard",
    name: "qualityBoard",
    component: () => import("../views/qualityBoard.vue")
  },
  // 准时交付率
  {
    path: "/deliveryRate",
    name: "deliveryRate",
    component: () => import("../views/deliveryRate.vue")
  },
  // 异常事件统计分析
  {
    path: "/abnormalStatistics",
    name: "abnormalStatistics",
    component: () => import("../views/abnormalStatistics.vue")
  },
  // 车间设备生产看板
  {
    path: "/workshopBoard",
    name: "workshopBoard",
    component: () => import("../views/workshopBoard.vue")
  },
  // 测试组件用的
  {
    path: "/ceshi",
    name: "ceshi",
    component: () => import("../views/ceshi.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
