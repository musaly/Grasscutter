<template>
  <div class="workShopCockpit">
    <div class="title" @click="fullScreen">
      <div class="circle"></div>
      <div>群力数字车间驾驶舱</div>
      <div class="circle"></div>
    </div>
    <div class="content">
      <div class="content_header">
        <div class="state">
          <div class="run"></div>
          <div>运行</div>
        </div>
        <div class="state">
          <div class="wait"></div>
          <div>待机</div>
        </div>
        <div class="state">
          <div class="stop"></div>
          <div>异常</div>
        </div>
      </div>
      <div class="content_list">
        <div
          v-for="item in orderList"
          :key="item.machineNum"
          :class="chooseClass(item.status)"
        >
          <div class="orderNumberr">{{ item.machineNum }}</div>
          <div class="order_message">
            <div>
              <span class="order_message_name">工单单号：</span>
              <span class="order_message_value">{{
                item.orderNum
              }}</span>
            </div>
            <div>
              <span class="order_message_name">产品名称：</span>
              <span class="order_message_value">{{ item.productName }}</span>
            </div>
            <div>
              <span class="order_message_name">当前工序：</span>
              <span class="order_message_value">{{ item.process }}</span>
            </div>
            <div>
              <span class="order_message_name">当前产量：</span>
              <span class="order_message_value">{{ item.output }}</span>
            </div>
            <div>
              <span class="order_message_name">设备利用率：</span>
              <span class="order_message_value">{{ item.machineUseRate }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: 0,
      orderList: [],
    };
  },
   computed: {
    fullscreen(){
      return this.$store.state.fullscreen
    }
  },
  mounted(){
    this.getMsg()
  },
  methods: {
    // 设置是否全屏显示
    fullScreen() {
      const element = document.documentElement
      if (this.$store.state.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      }
      this.$store.commit('changeFullScreen', !this.$store.state.fullscreen)
    },
    chooseClass(status){
      switch (status){
        case '运行':return 'run';
        case '待机':return 'wait';
        case '异常':return 'stop';
        default:return 'run'
      }
    },
    getMsg(){
      this.axios({
        method: 'get',
        url: '/dtsum/qunli/cockpit/home/machineMsg',
        params: {
          type: this.type, // 0为全部，701为冷墩车间，702为搓丝
        }
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.machineSum = body.machineSum
          this.runSum = body.runSum
          this.waitSum = body.waitSum
          this.abnormalSum = body.abnormalSum
          this.orderList = body.list
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.workShopCockpit {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 4.06rem;
  .title {
    display: flex;
    justify-content: space-between;
    height: 2.41rem;
    line-height: 2.41rem;
    margin: auto;
    width: 17.06rem;
    background: url(../../assets/pictures/title_bg.png) no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    padding: 0 1.31rem;
    font-size: 1.25rem;
    cursor: pointer;
    color: #ffffff;
    .circle {
      width: 0.29rem;
      height: 0.29rem;
      border-radius: 50%;
      background: linear-gradient(209deg, #00fbfc 0%, #468cec 100%);
      margin-top: 1.05rem;
    }
  }
  .content {
    .content_header {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      height: 0.81rem;
      font-size: 0.81rem;
      color: #ffffff;
      .state {
        display: flex;
        justify-content: space-between;
        margin-right: 2.5rem;
      }
      .run {
        width: 0.38rem;
        height: 0.38rem;
        background: #10BC60;
        border-radius: 50%;
        margin-top: 0.4rem;
        margin-right: 0.5rem;
      }
      .wait {
        width: 0.38rem;
        height: 0.38rem;
        background: #f57f17;
        border-radius: 50%;
        margin-top: 0.4rem;
        margin-right: 0.5rem;
      }
      .stop {
        width: 0.38rem;
        height: 0.38rem;
        background: #E14438;
        border-radius: 50%;
        margin-top: 0.4rem;
        margin-right: 0.5rem;
      }
    }
    .content_list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      height: 38.29rem;
      margin-top: 1.25rem;
      overflow: hidden;
      .run {
        width: 9.38rem;
        height: 6.66rem;
        margin-bottom: 1.25rem;
        padding: 0.69rem 1.28rem;
        background: #10bc60;
      }
      .wait {
        width: 9.38rem;
        height: 6.66rem;
        margin-bottom: 1.25rem;
        padding: 0.69rem 1.28rem;
        background: #f57f17;
      }
      .stop {
        width: 9.38rem;
        height: 6.66rem;
        margin-bottom: 1.25rem;
        padding: 0.69rem 1.28rem;
        background: #e14438;
      }
      .orderNumberr {
        width: 6.88rem;
        height: 0.94rem;
        border-bottom: 1px solid #ffffff;
        font-size: 0.63rem;
        font-weight: bold;
        color: #ffffff;
        margin-bottom: 0.41rem;
      }
      .order_message {
        font-size: 0.5rem;
        line-height: 0.84rem;
        color: #ffffff;
        .order_message_name {
          display: inline-block;
          width: 3rem;
          text-align: right;
          line-height: 0.84rem;
          color: rgba(255, 255, 255, 0.65);
        }
        .order_message_value {
          display: inline-block;
          width: 3rem;
          text-align: left;
          line-height: 0.84rem;
        }
      }
    }
  }
}
</style>
