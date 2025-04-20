import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';

// 使用 Element UI
Vue.use(ElementUI, {
  size: 'medium' // 设置组件默认尺寸
});

// 设置是否允许 Vue 开发工具
Vue.config.productionTip = false;

// 全局错误处理
Vue.config.errorHandler = function(err, vm, info) {
  console.error('Vue全局错误：', err);
  console.error('来源组件：', vm);
  console.error('错误信息：', info);
  
  // 上报错误到 Vuex
  store.dispatch('handleError', {
    message: err.message || '发生未知错误',
    source: vm.$options.name || 'unknown',
    info: info
  });
};

// 创建 Vue 实例
new Vue({
  router,
  store,
  render: h => h(App),
  
  // 在挂载前初始化
  beforeMount() {
    // 动态加载高德地图脚本
    this.loadAMapScript();
  },
  
  methods: {
    loadAMapScript() {
      // 检查是否已加载
      if (window.AMap) {
        return;
      }
      
      const key = process.env.VUE_APP_AMAP_KEY || 'your_amap_key_here';
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `https://webapi.amap.com/maps?v=2.0&key=${key}&plugin=AMap.Geocoder,AMap.Driving,AMap.Walking,AMap.Transfer,AMap.CitySearch,AMap.Weather,AMap.ToolBar,AMap.Scale,AMap.Geolocation`;
      script.onerror = () => {
        console.error('高德地图脚本加载失败');
        store.dispatch('handleError', {
          message: '高德地图加载失败，部分功能可能无法使用'
        });
      };
      document.head.appendChild(script);
    }
  }
}).$mount('#app'); 