<template>
  <div class="about">
    <div class="about-container">
      <h1 class="about-title">关于地图对话</h1>
      
      <div class="about-section">
        <h2>项目介绍</h2>
        <p>地图对话是一个基于高德地图 API 的智能位置问答系统，旨在帮助用户通过自然语言交流获取地理位置相关信息。无论是查询特定地点、探索周边设施，还是规划出行路线，地图对话都能以对话方式为您提供便捷的地图服务。</p>
      </div>
      
      <div class="about-section">
        <h2>主要功能</h2>
        <el-card class="feature-card" shadow="hover">
          <div slot="header">
            <i class="el-icon-location-information"></i>
            <span>位置查询</span>
          </div>
          <p>通过自然语言查询任意位置，如"北京故宫在哪里"、"杭州西湖的地址是什么"等。</p>
        </el-card>
        
        <el-card class="feature-card" shadow="hover">
          <div slot="header">
            <i class="el-icon-discover"></i>
            <span>周边搜索</span>
          </div>
          <p>查询指定位置周边的设施和服务，如"北京三里屯附近的咖啡馆"、"我附近的加油站"等。</p>
        </el-card>
        
        <el-card class="feature-card" shadow="hover">
          <div slot="header">
            <i class="el-icon-guide"></i>
            <span>路线规划</span>
          </div>
          <p>获取不同出行方式的路线规划，如"从北京站到天安门怎么走"、"骑自行车从西湖到灵隐寺的路线"等。</p>
        </el-card>
        
        <el-card class="feature-card" shadow="hover">
          <div slot="header">
            <i class="el-icon-sunrise"></i>
            <span>天气查询</span>
          </div>
          <p>了解指定城市的天气情况，如"杭州今天的天气怎么样"、"北京明天会下雨吗"等。</p>
        </el-card>
      </div>
      
      <div class="about-section">
        <h2>技术支持</h2>
        <p>地图对话基于以下技术开发：</p>
        <ul class="tech-list">
          <li><strong>前端框架：</strong>Vue.js</li>
          <li><strong>UI组件库：</strong>Element UI</li>
          <li><strong>后端框架：</strong>Flask</li>
          <li><strong>地图服务：</strong>高德地图 API</li>
          <li><strong>数据库：</strong>MySQL</li>
        </ul>
      </div>
      
      <div class="about-section">
        <h2>联系我们</h2>
        <p>如果您有任何问题、建议或合作意向，请通过以下方式联系我们：</p>
        <p><i class="el-icon-message"></i> 邮箱：contact@map-chat.example.com</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
};
</script>

<style scoped>
.about {
  padding: 20px 0;
}

.about-container {
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.about-title {
  text-align: center;
  color: #409eff;
  margin-bottom: 30px;
  font-size: 28px;
}

.about-section {
  margin-bottom: 30px;
}

.about-section h2 {
  color: #333;
  margin-bottom: 15px;
  font-size: 22px;
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 10px;
}

.about-section p {
  line-height: 1.6;
  margin-bottom: 15px;
}

.feature-card {
  margin-bottom: 20px;
}

.feature-card .el-card__header {
  display: flex;
  align-items: center;
  font-weight: bold;
}

.feature-card .el-card__header i {
  margin-right: 10px;
  color: #409eff;
}

.tech-list {
  list-style-type: none;
  padding-left: 0;
}

.tech-list li {
  margin-bottom: 10px;
  padding-left: 20px;
  position: relative;
}

.tech-list li:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #409eff;
}

@media (max-width: 768px) {
  .about-container {
    padding: 20px;
  }
  
  .about-title {
    font-size: 24px;
  }
  
  .about-section h2 {
    font-size: 20px;
  }
}
</style> 