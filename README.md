# 步行路线规划网页

一个基于百度地图MCP服务器的步行路线规划网页应用，支持输入起点、终点和多个中间点，自动规划最优步行路线。

## 功能特点

- 支持输入起点、终点和多个中间点
- 自动规划最优步行路线
- 在地图上直观显示路线
- 提供详细的步行导航指南
- 支持地理编码和反向地理编码

## 技术栈

### 前端
- HTML：构建网页结构
- JavaScript：处理用户交互和动态内容
- 百度地图JavaScript API：显示地图和路线

### 后端
- Python：编程语言
- Flask：轻量级Web框架
- baidu_maps_mcp：百度地图MCP服务器交互库

## 安装部署

1. 克隆项目
```bash
git clone [项目地址]
cd pedestrian_route_planner
```

2. 安装后端依赖
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate
pip install -r requirements.txt
```

3. 配置API密钥
- 从[百度地图开放平台](https://lbsyun.baidu.com/apiconsole/key)获取API密钥
- 在config目录下创建.env文件，添加API密钥

4. 启动服务
```bash
python app.py
```

5. 访问应用
- 打开浏览器访问 http://localhost:5000

## 使用说明

1. 在表单中输入起点地址
2. 输入终点地址
3. 在文本区域中输入中间点地址（每行一个）
4. 点击提交按钮
5. 等待系统规划路线
6. 查看地图上的路线和文字导航指南

## 开发指南

详细的开发文档请参考：
- [设计文档](memory-bank/design-document.md)
- [技术栈说明](memory-bank/tech-stack.md)
- [实施计划](memory-bank/implementation-plan.md)

## 贡献指南

欢迎提交Issue和Pull Request来帮助改进项目。

## 许可证

本项目使用GPL许可证 - 查看[LICENSE](LICENSE)文件了解详情。