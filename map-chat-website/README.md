# 地图对话网站

一个结合聊天界面和地图展示的交互式网站，用户可以通过类似ChatGPT的对话方式进行地图查询和交互。

## 项目概述

本项目使用Vue.js开发前端界面，Flask开发后端API，通过高德地图API实现地图相关功能。用户可以通过对话形式查询地点、规划路线、搜索周边等。

### 主要功能

- 对话式地图交互
- 位置查询与定位
- 周边设施搜索
- 多种出行方式路线规划
- 中间点查找功能
- 查询历史记录

## 技术栈

- 前端：Vue.js + Element UI
- 后端：Python Flask + SQLAlchemy
- 数据库：MySQL
- 地图服务：高德地图API
- 部署：GitHub + Vercel

## 目录结构

```
map-chat-website/
├── frontend/               # 前端代码
│   ├── src/                # 源代码
│   │   ├── components/     # Vue组件
│   │   ├── assets/         # 静态资源
│   │   ├── router/         # 路由配置
│   │   ├── store/          # Vuex状态管理
│   │   └── utils/          # 工具函数
│   └── public/             # 公共资源
├── backend/                # 后端代码
│   ├── api/                # API接口
│   ├── models/             # 数据模型
│   ├── utils/              # 工具函数
│   ├── database/           # 数据库相关
│   └── tests/              # 测试代码
└── docs/                   # 项目文档
```

## 开发指南

### 前端开发

1. 进入frontend目录
2. 安装依赖：`npm install`
3. 启动开发服务器：`npm run serve`
4. 构建生产版本：`npm run build`

### 后端开发

1. 进入backend目录
2. 创建并激活虚拟环境
3. 安装依赖：`pip install -r requirements.txt`
4. 启动开发服务器：`flask run`

## 部署说明

本项目采用GitHub + Vercel方案进行部署：

1. 前端代码通过Vercel自动部署
2. 后端API通过Vercel Serverless Functions部署
3. 数据库使用云数据库服务

## 贡献指南

1. Fork本仓库
2. 创建特性分支：`git checkout -b feature/your-feature`
3. 提交更改：`git commit -m 'Add your feature'`
4. 推送到分支：`git push origin feature/your-feature`
5. 提交Pull Request
