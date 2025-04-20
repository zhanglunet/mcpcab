<template>
  <div class="help">
    <div class="help-container">
      <h1 class="help-title">使用帮助</h1>
      
      <div class="help-section">
        <el-collapse accordion>
          <el-collapse-item name="1">
            <template slot="title">
              <h3 class="collapse-title"><i class="el-icon-question"></i> 如何使用地图对话？</h3>
            </template>
            <div class="collapse-content">
              <p>使用地图对话非常简单，只需在对话框中输入您的问题或需求，然后点击发送按钮或按下回车键即可。系统会理解您的自然语言输入，并提供相关的地图信息和可视化展示。</p>
              <p>例如，您可以输入：</p>
              <ul>
                <li>"北京故宫在哪里？"</li>
                <li>"我想去上海外滩，从人民广场怎么走？"</li>
                <li>"杭州西湖附近有什么好吃的？"</li>
              </ul>
            </div>
          </el-collapse-item>
          
          <el-collapse-item name="2">
            <template slot="title">
              <h3 class="collapse-title"><i class="el-icon-location"></i> 如何查询特定位置？</h3>
            </template>
            <div class="collapse-content">
              <p>要查询特定位置的信息，您可以直接询问该位置的名称，系统会返回位置的详细信息并在地图上标记。</p>
              <p>示例查询：</p>
              <ul>
                <li>"天安门在哪里？"</li>
                <li>"杭州西湖的具体位置是什么？"</li>
                <li>"上海迪士尼乐园的地址是什么？"</li>
              </ul>
            </div>
          </el-collapse-item>
          
          <el-collapse-item name="3">
            <template slot="title">
              <h3 class="collapse-title"><i class="el-icon-discover"></i> 如何搜索周边设施？</h3>
            </template>
            <div class="collapse-content">
              <p>您可以询问特定位置周边的设施或服务，系统会搜索并展示结果。</p>
              <p>示例查询：</p>
              <ul>
                <li>"北京三里屯附近的咖啡馆"</li>
                <li>"杭州西湖周边的酒店"</li>
                <li>"我附近的加油站"（需要授权位置权限）</li>
                <li>"上海交通大学附近1公里内的餐厅"</li>
              </ul>
            </div>
          </el-collapse-item>
          
          <el-collapse-item name="4">
            <template slot="title">
              <h3 class="collapse-title"><i class="el-icon-guide"></i> 如何规划路线？</h3>
            </template>
            <div class="collapse-content">
              <p>您可以询问从一个地点到另一个地点的路线，系统会为您提供详细的路线规划。</p>
              <p>示例查询：</p>
              <ul>
                <li>"从北京站到天安门怎么走？"</li>
                <li>"从杭州西湖到灵隐寺的公交路线"</li>
                <li>"开车从上海外滩到东方明珠的路线"</li>
                <li>"步行从人民广场到南京路的路线"</li>
              </ul>
            </div>
          </el-collapse-item>
          
          <el-collapse-item name="5">
            <template slot="title">
              <h3 class="collapse-title"><i class="el-icon-sunrise"></i> 如何查询天气信息？</h3>
            </template>
            <div class="collapse-content">
              <p>您可以询问特定城市的天气情况，系统会为您提供最新的天气信息。</p>
              <p>示例查询：</p>
              <ul>
                <li>"北京今天的天气怎么样？"</li>
                <li>"杭州明天会下雨吗？"</li>
                <li>"上海未来三天的天气预报"</li>
              </ul>
            </div>
          </el-collapse-item>
          
          <el-collapse-item name="6">
            <template slot="title">
              <h3 class="collapse-title"><i class="el-icon-warning"></i> 常见问题解答</h3>
            </template>
            <div class="collapse-content">
              <h4>为什么系统无法理解我的问题？</h4>
              <p>请尝试使用更清晰、简洁的语言描述您的需求，避免使用过于复杂或模糊的表达。如果问题仍然存在，可以尝试换一种表述方式。</p>
              
              <h4>为什么地图上没有显示我想要的位置？</h4>
              <p>可能是由于位置名称不够准确或系统数据库中没有该位置的信息。尝试提供更准确的位置名称或地址，或者使用经纬度坐标。</p>
              
              <h4>如何授权我的位置信息？</h4>
              <p>当您使用"我附近"等相关查询时，浏览器会请求获取您的位置权限。请在浏览器弹出的权限请求对话框中点击"允许"。</p>
              
              <h4>我可以保存常用位置吗？</h4>
              <p>目前系统会自动记录您的搜索历史，但暂不支持手动保存常用位置功能。我们正在开发这一功能，敬请期待。</p>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      
      <div class="help-section">
        <h2>使用技巧</h2>
        <el-card class="tip-card" shadow="hover">
          <div slot="header">
            <i class="el-icon-star-on"></i>
            <span>精确查询</span>
          </div>
          <p>使用完整的地点名称可以获得更准确的结果，例如使用"北京故宫博物院"而不是简单的"故宫"。</p>
        </el-card>
        
        <el-card class="tip-card" shadow="hover">
          <div slot="header">
            <i class="el-icon-star-on"></i>
            <span>组合查询</span>
          </div>
          <p>您可以在一个问题中组合多种需求，例如"北京三里屯附近的咖啡馆怎么走"。</p>
        </el-card>
        
        <el-card class="tip-card" shadow="hover">
          <div slot="header">
            <i class="el-icon-star-on"></i>
            <span>上下文理解</span>
          </div>
          <p>系统能理解上下文，例如在查询完"北京故宫"后，可以直接问"附近有什么好吃的"，无需重复提及故宫。</p>
        </el-card>
      </div>
      
      <div class="help-section">
        <h2>联系客服</h2>
        <p>如果您在使用过程中遇到任何问题，或有改进建议，请随时联系我们的客服团队：</p>
        <p><i class="el-icon-message"></i> 邮箱：support@map-chat.example.com</p>
        <p><i class="el-icon-phone"></i> 电话：400-123-4567（工作日 9:00-18:00）</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Help'
};
</script>

<style scoped>
.help {
  padding: 20px 0;
}

.help-container {
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.help-title {
  text-align: center;
  color: #409eff;
  margin-bottom: 30px;
  font-size: 28px;
}

.help-section {
  margin-bottom: 30px;
}

.help-section h2 {
  color: #333;
  margin-bottom: 15px;
  font-size: 22px;
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 10px;
}

.collapse-title {
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.collapse-title i {
  margin-right: 8px;
  color: #409eff;
}

.collapse-content {
  padding: 10px 20px;
  color: #666;
  line-height: 1.6;
}

.collapse-content h4 {
  margin: 15px 0 5px;
  color: #333;
}

.collapse-content ul {
  margin: 10px 0;
  padding-left: 20px;
}

.collapse-content li {
  margin-bottom: 5px;
}

.tip-card {
  margin-bottom: 15px;
}

.tip-card .el-card__header {
  display: flex;
  align-items: center;
  font-weight: bold;
}

.tip-card .el-card__header i {
  margin-right: 10px;
  color: #409eff;
}

@media (max-width: 768px) {
  .help-container {
    padding: 20px;
  }
  
  .help-title {
    font-size: 24px;
  }
  
  .help-section h2 {
    font-size: 20px;
  }
}
</style> 