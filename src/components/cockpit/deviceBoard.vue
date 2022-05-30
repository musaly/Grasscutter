<template>
  <div class="deviceBoard">
    <router-link :to="{path:'/workshopBoard'}">
    <div class="title">
      <div class="circle"></div>
      <div>设备看板</div>
      <div class="circle"></div>
    </div>
    </router-link>
    <div class="content">
      <div class="content_top">
        <div class="content__title">
          <div class="block"></div>
          <div>
            产量
          </div>
        </div>
        <div class="content_content">
          <div class="content_data">
            <div>当天总量</div>
            <div class="font">{{todayOutputSum}}</div>
          </div>
          <div class="content_data">
            <div>生产完成率</div>
            <div>{{productFinishRate}}</div>
          </div>
        </div>
      </div>
      <div class="content_bottom">
        <div class="content__title">
          <div class="block"></div>
          <div>
            状态
          </div>
        </div>
        <div class="content_content">
          <div class="content_data">
            <div class="state">
              <div class="run"></div>
              <div>运行状态</div>
            </div>
            <div class="font">{{runNum}}台</div>
          </div>
          <div class="content_data">
            <div class="state">
              <div class="wait"></div>
              <div>待机状态</div>
            </div>
            <div class="font">{{waitNum}}台</div>
          </div>
          <div class="content_data">
            <div class="state">
              <div class="stop"></div>
              <div>异常状态</div>
            </div>
            <div class="font">{{abnormalNum}}台</div>
          </div>
          <div class="deviveNumber">
            <div class="state">
              <div>总设备数</div>
            </div>
            <div class="totalNumber">{{machineSum}}台</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      todayOutputSum: '',
      productFinishRate: '',
      runNum: '',
      waitNum: '',
      abnormalNum: '',
      machineSum: ''
    }
  },
  mounted(){
    this.getMsg()
  },
  methods: {
    getMsg(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/machineStatus',
        method: 'get',
        params: {
          type: 0
        }
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.todayOutputSum = body.todayOutputSum
          this.productFinishRate = body.productFinishRate
          this.runNum = body.runNum
          this.waitNum = body.waitNum
          this.abnormalNum = body.abnormalNum
          this.machineSum = body.machineSum
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.deviceBoard {
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
    .content__title {
      display: flex;
      width: 100%;
      height: 0.63rem;
      line-height: 0.63rem;
      font-size: 0.63rem;
      color: #ffffff;
      .block {
        width: 0.15625rem;
        height: 100%;
        margin-right: 0.84375rem;
        background-color: #4f93f1;
      }
    }
    .content_top {
      width: 100%;
      height: 9.38rem;
      padding: 0.63rem 0.78rem;
      background: url(../../assets/pictures/deviceState_top.png) no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      margin-bottom: 0.63rem;
      .content_content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: calc(100% - 1.26rem);
        font-size: 0.5rem;
        font-weight: 500;
        color: #ffffff;
        .content_data {
          display: flex;
          justify-content: space-between;
          &:nth-child(1) {
            margin-bottom: 0.81rem;
            .font {
              vertical-align: top;
              font-size: 0.75rem;
              font-weight: bold;
              color: #ffcc00;
            }
          }
        }
      }
    }
    .content_bottom {
      width: 100%;
      height: 9.38rem;
      padding: 0.63rem 0.78rem;
      background: url(../../assets/pictures/deviceState_bottom.png) no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      .content_content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: calc(100% - 1.26rem);
        .content_data {
          display: flex;
          justify-content: space-between;
          .state {
            display: flex;
            justify-content: space-between;
            width: 2.6rem;
            padding-top: 0.25rem;
            font-size: 0.5rem;
            font-weight: 500;
            color: #ffffff;
            .run {
              width: 0.28rem;
              height: 0.28rem;
              background: #10eb7e;
              border-radius: 50%;
              margin-right: 0.13rem;
              margin-top: 0.16rem;
            }
            .wait {
              width: 0.28rem;
              height: 0.28rem;
              background: #f8e252;
              border-radius: 50%;
              margin-right: 0.13rem;
              margin-top: 0.16rem;
            }
            .stop {
              width: 0.28rem;
              height: 0.28rem;
              background: #eb3030;
              border-radius: 50%;
              margin-right: 0.13rem;
              margin-top: 0.16rem;
            }
          }
          .font {
            font-size: 0.75rem;
            font-weight: bold;
            color: #ffcc00;
          }
        }
        .deviveNumber {
          display: flex;
          justify-content: space-between;
          padding-left: 0.6rem;
          margin-top: 0.88rem;
          .state {
            font-size: 0.5rem;
            font-weight: 500;
            color: #ffffff;
          }
          .totalNumber {
            font-size: 0.75rem;
            font-weight: bold;
            line-height: 0.41rem;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
