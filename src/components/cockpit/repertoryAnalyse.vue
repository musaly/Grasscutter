<template>
  <div class="repertoryAnalyse">
    <router-link :to="{path:'/repertoryAnalyse'}">
    <div class="title">
      <div class="circle"></div>
      <div>库存分析</div>
      <div class="circle"></div>
    </div>
    </router-link>
    <div class="content">
      <div class="content_left">
        <div class="content_left_top">
          <div class="content_left_top_title">
            <div class="block"></div>
            <div>
              辅料库存预警
            </div>
          </div>
          <div class="content_left_top_content">
            <div class="content_left_title">
              <div style="width:15%;">序号</div>
              <div style="width:30%;text-align:start">物料编号</div>
              <div style="width:30%;text-align:start">物料名称</div>
              <div style="width:25%;text-align:start">库存数量</div>
            </div>
            <el-carousel style="width:100%;height:100%;" :interval="10000" autoplay indicator-position="none" direction="horizontal">
          <el-carousel-item style="width:100%;height:100%;" v-for="(item,index) in list1" :key="index">
            <div class="content_left_content" v-for="(itemIn,indexIn) in item" :key="itemIn.materialNum">
              <div style="width:15%;">{{index*4+indexIn+1}}</div>
              <div style="width:30%;text-align:start;overflow:hidden;padding-right:0.4rem;">
                <MarqueeTips v-if="itemIn.materialNum&&itemIn.materialNum.length>8" :content="itemIn.materialNum" style="width:100%" :speed=10></MarqueeTips>
                <span v-else>{{itemIn.materialNum}}</span>
                </div>
              <div style="width:30%;text-align:start;overflow:hidden;padding-right:0.4rem;">
                  <MarqueeTips v-if="itemIn.materialName&&itemIn.materialName.length>8" :content="itemIn.materialName" style="width:100%" :speed=10></MarqueeTips>
                  <span v-else>{{itemIn.materialName}}</span>
              </div>
              <div style="width:25%;text-align:start;overflow:hidden;padding-right:0.4rem;">{{itemIn.RepertoryAmount}}件</div>
            </div>
          </el-carousel-item>
        </el-carousel>
          </div>
        </div>
        <div class="content_left_bottom">
          <div class="content_left_bottom_title">
            <div class="block"></div>
            <div>
              原料库存预警
            </div>
          </div>
          <div class="content_left_bottom_content">
           <div class="content_left_title">
              <div style="width:15%;">序号</div>
              <div style="width:30%;text-align:start;overflow:hidden">物料编号</div>
              <div style="width:30%;text-align:start;overflow:hidden">物料名称</div>
              <div style="width:25%;text-align:start;overflow:hidden">库存数量</div>
            </div>
            <el-carousel style="width:100%;height:100%;" :interval="10000" autoplay indicator-position="none" direction="horizontal">
          <el-carousel-item style="width:100%;height:100%;" v-for="(item,index) in list2" :key="index">
            <div class="content_left_content" v-for="(itemIn,indexIn) in item" :key="itemIn.materialNum">
              <div style="width:15%;">{{index*4+indexIn+1}}</div>
              <div style="width:30%;text-align:start;overflow:hidden;padding-right:0.4rem;">
                <MarqueeTips v-if="itemIn.materialNum&&itemIn.materialNum.length>8" :content="itemIn.materialNum" style="width:100%" :speed=10></MarqueeTips>
                <span v-else>{{itemIn.materialNum}}</span>
              </div>
              <div style="width:30%;text-align:start;overflow:hidden;padding-right:0.4rem;">
                <MarqueeTips v-if="itemIn.materialName&&itemIn.materialName.length>7" :content="itemIn.materialName" style="width:100%" :speed=10></MarqueeTips>
                <span v-else>{{itemIn.materialName}}</span>
              </div>
              <div style="width:25%;text-align:start;overflow:hidden;padding-right:0.4rem;">{{itemIn.RepertoryAmount}}件</div>
            </div>
           </el-carousel-item>
        </el-carousel>
          </div>
        </div>
      </div>
      <div class="content_right">
        <div class="content_right_title">
          <div class="block"></div>
          <div>
            成品库存预警
          </div>
        </div>
        <div class="content_right_content">
         <div class="content_left_title">
              <div style="width:15%;">序号</div>
              <div style="width:30%;text-align:start">物料编号</div>
              <div style="width:30%;text-align:start">物料名称</div>
              <div style="width:25%;text-align:start">库存数量</div>
            </div>
          <el-carousel style="width:100%;height:100%;" :interval="10000" autoplay indicator-position="none" direction="horizontal">
            <el-carousel-item style="width:100%;height:100%;" v-for="(item,index) in list3" :key="index">
              <div class="content_left_content" v-for="(itemIn,indexIn) in item" :key="itemIn.materialNum">
                <div style="width:15%;">{{index*11+indexIn+1}}</div>
                <div style="width:30%;text-align:start;overflow:hidden;padding-right:0.4rem;">
                  <MarqueeTips v-if="itemIn.materialNum&&itemIn.materialNum.length>8" :content="itemIn.materialNum" style="width:100%" :speed=10></MarqueeTips>
                  <span v-else>{{itemIn.materialNum}}</span>
                </div>
                <div style="width:30%;text-align:start;overflow:hidden;padding-right:0.4rem;">
                  <MarqueeTips v-if="itemIn.materialName&&itemIn.materialName.length>7" :content="itemIn.materialName" style="width:100%" :speed=10></MarqueeTips>
                  <span v-else>{{itemIn.materialName}}</span>
                </div>
                <div style="width:25%;text-align:start;overflow:hidden;padding-right:0.4rem;">{{itemIn.RepertoryAmount}}件</div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
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
  name: "repertoryAnalyse",
  data(){
    return {
      xAxis1: [],
      series1: [],
      productionRepertoryWarnList: [], // 成品库存预警list
      materialRepertoryWarnList: [], // 原材料预警list
      ingredientRepertoryWarnList: [], // 辅料库存预警list

      list1: [],
      list2: [],
      list3: [],
    }
  },
  mounted(){
    this.getProductionRepertoryWarn()
    this.getMaterialRepertoryWarn()
    this.getIngredientRepertoryWarn()
  },
  methods: {
    getProductionRepertoryWarn(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/productionRepertoryWarn',
        method: 'get'
      }).then((res) => {
        if (res.data.success === 1){
          this.productionRepertoryWarnList = res.data.body.list
          this.list3 = this.globalFun.splitArray(11, this.productionRepertoryWarnList)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getMaterialRepertoryWarn(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/materialRepertoryWarn',
        method: 'get'
      }).then((res) => {
        if (res.data.success === 1){
          this.materialRepertoryWarnList = res.data.body.list
          this.list2 = this.globalFun.splitArray(4, this.materialRepertoryWarnList)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getIngredientRepertoryWarn(){
      this.axios({
        url: '/dtsum/qunli/cockpit/home/ingredientRepertoryWarn',
        method: 'get'
      }).then((res) => {
        if (res.data.success === 1){
          this.ingredientRepertoryWarnList = res.data.body.list
          this.list1 = this.globalFun.splitArray(4, this.ingredientRepertoryWarnList)
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.repertoryAnalyse {
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
    display: flex;
    justify-content: space-between;
    margin-top: 0.63rem;
    .content_left_title {
      display: flex;
      border-bottom: 1px solid rgba(70, 140, 236, 0.5019607843137255);
      height: 1rem;
      line-height: 1rem;
      font-size: 0.5rem;
      color: rgba(255, 255, 255, 0.65);
    }
    .content_left_content {
      display: flex;
      height: 1.41rem;
      border-bottom: 1px solid rgba(70, 140, 236, 0.5019607843137255);
      line-height: 1.41rem;
      font-size: 0.5rem;
      color: #ffffff;
    }
    .content_left {
      display: flex;
      flex-direction: column;
      margin-right: 0.63rem;
      .content_left_top {
        width: 14.06rem;
        height: 9.38rem;
        margin-bottom: 0.63rem;
        background: url(../../assets/pictures/stock_left_top.png) no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        padding: 0.63rem 0.78rem;
        .content_left_top_title {
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
      }
      .content_left_bottom {
        width: 14.06rem;
        height: 9.38rem;
        background: url(../../assets/pictures/stock_left_bottom.png) no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        padding: 0.63rem 0.78rem;
        .content_left_bottom_title {
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
      }
    }
    .content_right {
      width: 14.06rem;
      height: 19.38rem;
      background: url(../../assets/pictures/stock_right.png) no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      padding: 0.63rem 0.78rem;
      .content_right_title {
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
    }
  }
}
</style>
<style lang="scss">
  .repertoryAnalyse{
    .content_left{
      .el-carousel__container{
        height:5.81rem;
      }
    }
    .content_right{
      .el-carousel__container{
        height:15.81rem;
      }
    }
  }
</style>
