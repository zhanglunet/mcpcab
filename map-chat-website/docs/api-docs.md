# API接口文档

本文档描述了地图对话网站的API接口设计。

## 接口基本信息

- 基础URL: `/api/v1`
- 响应格式: JSON
- 认证方式: API密钥（开发阶段不启用）

## 标准响应格式

```json
{
  "code": 200,          // 状态码，200表示成功，其他表示错误
  "message": "成功",     // 状态描述
  "data": {             // 返回数据
    // 具体数据内容
  }
}
```

## 位置服务接口

### 1. 地址转坐标

将详细地址转换为经纬度坐标。

- **URL**: `/location/geo`
- **方法**: POST
- **参数**:

```json
{
  "address": "北京市朝阳区阜通东大街6号",
  "city": "北京"  // 可选
}
```

- **响应**:

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "location": "116.483038,39.990633",
    "formatted_address": "北京市朝阳区阜通东大街6号"
  }
}
```

### 2. 坐标转地址

将经纬度坐标转换为结构化地址。

- **URL**: `/location/regeo`
- **方法**: POST
- **参数**:

```json
{
  "location": "116.483038,39.990633"
}
```

- **响应**:

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "formatted_address": "北京市朝阳区阜通东大街6号方恒国际中心",
    "province": "北京市",
    "city": "北京市",
    "district": "朝阳区",
    "street": "阜通东大街",
    "street_number": "6号"
  }
}
```

## 搜索服务接口

### 1. 关键词搜索

根据关键词搜索地点。

- **URL**: `/search/text`
- **方法**: POST
- **参数**:

```json
{
  "keywords": "咖啡厅",
  "city": "北京",  // 可选
  "page": 1,      // 可选，默认1
  "page_size": 20 // 可选，默认20
}
```

- **响应**:

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "total": 150,
    "page": 1,
    "page_size": 20,
    "results": [
      {
        "id": "B0FFFWT4HC",
        "name": "星巴克(颐堤港店)",
        "type": "餐饮服务;咖啡厅;咖啡厅",
        "address": "北京市朝阳区酒仙桥路18号颐堤港购物中心1层",
        "location": "116.49432,39.980183",
        "tel": "010-84260602"
      },
      // 更多结果...
    ]
  }
}
```

### 2. 周边搜索

搜索指定坐标周边的地点。

- **URL**: `/search/around`
- **方法**: POST
- **参数**:

```json
{
  "location": "116.483038,39.990633",
  "keywords": "超市",  // 可选
  "radius": 1000,     // 可选，搜索半径，默认1000米
  "page": 1,          // 可选，默认1
  "page_size": 20     // 可选，默认20
}
```

- **响应**:

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "total": 25,
    "page": 1,
    "page_size": 20,
    "results": [
      {
        "id": "B0FFJYXTKL",
        "name": "盒马鲜生(朝阳大悦城店)",
        "type": "购物服务;超市;超市",
        "address": "北京市朝阳区朝阳北路101号朝阳大悦城5F",
        "location": "116.484582,39.991508",
        "distance": 230,  // 距离中心点的距离，单位米
        "tel": "010-56683280"
      },
      // 更多结果...
    ]
  }
}
```

## 路径规划接口

### 1. 驾车路线规划

规划两点间的驾车路线。

- **URL**: `/direction/driving`
- **方法**: POST
- **参数**:

```json
{
  "origin": "116.483038,39.990633",
  "destination": "116.434446,39.90816"
}
```

- **响应**:

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "distance": 9735,  // 距离，单位米
    "duration": 1800,  // 时间，单位秒
    "tolls": 0,        // 过路费，单位元
    "steps": [
      {
        "instruction": "向东南方向行驶45米",
        "distance": 45,
        "duration": 10
      },
      // 更多步骤...
    ]
  }
}
```

### 2. 公交路线规划

规划两点间的公交路线。

- **URL**: `/direction/transit`
- **方法**: POST
- **参数**:

```json
{
  "origin": "116.483038,39.990633",
  "destination": "116.434446,39.90816",
  "city": "北京",
  "city_destination": "北京"  // 可选，跨城市时需要
}
```

- **响应**: (省略部分内容)

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "distance": 10500,  // 距离，单位米
    "duration": 3600,   // 时间，单位秒
    "routes": [
      {
        "segments": [
          {
            "type": "walk",
            "distance": 500,
            "duration": 600,
            "steps": []
          },
          {
            "type": "bus",
            "vehicle": "445路",
            "start_stop": "望京站",
            "end_stop": "大望路站",
            "stops_count": 8,
            "distance": 8000,
            "duration": 2400
          },
          // 更多路段...
        ]
      },
      // 更多方案...
    ]
  }
}
```

## 用户历史记录接口

### 1. 保存查询记录

保存用户的查询记录。

- **URL**: `/history/save`
- **方法**: POST
- **参数**:

```json
{
  "user_id": "user123",
  "query_text": "北京附近的咖啡厅",
  "query_location": "116.483038,39.990633",  // 可选
  "query_result": {}  // 可选，查询结果的摘要
}
```

- **响应**:

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "id": 12345
  }
}
```

### 2. 获取查询历史

获取用户的查询历史记录。

- **URL**: `/history/list`
- **方法**: GET
- **参数**:

```
user_id: user123
page: 1       // 可选，默认1
page_size: 20 // 可选，默认20
```

- **响应**:

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "total": 30,
    "page": 1,
    "page_size": 20,
    "records": [
      {
        "id": 12345,
        "query_text": "北京附近的咖啡厅",
        "query_time": "2025-04-20T10:30:00Z",
        "query_location": "116.483038,39.990633"
      },
      // 更多记录...
    ]
  }
}
```

## 错误码说明

- 200: 成功
- 400: 参数错误
- 401: 未授权
- 403: 权限不足
- 404: 资源不存在
- 500: 服务器错误
