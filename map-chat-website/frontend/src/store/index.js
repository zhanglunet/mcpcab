import Vue from 'vue';
import Vuex from 'vuex';
import chat from './modules/chat';
import map from './modules/map';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    chat,
    map
  },
  // 全局状态
  state: {
    loading: false,
    error: null
  },
  // 获取状态的计算属性
  getters: {
    isLoading: state => state.loading,
    hasError: state => state.error !== null,
    errorMessage: state => state.error
  },
  // 同步修改状态
  mutations: {
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    }
  },
  // 异步操作
  actions: {
    handleError({ commit }, error) {
      console.error('全局错误:', error);
      commit('setError', error.message || '发生未知错误');
      
      // 3秒后自动清除错误
      setTimeout(() => {
        commit('clearError');
      }, 3000);
    }
  }
}); 