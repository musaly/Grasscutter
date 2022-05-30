<template>
  <div class="productionBoard">
    <router-link :to="{path:'/productionBoard'}">
    <div class="title">
      <div class="circle"></div>
      <div>生产看板</div>
      <div class="circle"></div>
    </div>
    </router-link>
    <div class="content">
      <div class="content_title">
        <div style="width:4%;">序号</div>
        <div style="width:9%;text-align:start">派工单号</div>
        <div style="width:8%;text-align:start">型号</div>
        <div style="width:10%;text-align:start">名称</div>
        <div style="width:13%;text-align:start">规格</div>
        <div style="width:7%;text-align:start">当前工序</div>
        <div style="width:6%;text-align:start">派工数量</div>
        <div style="width:12%;text-align:start">上机时间</div>
        <div style="width:8%;text-align:start">完成数量</div>
        <div style="width:5%;text-align:start">达成率</div>
        <div style="width:5%;text-align:start">良品率</div>
        <div style="width:5%;text-align:start">状态</div>
        <div style="width:11%;text-align:start">预计完成时间</div>
      </div>
      <el-carousel style="width:100%;height:100%;" :interval="10000" autoplay indicator-position="none" direction="horizontal">
        <el-carousel-item style="width:100%;height:100%;" v-for="(item,index) in list" :key="index">
          <div class="content_content" v-for="(itemIn,indexIn) in item" :key="itemIn.dispatchOrder">
            <div style="width:4%;">{{index*12+indexIn+1}}</div>
            <div style="width:9%;text-align:start;overflow:hidden;padding-right:0.4rem;">
              <MarqueeTips v-if="itemIn.dispatchOrder&&itemIn.dispatchOrder.length>13" :content="itemIn.dispatchOrder" style="width:100%" :speed=10></MarqueeTips>
              <span v-else>{{itemIn.dispatchOrder?itemIn.dispatchOrder:'-'}}</span>
            </div>
            <div style="width:8%;text-align:start;overflow:hidden;">{{itemIn.model?itemIn.model:'-'}}</div>
            <div style="width:10%;text-align:start;overflow:hidden;padding-right:0.4rem;">
              <MarqueeTips v-if="itemIn.name&&itemIn.name.length>8" :content="itemIn.name" style="width:100%" :speed=10>
              </MarqueeTips>
              <span v-else>{{itemIn.name?itemIn.name:'-'}}</span>
            </div>
            <div style="width:13%;text-align:start;overflow:hidden;">{{itemIn.specification?itemIn.specification:'-'}}</div>
            <div style="width:8%;text-align:start;overflow:hidden;">{{itemIn.process?itemIn.process:'-'}}</div>
            <div style="width:5%;text-align:start;overflow:hidden;">{{itemIn.dispatchNum?itemIn.dispatchNum:'-'}}</div>
            <div style="width:12%;text-align:start;overflow:hidden;">{{itemIn.startTime?itemIn.startTime:'-'}}</div>
            <div style="width:8%;text-align:start;overflow:hidden;">{{itemIn.finishNum?itemIn.finishNum:'-'}}</div>
            <div style="width:5%;text-align:start;overflow:hidden;">{{itemIn.finishRate?itemIn.finishRate:'-'}}</div>
            <div style="width:5%;text-align:start;overflow:hidden;">{{itemIn.goodRate?itemIn.goodRate:'-'}}</div>
            <div style="width:5%;text-align:start;overflow:hidden;">{{itemIn.status?itemIn.status:'-'}}</div>
            <div style="width:11%;text-align:start;overflow:hidden;">{{itemIn.planFinishTime?itemIn.planFinishTime:'-'}}</div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import MarqueeTips from 'vue-marquee-tips';
export default {
  components: {
    MarqueeTips
  },
  name: "productionBoard",
  data(){
    return {
      listAll: [],
      list: []
    }
  },
  mounted(){
    this.getMsg()
  },
  methods: {
    getMsg(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/productBoard',
        methods: 'get',
        params: {
          workshop: '01'
        }
      }).then((res) => {
        if (res.data.success === 1){
          this.listAll = res.data.body.list
          this.list = this.splitArray(12, this.listAll)
        }
      })
    },
    // 分割数组，n为分割的数组长度，array为分割的数组
    splitArray(n, array){
      var newArray = []
      for (let i = 0; array.length > 0; i++){
      newArray.push(array.splice(0, n))
      }
      return newArray
    },
  }
};
</script>

<style lang="scss" scoped>
.productionBoard {
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
    width: 100%;
    height: 19.38rem;
    background: url(../../assets/pictures/product_bg.png) no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    padding: 0.63rem;
    margin-top: 0.63rem;
    .content_title {
      display: flex;
      border-bottom: 1px solid rgba(70, 140, 236, 0.5019607843137255);
      height: 1rem;
      line-height: 1rem;
      font-size: 0.5rem;
      color: rgba(255, 255, 255, 0.65);
    }
    .content_content {
      display: flex;
      height: 1.41rem;
      border-bottom: 1px solid rgba(70, 140, 236, 0.5019607843137255);
      line-height: 1.41rem;
      font-size: 0.5rem;
      color: #ffffff;
    }
  }
}
</style>
<style lang="scss">
  .productionBoard{
    .el-carousel__container{
      height: 16.81rem;
    }
  }
</style>
