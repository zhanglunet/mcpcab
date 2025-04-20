<template>
  <div id="app">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
};
</script>

<style>
/* 全局样式 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 16px;
  color: #333;
  background-color: #f8f9fa;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
}

/* 全局辅助类 */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.text-center {
  text-align: center;
}

.mb-10 {
  margin-bottom: 10px;
}

.mb-20 {
  margin-bottom: 20px;
}

.mt-10 {
  margin-top: 10px;
}

.mt-20 {
  margin-top: 20px;
}

/* Element UI 自定义样式 */
.el-button--primary {
  background-color: #409eff;
  border-color: #409eff;
}

.el-button--primary:hover,
.el-button--primary:focus {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

/* 高亮类 */
.highlight {
  color: #409eff;
  font-weight: bold;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    padding: 10px;
  }
}
</style> 