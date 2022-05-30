<template>
  <div class="statusStatistics">
    <router-link :to="{path:'/abnormalStatistics'}">
    <div class="title">
      <div class="circle"></div>
      <div>状态统计</div>
      <div class="circle"></div>
    </div>
    </router-link>
    <div class="content">
      <div class="left">
        <div class="top">
          <div class="block"></div>
          <div>
            运行详情
          </div>
        </div>
        <div class="bottom">
          <div class="item">
            <div>
              运行总时长
            </div>
            <div>{{runTimeSum}}</div>
          </div>
          <div class="item">
            <div>
              平均运行时长
            </div>
            <div>{{runTimeAverage}}</div>
          </div>
        </div>
      </div>
      <div class="center">
        <div class="top">
          <div class="block"></div>
          <div>
            停机详情
          </div>
        </div>
        <div class="bottom">
          <div class="item">
            <div>
              停机总时长
            </div>
            <div>{{stopTimeSum}}</div>
          </div>
          <div class="item">
            <div>
              平均停机时长
            </div>
            <div>{{stopTimeAverage}}</div>
          </div>
          <div class="item">
            <div>
              停机总次数
            </div>
            <div>{{stopTimeNum}}次</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="top">
          <div class="block"></div>
          <div>设备状态统计</div>
        </div>
        <div class="bottom">
          <div class="header">
            <div style="width:40%;text-align:start;">状态</div>
            <div style="width:30%;text-align:start;">数量</div>
            <div style="width:30%;text-align:start;">比例</div>
          </div>
          <div class="detail">
            <div class="detail_list">
              <div
                class="detail_list_state"
                style="width:40%;text-align:start;"
              >
                <div class="state_run"></div>
                <div>运行</div>
              </div>
              <div style="width:30%;text-align:start;">{{machineStatusRunNum}}</div>
              <div style="width:30%;text-align:start;">{{machineStatusRunRate}}</div>
            </div>
            <div class="detail_list">
              <div
                class="detail_list_state"
                style="width:40%;text-align:start;"
              >
                <div class="state_await"></div>
                <div>待机</div>
              </div>
              <div style="width:30%;text-align:start;">{{machineStatusWaitNum}}</div>
              <div style="width:30%;text-align:start;">{{machineStatusWaitRate}}</div>
            </div>
            <div class="detail_list">
              <div
                class="detail_list_state"
                style="width:40%;text-align:start;"
              >
                <div class="state_stop"></div>
                <div>异常</div>
              </div>
              <div style="width:30%;text-align:start;">{{machineStatusAbnormalNum}}</div>
              <div style="width:30%;text-align:start;">{{machineStatusAbnormalRate}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "statusStatistics",
  data() {
    return {
      runTimeSum: '', // 运行总时长
      runTimeAverage: '', // 平均运行时长
      stopTimeSum: '', // 停机总时长
      stopTimeAverage: '', // 平均停机总时长
      stopTimeNum: 0, // 停机总次数
      machineStatus: [], // 状态list
      machineStatusRunNum: '', // 运行数量
      machineStatusRunRate: '', // 运行比例
      machineStatusWaitNum: '', // 待机数量
      machineStatusWaitRate: '', // 待机比例
      machineStatusAbnormalNum: '', // 待机数量
      machineStatusAbnormalRate: '', // 待机比例
    };
  },
  mounted(){
    this.getMsg()
  },
  methods: {
    getMsg(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/getStatus',
        method: 'get',
        parmas: {
          type: 0
        }
      }).then((res) => {
        if (res.data.success === 1){
          const body = res.data.body
          this.runTimeSum = body.runTimeSum
          this.runTimeAverage = body.runTimeAverage
          this.stopTimeSum = body.stopTimeSum
          this.stopTimeAverage = body.stopTimeAverage
          this.stopTimeNum = body.stopTimeNum
          this.machineStatus = body.machineStatus
          this.machineStatus.map(item => {
            switch (item.status){
              case '运行':this.machineStatusRunNum = item.num; this.machineStatusRunRate = item.rate; break;
              case '待机':this.machineStatusWaitNum = item.num; this.machineStatusWaitRate = item.rate; break;
              case '异常':this.machineStatusAbnormalNum = item.num; this.machineStatusAbnormalRate = item.rate; break;
            }
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.statusStatistics {
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
    padding:0 1.31rem;
    font-size: 0.75rem;
    color: #ffffff;
    .circle{
      width: 0.25rem;
      height: 0.25rem;
      border-radius: 50%;
      background: linear-gradient(209deg, #00fbfc 0%, #468cec 100%);
      margin-top: 0.5rem;
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    height: calc(100% - 1.22rem);
    margin-top: 0.63rem;
    .left {
      padding: 0.63rem 0.78rem;
      width: 8.47rem;
      height: 100%;
      background: url(../../assets/pictures/stateStatistics_left.png) no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      box-sizing: border-box;
      .top {
        display: flex;
        width: 100%;
        height: 0.63rem;
        line-height: 0.63rem;
        margin-bottom: 1.81rem;
        font-size: 0.63rem;
        color: #ffffff;
      }
      .bottom {
        padding: 0rem 0.41rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
        .item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.56rem;
          div {
            &:nth-child(1) {
              font-size: 0.5rem;
              color: rgba(255, 255, 255, 0.65);
            }
            &:nth-child(2) {
              font-size: 0.56rem;
              color: #fff;
            }
          }
        }
      }
    }
    .center {
      padding: 0.63rem 0.78rem;
      width: 8.47rem;
      height: 100%;
      background: url(../../assets/pictures/stateStatistics_center.png)
        no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      box-sizing: border-box;
      .top {
        display: flex;
        width: 100%;
        height: 0.63rem;
        line-height: 0.63rem;
        margin-bottom: 1.81rem;
        font-size: 0.63rem;
        color: #ffffff;
      }
      .bottom {
        padding: 0rem 0.41rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.56rem;
          div {
            &:nth-child(1) {
              font-size: 0.5rem;
              color: rgba(255, 255, 255, 0.65);
            }
            &:nth-child(2) {
              font-size: 0.56rem;
              color: #fff;
            }
          }
        }
      }
    }
    .right {
      padding: 0.63rem 0.78rem;
      width: 10.56rem;
      height: 100%;
      background: url(../../assets/pictures/stateStatistics_right.png) no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      box-sizing: border-box;
      .top {
        display: flex;
        width: 100%;
        height: 0.63rem;
        line-height: 0.63rem;
        margin-bottom: 0.63rem;
        font-size: 0.63rem;
        color: #ffffff;
      }
      .bottom {
        height: calc(100% - 0.63rem);
        .header {
          height: 1rem;
          line-height: 1rem;
          font-size: 0.44rem;
          color: rgba(255, 255, 255, 0.65);
          display: flex;
          border-bottom: 1px solid rgba(70,140,236,0.5);
        }
        .detail {
          .detail_list {
            display: flex;
            height: 1.38rem;
            border-bottom: 1px solid rgba(70,140,236,0.5);
            line-height: 1.38rem;
            color: #ffffff;
            font-size: 0.5rem;
            .detail_list_state {
              display: flex;
              .state_run {
                width: 0.25rem;
                height: 0.25rem;
                border-radius: 50%;
                background-color: #10eb7e;
                margin-right: 0.16rem;
                margin-top: 0.55rem;
              }
              .state_await {
                width: 0.25rem;
                height: 0.25rem;
                border-radius: 50%;
                background-color: #F8E252;
                margin-right: 0.16rem;
                margin-top: 0.55rem;
              }
              .state_stop {
                width: 0.25rem;
                height: 0.25rem;
                border-radius: 50%;
                background-color: #EB3030;
                margin-right: 0.16rem;
                margin-top: 0.55rem;
              }
            }
          }
        }
      }
    }
    .block {
      width: 0.15625rem;
      height: 100%;
      margin-right: 0.84375rem;
      background-color: #4f93f1;
    }
  }
}
</style>
