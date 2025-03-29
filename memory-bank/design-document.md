### 关键要点
- 可以使用 Cursor 调用百度地图 MCP 服务器，创建一个网页，输入起点、终点和中间地点，自动规划徒步旅行路线，并显示地图和文字规划。
- 研究表明，百度地图 MCP 服务器支持地理编码、地点搜索、路线规划和天气查询，适合开发导航和位置服务应用。
- 设计架构包括前端（HTML/JavaScript）和后端（Python），使用 MCP 服务器进行地理编码和路线规划，前端使用百度地图 JavaScript API 显示地图和路线。

---

### 前端设计
**用户界面：**
- 网页包含一个表单，允许用户输入起点地址、终点地址和任意多个中间地址（可通过文本区域输入，每行一个地址）。
- 提交按钮触发路线规划。
- 显示地图的区域，使用百度地图 JavaScript API 渲染路线。
- 显示文字方向的区域，列出步行路线的详细步骤。

**功能实现：**
- JavaScript 处理表单提交，通过 AJAX 请求后端获取路线数据。
- 使用百度地图 API 初始化地图并绘制路线。
- 显示路线文字说明。

---

### 后端设计
**功能：**
- 使用 Flask 框架（Python）接收用户输入的地址。
- 调用 MCP 服务器的 `geocode` 函数将地址转换为坐标。
- 调用 MCP 服务器的 `route_planning` 函数，模式设为“步行”，规划连接所有点的路线。
- 将路线数据（坐标和方向）以 JSON 格式返回给前端。

**示例代码：**
```python
from flask import Flask, request, jsonify
from mcp import baidu_map

app = Flask(__name__)

def geocode(address):
    return baidu_map.geocode(address)

def plan_route(start, end, waypoints, mode='walking'):
    return baidu_map.route_planning(start, end, waypoints=waypoints, mode=mode)

def get_coordinates(addresses):
    return [geocode(address) for address in addresses]

def get_route_data(start, end, intermediates):
    start_coord = geocode(start)
    end_coord = geocode(end)
    waypoints_coords = get_coordinates(intermediates)
    route = plan_route(start_coord, end_coord, waypoints_coords)
    return route

@app.route('/plan_route', methods=['POST'])
def plan_route_endpoint():
    data = request.get_json()
    start = data['start']
    end = data['end']
    intermediates = data['intermediates']
    route_data = get_route_data(start, end, intermediates)
    return jsonify(route_data)

if __name__ == '__main__':
    app.run()
```

---

---

### 详细报告：使用 Cursor 调用百度地图 MCP 服务器设计徒步旅行路线网页

#### 引言
本报告详细分析如何使用 Cursor 调用百度地图 MCP 服务器，设计一个网页，允许用户输入起点、终点和任意多个中间地点，自动规划一条特种兵徒步旅行的路线，并显示地图和文字规划。报告包括设计架构、功能实现和相关技术细节，适合开发者参考。

#### 背景信息
MCP（模型上下文协议）是一种开放标准，旨在让 AI 模型与外部数据和工具连接。百度地图 MCP 服务器是国内首家兼容该协议的地图服务商，提供地理编码、反向地理编码、地点搜索、路线规划和天气查询等功能。通过 Cursor，这款 AI 驱动的代码编辑器，可以无缝整合这些功能，扩展开发能力。

