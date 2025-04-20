/**
 * 地图工具函数集
 * 封装高德地图相关的辅助函数
 */

/**
 * 根据两个坐标点计算距离（单位：米）
 * @param {Object} point1 - 第一个坐标点 {lng, lat}
 * @param {Object} point2 - 第二个坐标点 {lng, lat}
 * @returns {Number} 距离（米）
 */
export function calculateDistance(point1, point2) {
  if (window.AMap && window.AMap.GeometryUtil) {
    const p1 = new AMap.LngLat(point1.lng, point1.lat);
    const p2 = new AMap.LngLat(point2.lng, point2.lat);
    return AMap.GeometryUtil.distance([p1], [p2]);
  } else {
    // 如果高德地图 API 未加载，使用简单的距离计算（不够精确）
    const radLat1 = (point1.lat * Math.PI) / 180;
    const radLat2 = (point2.lat * Math.PI) / 180;
    const a = radLat1 - radLat2;
    const b = (point1.lng * Math.PI) / 180 - (point2.lng * Math.PI) / 180;
    const s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    const earthRadius = 6378137; // 地球半径（米）
    return s * earthRadius;
  }
}

/**
 * 格式化距离显示
 * @param {Number} distance - 距离（米）
 * @returns {String} 格式化后的距离
 */
export function formatDistance(distance) {
  if (distance < 1000) {
    return `${Math.round(distance)}米`;
  } else {
    return `${(distance / 1000).toFixed(1)}公里`;
  }
}

/**
 * 格式化时间显示（秒 -> 分钟+秒）
 * @param {Number} seconds - 秒数
 * @returns {String} 格式化后的时间
 */
export function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  
  if (minutes === 0) {
    return `${remainingSeconds}秒`;
  } else if (remainingSeconds === 0) {
    return `${minutes}分钟`;
  } else {
    return `${minutes}分钟${remainingSeconds}秒`;
  }
}

/**
 * 获取两点之间的方向描述
 * @param {Object} from - 起点坐标 {lng, lat}
 * @param {Object} to - 终点坐标 {lng, lat}
 * @returns {String} 方向描述
 */
export function getDirection(from, to) {
  const dx = to.lng - from.lng;
  const dy = to.lat - from.lat;
  
  // 计算角度（0度为正东方向，顺时针旋转）
  let angle = Math.atan2(dy, dx) * 180 / Math.PI;
  if (angle < 0) {
    angle += 360;
  }
  
  // 将角度转换为方向描述
  if (angle >= 337.5 || angle < 22.5) {
    return '东';
  } else if (angle >= 22.5 && angle < 67.5) {
    return '东北';
  } else if (angle >= 67.5 && angle < 112.5) {
    return '北';
  } else if (angle >= 112.5 && angle < 157.5) {
    return '西北';
  } else if (angle >= 157.5 && angle < 202.5) {
    return '西';
  } else if (angle >= 202.5 && angle < 247.5) {
    return '西南';
  } else if (angle >= 247.5 && angle < 292.5) {
    return '南';
  } else {
    return '东南';
  }
}

/**
 * 获取POI类型的中文描述
 * @param {String} poiType - POI类型代码
 * @returns {String} 类型中文描述
 */
export function getPoiTypeDescription(poiType) {
  const typeMap = {
    '010000': '交通设施服务',
    '020000': '汽车服务',
    '030000': '餐饮服务',
    '040000': '购物服务',
    '050000': '生活服务',
    '060000': '住宿服务',
    '070000': '休闲娱乐服务',
    '080000': '运动健身服务',
    '090000': '医疗保健服务',
    '100000': '教育文化服务',
    '110000': '公司企业',
    '120000': '金融保险服务',
    '130000': '政府机构及社会团体',
    '140000': '科教文化服务',
    '150000': '住宅区',
    '160000': '自然地物',
    '170000': '行政区划',
    '180000': '道路交通设施',
    '190000': '公共设施',
    '200000': '其他'
  };
  
  // 如果提供了完整代码，直接查找
  if (typeMap[poiType]) {
    return typeMap[poiType];
  }
  
  // 如果是子类型，查找其父类型
  const parentType = poiType.substring(0, 6);
  return typeMap[parentType] || '未知类型';
}

