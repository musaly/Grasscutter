<template>
  <div class="homePage">
    <div class="head">
      <div class="title">
        <div class="tit">
          <div class="point"></div>
          <div class="titleOne">车间设备生产看板</div>
          <div class="point"></div>
        </div>
      </div>
      <div class="date"></div>
    </div>
    <div class="middle">
      <div class="middleOne">
        <div class="middleA">
          <div class="middleAA">联网设备数</div>
          <div class="middleAB">{{totalPLCAmount}}台</div>
        </div>
        <div class="middleB"></div>
        <div class="middleC">
          <div
            class="middleCA"
            style="background:linear-gradient(150.69deg, #00FBFC 17.14%, #468CEC 80.14%)"
          ></div>
          <div class="middleAA">运行</div>
          <div class="middleAB">{{runPLCAmount}}台</div>
        </div>
        <div class="middleD">
          <div
            class="middleDA"
            style="background: linear-gradient(147.07deg, #FFBD84 17.57%, #F57F17 82.64%)"
          ></div>
          <div class="middleAA">待机</div>
          <div class="middleAB">{{waitPLCAmount}}台</div>
        </div>
        <div class="middleE">
          <div
            class="middleEA"
            style="background: linear-gradient(139.4deg, #FFABA5 13.7%, #E14438 75%)"
          ></div>
          <div class="middleAA">停机</div>
          <div class="middleAB">{{stopPLCAmount}}台</div>
        </div>
      </div>
    </div>
    <div class="content">
      <div :class="item.machineStatus == 3 ?'info':item.machineStatus == 2 ? 'infoB':'infoC'"
      v-for="(item,index) in List" :key="index">
        <div class="left">
          <div class="num">
            <div class="numA">{{item.deviceNum}}</div>
          </div>
          <div class="production">
            <div class="product">累计产量</div>
            <div class="tion">{{item.totalProduction}}</div>
          </div>
          <div class="using">
            <div class="product">昨日利用率</div>
            <div class="tion">{{item.deviceUseRate}}</div>
          </div>
        </div>
        <div class="right"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homePage',
  data(){
    return {
      runPLCAmount: '',
      stopPLCAmount: '',
      totalPLCAmount: '',
      waitPLCAmount: '',
      List: []
    }
  },
  methods: {
    getMachine(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/machineDetail',
        method: 'get',
      }).then((res) => {
        if (res.data.success === 1){
         console.log(res);
         const body = res.data.body;
        this.runPLCAmount = body.runPLCAmount;
        this.stopPLCAmount = body.stopPLCAmount;
        this.totalPLCAmount = body.totalPLCAmount;
        this.waitPLCAmount = body.waitPLCAmount;
        this.List = body.List;
        }
      }).catch((err) => {
        console.log(err)
      })
    },
  },
  created(){
    this.getMachine()
  }
}
</script>

