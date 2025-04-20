import axios from 'axios';

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000
});

// 请求拦截器
apiClient.interceptors.request.use(
  config => {
    // 在发送请求前做些什么
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response.data;
  },
  error => {
    // 对响应错误做点什么
    console.error('API 请求错误:', error);
    
    // 处理特定错误状态码
    if (error.response) {
      const { status, data } = error.response;
      
      if (status === 401) {
        // 未授权处理
        console.log('未授权访问，请先登录');
      } else if (status === 404) {
        // 资源不存在
        console.log('请求的资源不存在');
      } else if (status === 500) {
        // 服务器错误
        console.log('服务器错误，请稍后再试');
      }
      
      // 返回服务器提供的错误信息
      return Promise.reject(data.error || data || error);
    }
    
    return Promise.reject(error);
  }
);

// API 功能封装
export default {
  // 聊天相关 API
  sendChatMessage(message) {
    return apiClient.post('/chat/message', { message });
  },
  
  getChatHistory() {
    return apiClient.get('/chat/history');
  },
  
  // 地图相关 API
  searchLocation(query) {
    return apiClient.get('/map/search', { params: { query } });
  },
  
  searchAround(location, keyword, radius = 1000) {
    return apiClient.get('/map/around', {
      params: {
        location: `${location.lng},${location.lat}`,
        keyword,
        radius
      }
    });
  },
  
  getLocationDetail(id) {
    return apiClient.get(`/map/detail/${id}`);
  },
  
  // 用户数据相关 API
  getSearchHistory() {
    return apiClient.get('/user/search-history');
  },
  
  getFavoriteLocations() {
    return apiClient.get('/user/favorites');
  },
  
  addToFavorites(location) {
    return apiClient.post('/user/favorites', location);
  },
  
  removeFromFavorites(location) {
    return apiClient.delete('/user/favorites', { data: location });
  },
  
  // 路线规划相关 API
  getWalkingRoute(origin, destination) {
    return apiClient.get('/map/route/walking', {
      params: {
        origin: `${origin.lng},${origin.lat}`,
        destination: `${destination.lng},${destination.lat}`
      }
    });
  },
  
  getDrivingRoute(origin, destination) {
    return apiClient.get('/map/route/driving', {
      params: {
        origin: `${origin.lng},${origin.lat}`,
        destination: `${destination.lng},${destination.lat}`
      }
    });
  },
  
  getTransitRoute(origin, destination, city, destinationCity) {
    return apiClient.get('/map/route/transit', {
      params: {
        origin: `${origin.lng},${origin.lat}`,
        destination: `${destination.lng},${destination.lat}`,
        city,
        destinationCity
      }
    });
  },
  
  getBicyclingRoute(origin, destination) {
    return apiClient.get('/map/route/bicycling', {
      params: {
        origin: `${origin.lng},${origin.lat}`,
        destination: `${destination.lng},${destination.lat}`
      }
    });
  },
  
  // 天气相关 API
  getWeather(city) {
    return apiClient.get('/map/weather', { params: { city } });
  }
}; 