<template>
  <div class="map-display">
    <div id="map-container" ref="mapContainer"></div>
    <div class="map-controls" v-if="markers.length > 0">
      <el-button size="small" icon="el-icon-location" @click="centerOnCurrentLocation">定位当前位置</el-button>
      <el-button size="small" icon="el-icon-refresh-right" @click="resetMapView">重置视图</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapDisplay',
  data() {
    return {
      map: null,
      markers: [],
      infoWindow: null,
      defaultCenter: {
        lng: 116.397428,  // 默认为北京市中心
        lat: 39.90923
      },
      defaultZoom: 11
    };
  },
  computed: {
    currentLocation() {
      return this.$store.state.map.currentLocation;
    }
  },
  watch: {
    currentLocation(newLocation) {
      if (newLocation) {
        this.addMarker(newLocation);
        this.centerMapOn(newLocation);
      }
    }
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // 确保高德地图 JS API 已加载
      if (window.AMap) {
        this.createMapInstance();
      } else {
        // 如果高德地图 JS API 未加载，可以在这里动态加载
        console.error('AMap is not loaded. Please include the AMap script.');
      }
    },
    
    createMapInstance() {
      this.map = new AMap.Map(this.$refs.mapContainer, {
        center: [this.defaultCenter.lng, this.defaultCenter.lat],
        zoom: this.defaultZoom,
        resizeEnable: true
      });
      
      // 添加地图控件
      this.map.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
        this.map.addControl(new AMap.ToolBar());
        this.map.addControl(new AMap.Scale());
      });
      
      // 创建信息窗体
      this.infoWindow = new AMap.InfoWindow({
        closeWhenClickMap: true
      });
    },
    
    addMarker(location) {
      // 如果已经有标记，先清除
      this.clearMarkers();
      
      // 创建标记
      const marker = new AMap.Marker({
        position: [location.lng, location.lat],
        title: location.name
      });
      
      // 将标记添加到地图
      this.map.add(marker);
      this.markers.push(marker);
      
      // 绑定点击事件，显示信息窗体
      marker.on('click', () => {
        this.showInfoWindow(location, marker);
      });
      
      // 如果有详细信息，自动打开信息窗体
      if (location.address || location.description) {
        this.showInfoWindow(location, marker);
      }
    },
    
    showInfoWindow(location, marker) {
      let content = `<div class="info-window">
        <h3>${location.name}</h3>`;
      
      if (location.address) {
        content += `<p>地址：${location.address}</p>`;
      }
      
      if (location.description) {
        content += `<p>${location.description}</p>`;
      }
      
      content += '</div>';
      
      this.infoWindow.setContent(content);
      this.infoWindow.open(this.map, marker.getPosition());
    },
    
    clearMarkers() {
      if (this.markers.length > 0) {
        this.map.remove(this.markers);
        this.markers = [];
      }
      
      // 关闭信息窗体
      this.infoWindow.close();
    },
    
    centerMapOn(location) {
      this.map.setCenter([location.lng, location.lat]);
      this.map.setZoom(15);  // 设置适当的缩放级别
    },
    
    centerOnCurrentLocation() {
      if (this.currentLocation) {
        this.centerMapOn(this.currentLocation);
      }
    },
    
    resetMapView() {
      this.map.setCenter([this.defaultCenter.lng, this.defaultCenter.lat]);
      this.map.setZoom(this.defaultZoom);
    }
  }
};
</script>

<style scoped>
.map-display {
  position: relative;
  width: 100%;
  height: 100%;
}

#map-container {
  width: 100%;
  height: 100%;
}

.map-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 信息窗体样式 */
:deep(.info-window) {
  padding: 5px;
}

:deep(.info-window h3) {
  margin: 0 0 5px 0;
  color: #333;
}

:deep(.info-window p) {
  margin: 5px 0;
  color: #666;
  font-size: 12px;
}
</style> 