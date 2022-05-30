<template>
  <div class="activateDistribution">
    <router-link :to="{path:'/activation'}">
    <div class="title">
      <div class="circle"></div>
      <div>稼动率分布</div>
      <div class="circle"></div>
    </div>
    </router-link>
    <div class="content">
      <div class="content_title">
        <div class="block"></div>
        <div>
          稼动率分布
        </div>
      </div>
      <div class="content_content">
        <SingleBarRow :singleBarRowChart="singleBarRow"></SingleBarRow>
      </div>
    </div>
  </div>
</template>

<script>
import SingleBarRow from "../singleBarRow";
export default {
  components: {
    SingleBarRow
  },
  data() {
    return {
      singleBarRow: {
        yData: [0, 0, 0, 0, 0, 0],
        xData: [0, 0, 0, 0, 0, 0, 0],
        color: '#BBFEC4',
        yUnit: "稼动率(%)",
        barColorStart: "#08BF63",
        barColorEnd: "#BBFEC4",
        id: "singleBarRow1",
        tilt: "0" // y轴坐标是否倾斜  1：是  0：否
      }
    };
  },
  methods: {
    getMsg(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/activationMsg',
        method: 'get'
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.singleBarRow.yData = body.yAxis
          this.singleBarRow.xData = body.data
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.activateDistribution {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title {
    display: flex;
    justify-content: space-between;
    height: 1.22rem;
    line-height: 1.22rem;
    margin: auto;
    width: 8.63rem;
    background: url(../../assets/pictures/title_bg.png) no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    padding: 0 1.31rem;
    font-size: 0.75rem;
    color: #ffffff;
    .circle {
      width: 0.25rem;
      height: 0.25rem;
      border-radius: 50%;
      background: linear-gradient(209deg, #00fbfc 0%, #468cec 100%);
      margin-top: 0.5rem;
    }
  }
  .content {
    margin-top: 0.63rem;
    width: 14.69rem;
    height: 19.38rem;
    background: url(../../assets/pictures/rate_bg.png) no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    padding: 0.62rem 0.78rem;
    .content_title {
     display: flex;
          width: 100%;
          height: 0.63rem;
          line-height: 0.63rem;
          margin-bottom: 0.63rem;
          font-size: 0.63rem;
          color: #ffffff;
          .block {
            width: 0.15625rem;
            height: 100%;
            margin-right: 0.84375rem;
            background-color: #4f93f1;
          }
    }
    .content_content {
      width: 100%;
      height: calc(100% - 1rem);
    }
  }
}
</style>