/**
 * 解析高德地图POI结果为标准格式
 * @param {Object} poiData - 高德地图POI数据
 * @returns {Object} 标准格式的位置信息
 */
export function parsePoiData(poiData) {
  // 确保poiData存在
  if (!poiData) return null;
  
  // 提取经纬度
  let lng = 0, lat = 0;
  if (poiData.location) {
    const location = poiData.location.split(',');
    lng = parseFloat(location[0]);
    lat = parseFloat(location[1]);
  } else if (poiData.longitude && poiData.latitude) {
    lng = parseFloat(poiData.longitude);
    lat = parseFloat(poiData.latitude);
  }
  
  // 返回标准格式的位置信息
  return {
    id: poiData.id || '',
    name: poiData.name || '未命名位置',
    lng,
    lat,
    address: poiData.address || '',
    distance: poiData.distance || 0,
    type: getPoiTypeDescription(poiData.type || ''),
    tel: poiData.tel || '',
    province: poiData.pname || '',
    city: poiData.cityname || '',
    district: poiData.adname || '',
    description: ''
  };
}

/**
 * 解析高德地图路线规划结果
 * @param {Object} routeData - 高德地图路线规划数据
 * @returns {Object} 标准格式的路线信息
 */
export function parseRouteData(routeData) {
  // 确保routeData存在且包含路径信息
  if (!routeData || !routeData.paths || routeData.paths.length === 0) {
    return null;
  }
  
  // 获取第一条路径（通常是最优路径）
  const path = routeData.paths[0];
  
  // 提取路径信息
  return {
    distance: path.distance || 0, // 距离（米）
    duration: path.duration || 0, // 时间（秒）
    formattedDistance: formatDistance(path.distance || 0),
    formattedDuration: formatDuration(path.duration || 0),
    steps: path.steps || [], // 路径步骤
    restriction: path.restriction || {} // 路径限制信息
  };
}

/**
 * 生成可供高德地图使用的点标记样式
 * @param {String} type - 点的类型（如 'start', 'end', 'waypoint'）
 * @returns {Object} 点标记样式配置
 */
export function createMarkerStyle(type) {
  const baseStyle = {
    offset: new AMap.Pixel(-13, -30), // 图标偏移量
    size: new AMap.Size(26, 34),      // 图标大小
    imageSize: new AMap.Size(26, 34)   // 图片大小
  };
  
  switch (type) {
    case 'start':
      return {
        ...baseStyle,
        image: require('@/assets/marker-start.png'),
        imageOffset: new AMap.Pixel(0, 0)
      };
    case 'end':
      return {
        ...baseStyle,
        image: require('@/assets/marker-end.png'),
        imageOffset: new AMap.Pixel(0, 0)
      };
    case 'waypoint':
      return {
        ...baseStyle,
        image: require('@/assets/marker-waypoint.png'),
        imageOffset: new AMap.Pixel(0, 0)
      };
    default:
      return {
        ...baseStyle,
        image: require('@/assets/marker-default.png'),
        imageOffset: new AMap.Pixel(0, 0)
      };
  }
}

/**
 * 获取地图缩放层级
 * @param {Number} radius - 半径（米）
 * @returns {Number} 地图缩放层级
 */
export function getZoomLevel(radius) {
  if (radius <= 100) return 18;
  if (radius <= 200) return 17;
  if (radius <= 500) return 16;
  if (radius <= 1000) return 15;
  if (radius <= 2000) return 14;
  if (radius <= 5000) return 13;
  if (radius <= 10000) return 12;
  if (radius <= 20000) return 11;
  if (radius <= 50000) return 10;
  if (radius <= 100000) return 9;
  if (radius <= 200000) return 8;
  if (radius <= 500000) return 7;
  if (radius <= 1000000) return 6;
  return 5;
} 