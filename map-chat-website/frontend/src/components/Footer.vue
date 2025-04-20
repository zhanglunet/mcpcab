<template>
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-logo">
          <h3>地图对话</h3>
          <p>基于高德地图的智能位置问答系统</p>
        </div>
        <div class="footer-links">
          <h4>链接</h4>
          <ul>
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/about">关于</router-link></li>
            <li><router-link to="/help">帮助</router-link></li>
          </ul>
        </div>
        <div class="footer-contact">
          <h4>联系我们</h4>
          <p>邮箱：contact@map-chat.example.com</p>
        </div>
      </div>
      <div class="footer-copyright">
        <p>&copy; {{ new Date().getFullYear() }} 地图对话. 保留所有权利.</p>
        <p>技术支持：高德地图 API</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style scoped>
.site-footer {
  background-color: #f5f7fa;
  padding: 30px 0;
  color: #606266;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
}

.footer-logo {
  flex: 0 0 30%;
}

.footer-logo h3 {
  margin-top: 0;
  color: #409eff;
}

.footer-links, .footer-contact {
  flex: 0 0 30%;
}

.footer-links h4, .footer-contact h4 {
  margin-top: 0;
  color: #303133;
}

.footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: #606266;
  text-decoration: none;
}

.footer-links a:hover {
  color: #409eff;
}

.footer-copyright {
  border-top: 1px solid #dcdfe6;
  padding-top: 20px;
  text-align: center;
  font-size: 12px;
}

@media (max-width: 768px) {
  .footer-logo, .footer-links, .footer-contact {
    flex: 0 0 100%;
    margin-bottom: 20px;
  }
  
  .footer-content {
    flex-direction: column;
  }
}
</style> 