<template>
  <div class="chat-box">
    <div class="chat-history">
      <div v-for="(message, index) in messages" :key="index" class="message" :class="message.type">
        <div class="message-content">
          {{ message.content }}
        </div>
        <div v-if="message.location" class="message-location" @click="handleLocationClick(message.location)">
          <i class="el-icon-location"></i>
          {{ message.location.name }}
        </div>
      </div>
    </div>
    <div class="chat-input">
      <el-input
        v-model="inputMessage"
        placeholder="请输入您的问题，例如：北京有哪些景点？"
        @keyup.enter.native="sendMessage"
      >
        <el-button slot="append" icon="el-icon-s-promotion" @click="sendMessage">发送</el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatBox',
  data() {
    return {
      inputMessage: '',
      messages: []
    };
  },
  methods: {
    sendMessage() {
      if (!this.inputMessage.trim()) return;
      
      // 添加用户消息到聊天历史
      this.messages.push({
        content: this.inputMessage,
        type: 'user'
      });
      
      // 通过 Vuex action 发送消息到后端
      this.$store.dispatch('chat/sendMessage', this.inputMessage)
        .then(response => {
          // 添加系统回复到聊天历史
          this.messages.push({
            content: response.content,
            type: 'system',
            location: response.location
          });
          
          // 如果响应包含位置信息，更新地图
          if (response.location) {
            this.$store.commit('map/setCurrentLocation', response.location);
          }
        })
        .catch(error => {
          // 处理错误情况
          this.messages.push({
            content: '抱歉，我遇到了一些问题，无法回答您的问题。',
            type: 'system'
          });
          console.error('Error sending message:', error);
        });
      
      // 清空输入框
      this.inputMessage = '';
    },
    
    handleLocationClick(location) {
      // 当用户点击位置信息时，将地图居中显示该位置
      this.$store.commit('map/setCurrentLocation', location);
    }
  }
};
</script>

<style scoped>
.chat-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.chat-history {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.message {
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 4px;
  max-width: 80%;
}

.user {
  background-color: #ecf5ff;
  align-self: flex-end;
  margin-left: auto;
}

.system {
  background-color: #f5f7fa;
}

.message-content {
  word-break: break-word;
}

.message-location {
  margin-top: 5px;
  font-size: 12px;
  color: #409eff;
  cursor: pointer;
}

.message-location:hover {
  text-decoration: underline;
}

.chat-input {
  padding: 10px;
  border-top: 1px solid #ebeef5;
}
</style> 