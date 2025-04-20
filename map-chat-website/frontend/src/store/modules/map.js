import api from '@/utils/api';

const state = {
  currentLocation: null,
  searchHistory: [],
  favoriteLocations: [],
  mapBounds: null,
  searchResults: []
};

const getters = {
  currentLocation: state => state.currentLocation,
  hasCurrentLocation: state => state.currentLocation !== null,
  searchHistory: state => state.searchHistory,
  favoriteLocations: state => state.favoriteLocations,
  searchResults: state => state.searchResults
};

const mutations = {
  setCurrentLocation(state, location) {
    state.currentLocation = location;
  },
  
  addToSearchHistory(state, location) {
    // 避免添加重复的位置
    const exists = state.searchHistory.some(
      item => item.lng === location.lng && item.lat === location.lat
    );
    
    if (!exists) {
      state.searchHistory.push(location);
      
      // 限制历史记录长度
      if (state.searchHistory.length > 20) {
        state.searchHistory.shift();
      }
    }
  },
  
  setSearchHistory(state, history) {
    state.searchHistory = history;
  },
  
  addToFavorites(state, location) {
    const exists = state.favoriteLocations.some(
      item => item.lng === location.lng && item.lat === location.lat
    );
    
    if (!exists) {
      state.favoriteLocations.push(location);
    }
  },
  
  removeFromFavorites(state, location) {
    state.favoriteLocations = state.favoriteLocations.filter(
      item => !(item.lng === location.lng && item.lat === location.lat)
    );
  },
  
  setFavoriteLocations(state, locations) {
    state.favoriteLocations = locations;
  },
  
  setMapBounds(state, bounds) {
    state.mapBounds = bounds;
  },
  
  setSearchResults(state, results) {
    state.searchResults = results;
  },
  
  clearSearchResults(state) {
    state.searchResults = [];
  }
};

const actions = {
  // 搜索地点
  async searchLocation({ commit, dispatch }, query) {
    try {
      commit('setLoading', true, { root: true });
      
      const results = await api.searchLocation(query);
      commit('setSearchResults', results);
      
      if (results.length > 0) {
        commit('setCurrentLocation', results[0]);
        commit('addToSearchHistory', results[0]);
      }
      
      commit('setLoading', false, { root: true });
      return results;
    } catch (error) {
      commit('setLoading', false, { root: true });
      dispatch('handleError', error, { root: true });
      return [];
    }
  },
  
  // 获取指定位置周边信息
  async searchAround({ commit, dispatch }, { location, keyword, radius }) {
    try {
      commit('setLoading', true, { root: true });
      
      const results = await api.searchAround(location, keyword, radius);
      commit('setSearchResults', results);
      
      commit('setLoading', false, { root: true });
      return results;
    } catch (error) {
      commit('setLoading', false, { root: true });
      dispatch('handleError', error, { root: true });
      return [];
    }
  },
  
  // 根据ID获取地点详情
  async getLocationDetail({ commit, dispatch }, id) {
    try {
      commit('setLoading', true, { root: true });
      
      const detail = await api.getLocationDetail(id);
      
      if (detail) {
        commit('setCurrentLocation', detail);
        commit('addToSearchHistory', detail);
      }
      
      commit('setLoading', false, { root: true });
      return detail;
    } catch (error) {
      commit('setLoading', false, { root: true });
      dispatch('handleError', error, { root: true });
      return null;
    }
  },
  
  // 加载位置搜索历史
  async loadSearchHistory({ commit }) {
    try {
      const history = await api.getSearchHistory();
      commit('setSearchHistory', history);
    } catch (error) {
      console.error('加载搜索历史失败:', error);
      commit('setSearchHistory', []);
    }
  },
  
  // 加载收藏位置
  async loadFavoriteLocations({ commit }) {
    try {
      const favorites = await api.getFavoriteLocations();
      commit('setFavoriteLocations', favorites);
    } catch (error) {
      console.error('加载收藏位置失败:', error);
      commit('setFavoriteLocations', []);
    }
  },
  
  // 收藏位置
  async addLocationToFavorites({ commit }, location) {
    try {
      await api.addToFavorites(location);
      commit('addToFavorites', location);
    } catch (error) {
      console.error('添加收藏位置失败:', error);
    }
  },
  
  // 取消收藏位置
  async removeLocationFromFavorites({ commit }, location) {
    try {
      await api.removeFromFavorites(location);
      commit('removeFromFavorites', location);
    } catch (error) {
      console.error('取消收藏位置失败:', error);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}; 