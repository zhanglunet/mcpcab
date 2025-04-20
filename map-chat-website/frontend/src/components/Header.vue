<template>
  <header class="site-header">
    <div class="header-container">
      <div class="logo">
        <img src="../assets/logo.png" alt="地图对话" class="logo-image" />
        <h1 class="site-title">地图对话</h1>
      </div>
      <div class="navigation">
        <el-menu mode="horizontal" :router="true" default-active="1" class="nav-menu">
          <el-menu-item index="1" route="/">首页</el-menu-item>
          <el-menu-item index="2" route="/about">关于</el-menu-item>
          <el-menu-item index="3" route="/help">帮助</el-menu-item>
        </el-menu>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
};
</script>

<style scoped>
.site-header {
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-image {
  height: 40px;
  margin-right: 10px;
}

.site-title {
  font-size: 20px;
  margin: 0;
  color: #409eff;
}

.navigation {
  display: flex;
  align-items: center;
}

.nav-menu {
  border-bottom: none;
}

@media (max-width: 768px) {
  .site-title {
    font-size: 18px;
  }
  
  .logo-image {
    height: 30px;
  }
}
</style> 