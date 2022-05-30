<template>
  <div class="cockpit">
    <div class="left">
      <div class="left_first">
        <statusStatistics />
      </div>
      <div class="left_second">
        <activation />
      </div>
      <div class="left_third">
        <sellBoard />
      </div>
      <div class="left_fourth">
        <qualityBoard />
      </div>
    </div>
    <div class="center">
      <div class="center_first">
        <workShopCockpit />
      </div>
      <div class="center_second">
        <div class="center_second_first">
          <productionBoard />
        </div>
        <div class="center_second_second">
          <activateDistribution />
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right_first">
        <div class="right_first_left">
          <deviceBoard></deviceBoard>
        </div>
        <div class="right_first_right">
          <efficiencyBoard />
        </div>
      </div>
      <div class="right_second">
        <orderBoard />
      </div>
      <div class="right_third">
        <repertoryAnalyse />
      </div>
    </div>
  </div>
</template>

<script>
import statusStatistics from "../components/cockpit/statusStatistics";
import activation from "../components/cockpit/activation";
import sellBoard from "../components/cockpit/sellBoard";
import qualityBoard from "../components/cockpit/qualityBoard";
import efficiencyBoard from "../components/cockpit/efficiencyBoard";
import orderBoard from "../components/cockpit/orderBoard";
import productionBoard from "../components/cockpit/productionBoard";
import activateDistribution from "../components/cockpit/activateDistribution";
import repertoryAnalyse from "../components/cockpit/repertoryAnalyse";
import deviceBoard from "../components/cockpit/deviceBoard";
import workShopCockpit from "../components/cockpit/workShopCockpit";

export default {
  components: {
    statusStatistics,
    activation,
    sellBoard,
    qualityBoard,
    efficiencyBoard,
    orderBoard,
    productionBoard,
    activateDistribution,
    repertoryAnalyse,
    deviceBoard,
    workShopCockpit,
  },
  data() {
    return {};
  },
  created() {
    // this.redirectPage();
  },
  methods: {
    redirectPage() {
      // var wjb51 = window.innerWidth; // 浏览器的网页可视区域大小
      // var hjb51 = window.innerHeight;
      var wjb51 = screen.width; // 浏览器的屏幕大小
      var hjb51 = screen.height;
      document.body.innerHTML =
        "<h1>经检测，分辨率为 " + wjb51 + "*" + hjb51 + "</h1>";
    },
  },
};
</script>
<style lang="scss" scoped>
.cockpit {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  // height: 100vh;
  background: url(../assets/pictures/main_background.jpg) no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  padding: 0.94rem 0.63rem;
  .left {
    width: 28.75rem;
    margin-right: 0.63rem;
    .left_first,
    .left_second,
    .left_third {
      margin-bottom: 0.97rem;
    }
    .left_first {
      height: 9.51rem;
    }
    .left_second {
      height: 11.23rem;
    }
    .left_third {
      height: 20.8rem;
    }
    .left_fourth {
      height: 21.24rem;
    }
  }
  .center {
    width: 60rem;
    margin-right: 0.63rem;
    .center_first {
      margin-bottom: 1.25rem;
      height: 43.09rem;
    }
    .center_second {
      display: flex;
      height: 21.23rem;
      .center_second_first {
        width: 44.69rem;
        height: 100%;
        margin-right: 0.63rem;
      }
      .center_second_second {
        width: 14.69rem;
        height: 100%;
      }
    }
  }
  .right {
    width: 28.75rem;
    .right_first,
    .right_second {
      margin-bottom: 0.97rem;
    }
    .right_first {
      display: flex;
      justify-content: space-between;
      height: 21.24rem;
      .right_first_left {
        width: 9.19rem;
        height: 100%;
      }
      .right_first_right {
        width: 18.94rem;
        height: 100%;
      }
    }
    .right_second {
      height: 21.24rem;
    }
    .right_third {
      height: 21.23rem;
    }
  }
}
</style>