<style lang="scss" scoped>
.homePage,
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  background: url(../assets/pictures/main_background.jpg) no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  .head {
    width: 100%;
    height: 7rem;
    .title {
      width: 60rem;
      height: 7rem;
      background: url(../assets/pictures/标题.png) no-repeat;
      background-size: 100% 100%;
  background-position: center center;
      margin: auto;
      .tit {
        width: 40rem;
        height: 7rem;
        position: relative;
        left: 15rem;
        display: flex;
        .point {
          width: 1rem;
          height: 1rem;
          background: linear-gradient(
            209.31deg,
            #00fbfc 17.14%,
            #468cec 80.14%
          );
          border-radius: 50%;
          margin-top: 3rem;
        }
        .titleOne {
          font-family: Source Han Sans CN;
          font-style: normal;
          font-weight: bold;
          font-size: 3rem;
          line-height: 7rem;
          color: #ffffff;
          margin-right: 1rem;
          margin-left: 1rem;
        }
      }
    }
  }
  .middle {
    width: 65rem;
    height: 7rem;
    margin: auto;
    .middleOne {
      position: relative;
      top: 2rem;
      display: flex;
      .middleB {
        height: 2rem;
        border: 1px solid #ffffff;
        margin-right: 4rem;
        margin-left: 2rem;
        margin-top: 1rem;
      }
      .middleA,
      .middleC,
      .middleD,
      .middleE {
        display: flex;
        .middleAA {
          font-family: Source Han Sans CN;
          font-style: normal;
          font-weight: normal;
          font-size: 1.5rem;
          text-align: right;
          color: #ffffff;
          margin-top: 1.2rem;
          margin-right: 1.2rem;
        }
        .middleAB {
          font-family: Source Han Sans CN;
          font-style: normal;
          font-weight: bold;
          font-size: 2.8rem;
          color: #ffffff;
          margin-right: 2rem;
        }
        .middleCA,
        .middleDA,
        .middleEA {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          margin-top: 1.8rem;
          margin-right: 0.5rem;
        }
      }
    }
  }
  .content {
    width: 100%;
    margin-top: 1rem;
    .info {
      width: 28rem;
      height: 17rem;
      background:url("../assets/pictures/黄色背景框.png");
      background-size: 100% 100%;
  background-position: center center;
      // border: 3px solid #F57F17;
      box-sizing: border-box;
          padding: 1rem;
          display: inline-block;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
      .left {
        width: 15rem;
        height: 15rem;
        display: inline-block;
        .num {
          width: 14.5rem;
          height: 5.5rem;
          background: linear-gradient(147.07deg, #FFBD84 17.57%, #F57F17 82.64%);
          border-radius: 35px;
          margin-bottom: 2.5rem;
          .numA {
            font-family: Source Han Sans CN;
            font-style: normal;
            font-weight: bold;
            font-size: 3rem;
            color: #0C2345;
            text-align: center;
            line-height: 5.5rem;
          }
        }
        .product{
          font-family: Source Han Sans CN;
          font-style: normal;
          font-weight: normal;
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.65);
          display: inline-block;
          margin-right: 1rem;
          margin-bottom: 1.5rem;
        }
        .tion{
          font-family: Source Han Sans CN;
font-style: normal;
font-weight: bold;
font-size: 1.3rem;
color: #FFFFFF;
 display: inline-block;
        }
      }
      .right {
        width: 11rem;
        height: 10rem;
        background: url("../assets/pictures/机器.JPG.png") no-repeat;
        display: inline-block;
        position: relative;
        top: 2rem;
        background-size: 100% auto;
  background-position: center center;
      }
    }
    .infoB {
      width: 28rem;
      height: 17rem;
      background:url("../assets/pictures/红色背景框.png");
      background-size: 100% 100%;
  background-position: center center;
      // border: 3px solid #F57F17;
      box-sizing: border-box;
          padding: 1rem;
          display: inline-block;
         margin-left: 1.5rem;
          margin-bottom: 1rem;
      .left {
        width: 16rem;
        height: 15rem;
        display: inline-block;
                  margin-right: 1rem;
        .num {
          width: 14.5rem;
          height: 5.5rem;
          background: linear-gradient(143.16deg, #FFABA5 19.38%, #E14438 90.15%);
          border-radius: 35px;
          margin-bottom: 2.5rem;
          .numA {
            font-family: Source Han Sans CN;
            font-style: normal;
            font-weight: bold;
            font-size: 3rem;
            color: #0C2345;
            text-align: center;
            line-height: 5.5rem;
          }
        }
        .product{
          font-family: Source Han Sans CN;
          font-style: normal;
          font-weight: normal;
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.65);
          display: inline-block;
          margin-right: 1rem;
          margin-bottom: 1.5rem;
        }
        .tion{
          font-family: Source Han Sans CN;
font-style: normal;
font-weight: bold;
font-size: 1.3rem;
color: #FFFFFF;
 display: inline-block;
        }
      }
      .right {
        width: 9rem;
        height: 10rem;
        background: url("../assets/pictures/机器.JPG.png") no-repeat;
        display: inline-block;
        position: relative;
        top: 2rem;
        background-size: 100% auto;
  background-position: center center;
      }
    }
    .infoC {
      width: 28rem;
      height: 17rem;
      background:url("../assets/pictures/蓝色背景框.png");
      background-size: 100% 100%;
  background-position: center center;
      // border: 3px solid #F57F17;
      box-sizing: border-box;
          padding: 1rem;
          display: inline-block;
         margin-left: 1.5rem;
          margin-bottom: 1rem;
      .left {
        width: 16rem;
        height: 15rem;
        display: inline-block;
                  margin-right: 1rem;
        .num {
          width: 14.5rem;
          height: 5.5rem;
          background: linear-gradient(147.07deg, #8EF1FF 17.57%, #468CEC 82.64%);
          border-radius: 35px;
          margin-bottom: 2.5rem;
          .numA {
            font-family: Source Han Sans CN;
            font-style: normal;
            font-weight: bold;
            font-size: 3rem;
            color: #033A8B;
            text-align: center;
            line-height: 5.5rem;
          }
        }
        .product{
          font-family: Source Han Sans CN;
          font-style: normal;
          font-weight: normal;
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.65);
          display: inline-block;
          margin-right: 1rem;
          margin-bottom: 1.5rem;
        }
        .tion{
          font-family: Source Han Sans CN;
font-style: normal;
font-weight: bold;
font-size: 1.3rem;
color: #FFFFFF;
 display: inline-block;
        }
      }
      .right {
        width: 9rem;
        height: 10rem;
        background: url("../assets/pictures/机器.JPG.png") no-repeat;
        display: inline-block;
        position: relative;
        top: 2rem;
        background-size: 100% auto;
  background-position: center center;
      }
    }
  }
}
</style>
