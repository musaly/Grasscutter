<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    methods: {
      setRem() {
      const w = window.innerWidth;
      if (w === 1920) {
        document.documentElement.style.fontSize = '16px';
      } else if (w === 3840){
        document.documentElement.style.fontSize = '32px';
      } else if (w === 960){ // 采购的小米电视的分辨率 960*540
        document.documentElement.style.fontSize = '48px';
      } else {
        document.documentElement.style.fontSize = w / 120 + 'px';
      }
      }
    },
    mounted(){
      this.setRem();
      window.onresize = this.setRem;
    }
  }
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
   width: 100%;
        height: 100%;
         position: absolute;
        top: 0;
        left: 0;
}
html::-webkit-scrollbar{
			width: 0;
}
</style>
