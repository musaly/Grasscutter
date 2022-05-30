import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fullscreen: false, // 当前是否全屏
  },
  mutations: {
    changeFullScreen(state, newFullscreen) {
      state.fullscreen = newFullscreen
    },
  },
  actions: {
  },
  modules: {
  }
})
