module.exports = {
  devServer: {
    host: "localhost",
    port: 8000,
    proxy: {
      "/": {
        // target: 'http://192.168.31.190:8083', // 测试石
        //  target: 'http://192.168.31.252:8080', // 测试刁
          target: 'http://127.0.0.1:8083', // 群力
        changeOrigin: true // 如果接口跨域，需要进行这个参数配置
      }
    }
  }
};
