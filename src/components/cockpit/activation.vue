<template>
  <div class="activation">
    <router-link :to="{path:'/activation'}">
    <div class="title">
      <div class="circle"></div>
      <div>设备稼动率</div>
      <div class="circle"></div>
    </div>
    </router-link>
    <div class="content">
      <div class="content_left">
        <div class="content_top">
          <div class="block"></div>
          <div>
            设备稼动率详情
          </div>
        </div>
        <div class="content_left_title">
          <div style="width:10%;">序号</div>
          <div style="width:15%;text-align:start">编号</div>
          <div style="width:20%;text-align:start">名称</div>
          <div style="width:38%;text-align:start">设备类型</div>
          <div style="width:17%;text-align:start">设备稼动率</div>
        </div>
        <el-carousel style="width:100%;" :interval="10000" autoplay indicator-position="none" direction="horizontal">
          <el-carousel-item style="width:100%;" v-for="(item,index) in list" :key="index">
          <div class="content_left_list" v-for="(itemIn,indexIn) in item" :key="itemIn.num">
            <div style="width:10%;overflow:hidden;">{{index*4+indexIn+1}}</div>
            <div style="width:15%;text-align:start;overflow:hidden;">{{itemIn.num?itemIn.num:'-'}}</div>
            <div style="width:20%;text-align:start;overflow:hidden;padding-right:0.4rem;">
              <MarqueeTips v-if="itemIn.machineType&&itemIn.machineType.length>8" :content="itemIn.machineType" style="width:100%" :speed=10>
              </MarqueeTips>
              <span v-else>{{itemIn.machineType?itemIn.machineType:'-'}}</span>
            </div>
            <div style="width:38%;text-align:start;overflow:hidden;">{{itemIn.name?itemIn.name:'-'}}</div>
            <div style="width:17%;text-align:start;overflow:hidden;">{{itemIn.activation?itemIn.activation:'-'}}</div>
          </div>
          </el-carousel-item>
        </el-carousel>

      </div>
      <div class="content_right">
        <div class="content_right_title">数采设备数</div>
        <div class="content_right_number">{{machineNum}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import MarqueeTips from 'vue-marquee-tips';
export default {
  components: {
    MarqueeTips
  },
  name: "activation",
  data(){
    return {
      machineNum: '', // 数采设备数
      machineDetail: [],
      list: []
    }
  },
  mounted(){
    this.getMsg()
  },
  methods: {
    getMsg(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/machineActivation',
        method: 'get',
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.machineNum = body.machineNum
          this.machineDetail = body.machineDetail
          this.list = this.globalFun.splitArray(4, this.machineDetail)
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.activation {
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
    width:100%;
    display: flex;
    justify-content: space-between;
    height: calc(100% - 1.22rem);
    margin-top: 0.63rem;
    .content_left {
      padding: 0.63rem 0.78rem;
      width: 18.94rem;
      height: 100%;
      background: url(../../assets/pictures/rate_left.png) no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      box-sizing: border-box;
      .content_top {
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
      .content_left_title {
        display: flex;
        border-bottom: 1px solid rgba(70, 140, 236, 0.5019607843137255);
        height: 1rem;
        line-height: 1rem;
        font-size: 0.44rem;
        color: rgba(255, 255, 255, 0.65);
      }
      .content_left_list {
        display: flex;
        height: 1.41rem;
        border-bottom: 1px solid rgba(70, 140, 236, 0.5019607843137255);
        line-height: 1.41rem;
        font-size: 0.5rem;
        color: #ffffff;
      }
    }
    .content_right {
      width: 9.19rem;
      height: 100%;
      background: url(../../assets/pictures/rate_right.png) no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      box-sizing: border-box;
      .content_right_title {
        margin-top: 3.53rem;
        font-size: 0.63rem;
        font-weight: 500;
        line-height: 0.41rem;
        color: #ffffff;
      }
      .content_right_number {
        margin-top: 0.56rem;
        font-weight: bold;
        font-size: 1.13rem;
        color: #fcbd10;
      }
    }
  }
}
</style>
<style lang="scss">
  .activation{
    .el-carousel__container{
      height:7.24rem;
    }
  }
</style>