根据 [mcp.so 服务器页面](https://mcp.so/en/server/baidu-map/baidu-maps)，百度地图 MCP 服务器支持 10 个核心 API，包括 `map_geocode`、`map_reverse_geocode`、`map_search_places`、`map_place_details`、`map_distance_matrix`、`map_directions`、`map_weather`、`map_ip_location`、`map_road_traffic` 和 `map_poi_extract`。这些 API 适合开发导航和位置服务应用，特别适合中国市场。

#### 设计架构
为了实现用户需求，设计了一个包含前端和后端的网页系统，具体架构如下：

##### 前端（HTML/JavaScript）
- **用户界面：**
  - 表单包括：
    - 起点地址输入框。
    - 终点地址输入框。
    - 中间地址文本区域，允许用户按行输入多个地址。
    - 提交按钮，触发路线规划。
  - 地图显示区域，使用 `<div id="map"></div>` 渲染路线。
  - 方向显示区域，使用 `<div id="directions"></div>` 列出步行路线的详细步骤。

- **功能实现：**
  - JavaScript 处理表单提交事件，获取用户输入的地址。
  - 通过 AJAX 请求后端 `/plan_route` 端点，获取路线数据。
  - 使用百度地图 JavaScript API 初始化地图，绘制路线。
  - 解析路线数据，显示文字方向。

  示例 HTML 代码：
  ```html
  <form id="route-form">
      Start Address: <input type="text" id="start" name="start"><br>
      End Address: <input type="text" id="end" name="end"><br>
      Intermediate Addresses:<br>
      <textarea id="intermediates" name="intermediates"></textarea><br>
      <button type="submit">Plan Route</button>
  </form>
  <div id="map"></div>
  <div id="directions"></div>
  ```

  示例 JavaScript 代码：
  ```javascript
  document.getElementById('route-form').addEventListener('submit', function(e) {
      e.preventDefault();
      var start = document.getElementById('start').value;
      var end = document.getElementById('end').value;
      var intermediates = document.getElementById('intermediates').value.split('\n');
      fetch('/plan_route', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({start: start, end: end, intermediates: intermediates})
      })
      .then(response => response.json())
      .then(data => {
          // 初始化百度地图并显示路线
          // ...
          // 显示文字方向
          // ...
      });
  });
  ```

##### 后端（Python）
- **功能：**
  - 使用 Flask 框架接收用户输入的地址。
  - 调用 MCP 服务器的 `geocode` 函数将地址转换为坐标。
  - 调用 MCP 服务器的 `route_planning` 函数，模式设为“步行”（`mode='walking'`），规划连接所有点的路线。
  - 将路线数据（坐标和方向）以 JSON 格式返回给前端。

- **实现细节：**
  - 需要确保 MCP 服务器已配置好，API 密钥（AK）从 [百度地图开放平台](https://lbsyun.baidu.com/apiconsole/key) 获取。
  - 坐标系统使用 gcj02ll，详情见 [坐标系统文档](https://lbsyun.baidu.com/index.php?title=coordinate)。
  - 路线规划支持多个途经点（waypoints），适合连接起点、终点和中间地点。

  示例 Python 代码：
  ```python
  from flask import Flask, request, jsonify
  from mcp import baidu_map

  app = Flask(__name__)

  def geocode(address):
      return baidu_map.geocode(address)

  def plan_route(start, end, waypoints, mode='walking'):
      return baidu_map.route_planning(start, end, waypoints=waypoints, mode=mode)

  def get_coordinates(addresses):
      return [geocode(address) for address in addresses]

  def get_route_data(start, end, intermediates):
      start_coord = geocode(start)
      end_coord = geocode(end)
      waypoints_coords = get_coordinates(intermediates)
      route = plan_route(start_coord, end_coord, waypoints_coords)
      return route

  @app.route('/plan_route', methods=['POST'])
  def plan_route_endpoint():
      data = request.get_json()
      start = data['start']
      end = data['end']
      intermediates = data['intermediates']
      route_data = get_route_data(start, end, intermediates)
      return jsonify(route_data)

  if __name__ == '__main__':
      app.run()
  ```

##### 地图和路线显示
- 前端使用百度地图 JavaScript API 渲染地图，需要在 HTML 中引入脚本：
  - 示例：`<script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=YOUR_API_KEY"></script>`。
  - 使用 API 密钥（AK）初始化地图，绘制路线为折线（polyline）。
- 路线数据包括坐标点序列，前端遍历这些点绘制地图上的路径。
- 文字方向从路线数据解析，显示每一步的说明，如“向北步行 500 米”。

#### 技术细节和注意事项
- **API 密钥管理：**
  - 后端使用 MCP 服务器的 API 密钥，需在 Cursor 配置中设置（示例配置见 [GitHub 文档](https://github.com/baidu-maps/mcp)）。
  - 前端显示地图也需要 API 密钥，建议从 [百度地图开放平台](https://lbsyun.baidu.com/apiconsole/key) 获取。

- **错误处理：**
  - 如果地址无法地理编码，显示错误消息。
  - 如果路线规划失败，显示错误消息。
  - 确保坐标格式正确，使用 gcj02ll 系统。

- **多途经点支持：**
  - 百度地图路线规划 API 支持多个途经点，适合连接起点、终点和中间地点。
  - 从搜索结果可知，类似 Google Maps 的路线规划也支持优化途经点顺序，但本设计按用户输入顺序规划。

- **部署考虑：**
  - 开发时，MCP 服务器可能运行在本地，部署时需确保后端能访问 MCP 服务器或直接调用百度地图 API。
  - 建议为生产环境设置独立的 API 密钥和服务器。

#### 意外发现
一个有趣的细节是，百度地图 MCP 服务器不仅支持标准地图功能，还提供天气查询和 POI 提取等高级功能，可能用于扩展未来功能，如根据天气调整路线或显示沿途兴趣点。

#### 结论
通过上述设计，可以使用 Cursor 调用百度地图 MCP 服务器，创建一个功能齐全的网页，满足用户输入起点、终点和中间地点，自动规划徒步旅行路线，并显示地图和文字规划。设计包括前端表单输入、后端路线规划和地图显示，适合开发者使用 Cursor 快速实现。

---

### 关键引文
- [mcp.so 服务器页面，详细描述百度地图 MCP 服务器功能](https://mcp.so/en/server/baidu-map/baidu-maps)
- [GitHub - baidu-maps/mcp，MCP 服务器使用文档](https://github.com/baidu-maps/mcp)