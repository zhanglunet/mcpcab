<template>
  <div class="not-found">
    <div class="not-found-container">
      <div class="error-code">404</div>
      <h1 class="error-title">页面不存在</h1>
      <p class="error-description">很抱歉，您访问的页面不存在或已被移除。</p>
      <div class="actions">
        <el-button type="primary" icon="el-icon-back" @click="$router.go(-1)">返回上一页</el-button>
        <el-button icon="el-icon-s-home" @click="$router.push('/')">回到首页</el-button>
      </div>
      <div class="illustration">
        <img src="../assets/404.svg" alt="页面不存在" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
};
</script>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 140px);
  padding: 20px;
}

.not-found-container {
  max-width: 600px;
  width: 100%;
  text-align: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.error-code {
  font-size: 80px;
  font-weight: bold;
  color: #409eff;
  line-height: 1;
  margin-bottom: 20px;
}

.error-title {
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
}

.error-description {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
}

.actions {
  margin-bottom: 30px;
}

.actions .el-button {
  margin: 0 10px;
}

.illustration {
  max-width: 300px;
  margin: 0 auto;
}

.illustration img {
  width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  .not-found-container {
    padding: 30px 20px;
  }
  
  .error-code {
    font-size: 60px;
  }
  
  .error-title {
    font-size: 24px;
  }
  
  .illustration {
    max-width: 200px;
  }
}
</style> 