import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 页面组件（懒加载方式导入）
const Home = () => import(/* webpackChunkName: "home" */ '../views/Home.vue');
const About = () => import(/* webpackChunkName: "about" */ '../views/About.vue');
const Help = () => import(/* webpackChunkName: "help" */ '../views/Help.vue');
const NotFound = () => import(/* webpackChunkName: "not-found" */ '../views/NotFound.vue');

// 路由配置
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页 - 地图对话'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '关于 - 地图对话'
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: Help,
    meta: {
      title: '帮助 - 地图对话'
    }
  },
  // 匹配所有未定义的路由，显示404页面
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '页面未找到 - 地图对话'
    }
  }
];

// 创建路由实例
const router = new VueRouter({
  mode: 'history', // 使用 HTML5 History 模式
  base: process.env.BASE_URL,
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // 如果存在保存的位置，恢复到该位置
      return savedPosition;
    } else {
      // 否则滚动到页面顶部
      return { x: 0, y: 0 };
    }
  }
});

// 全局导航守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title || '地图对话';
  next();
});

export default router; 