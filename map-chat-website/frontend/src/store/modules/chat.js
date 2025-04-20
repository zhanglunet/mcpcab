import api from '@/utils/api';

const state = {
  messages: [],
  chatHistory: [],
  isProcessing: false
};

const getters = {
  allMessages: state => state.messages,
  recentMessages: state => state.messages.slice(-10),
  chatHistory: state => state.chatHistory,
  isProcessing: state => state.isProcessing
};

const mutations = {
  addMessage(state, message) {
    state.messages.push(message);
  },
  
  setMessages(state, messages) {
    state.messages = messages;
  },
  
  setChatHistory(state, history) {
    state.chatHistory = history;
  },
  
  addToChatHistory(state, query) {
    state.chatHistory.push(query);
    
    // 只保留最近的10条历史记录
    if (state.chatHistory.length > 10) {
      state.chatHistory.shift();
    }
  },
  
  setProcessing(state, isProcessing) {
    state.isProcessing = isProcessing;
  },
  
  clearMessages(state) {
    state.messages = [];
  }
};

const actions = {
  // 发送消息到后端
  async sendMessage({ commit, dispatch }, messageText) {
    // 设置正在处理状态
    commit('setProcessing', true);
    
    try {
      // 将查询添加到历史记录
      commit('addToChatHistory', messageText);
      
      // 调用API发送消息
      const response = await api.sendChatMessage(messageText);
      
      // 处理完成
      commit('setProcessing', false);
      
      return response;
    } catch (error) {
      commit('setProcessing', false);
      dispatch('handleError', error, { root: true });
      throw error;
    }
  },
  
  // 加载历史消息
  async loadChatHistory({ commit }) {
    try {
      const history = await api.getChatHistory();
      commit('setChatHistory', history);
    } catch (error) {
      console.error('加载聊天历史失败:', error);
      commit('setChatHistory', []);
    }
  },
  
  // 清空当前对话
  clearChat({ commit }) {
    commit('clearMessages');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}; 