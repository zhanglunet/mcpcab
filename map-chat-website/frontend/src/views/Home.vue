<template>
  <div class="home">
    <div class="map-chat-container">
      <div class="chat-panel">
        <ChatBox />
      </div>
      <div class="map-panel">
        <MapDisplay />
      </div>
    </div>
  </div>
</template>

<script>
import ChatBox from '@/components/ChatBox.vue';
import MapDisplay from '@/components/MapDisplay.vue';

export default {
  name: 'Home',
  components: {
    ChatBox,
    MapDisplay
  },
  created() {
    // 在组件创建时加载必要数据
    this.loadInitialData();
  },
  methods: {
    async loadInitialData() {
      try {
        // 加载聊天历史
        await this.$store.dispatch('chat/loadChatHistory');
        
        // 加载搜索历史
        await this.$store.dispatch('map/loadSearchHistory');
        
        // 加载收藏位置
        await this.$store.dispatch('map/loadFavoriteLocations');
      } catch (error) {
        console.error('加载初始数据失败:', error);
      }
    }
  }
};
</script>

<style scoped>
.home {
  height: calc(100vh - 140px); /* 减去头部和底部的高度 */
  padding: 0;
}

.map-chat-container {
  display: flex;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.chat-panel {
  flex: 0 0 35%;
  height: 100%;
  background-color: #fff;
  border-right: 1px solid #ebeef5;
}

.map-panel {
  flex: 0 0 65%;
  height: 100%;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .map-chat-container {
    flex-direction: column;
  }
  
  .chat-panel {
    flex: 0 0 40%;
    border-right: none;
    border-bottom: 1px solid #ebeef5;
  }
  
  .map-panel {
    flex: 0 0 60%;
  }
}

@media (max-width: 768px) {
  .home {
    height: calc(100vh - 120px);
  }
}
</style> 