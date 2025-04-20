# 地图对话项目（Map Chat Project）

## 项目简介

地图对话项目是一个基于高德地图API的智能位置问答系统，旨在通过自然语言交互的方式帮助用户获取地理信息和位置服务。用户可以通过对话形式询问地点位置、周边设施、路线规划等信息，系统将提供文字回复并在地图上可视化展示结果。

## 核心功能

- **位置查询**：查询特定地点的位置信息
- **周边搜索**：查找指定位置周边的设施和服务
- **路线规划**：获取不同出行方式的路线导航
- **天气查询**：查询指定城市的天气情况
- **历史记录**：保存用户的查询历史和常用地点

## 目录结构

```
mcpcab/
├── memory-bank/                 # 项目文档目录
│   ├── architecture.md          # 架构文档，描述项目结构和文件用途
│   ├── design_document.md       # 设计文档，包含功能设计和交互设计
│   ├── implementation-plan.md   # 项目实施计划，详细开发步骤和测试方法
│   ├── progress.md              # 进度跟踪文档，记录项目完成情况
│   ├── rules.md                 # 项目编程规则，规定代码结构和命名规范
│   └── tech-stack.md            # 技术栈说明，描述所选用的前后端技术
│
├── map-chat-website/            # 项目代码目录
│   ├── frontend/                # 前端代码
│   │   ├── public/              # 静态资源
│   │   └── src/                 # 源代码
│   │       ├── assets/          # 资源文件（样式、图片等）
│   │       ├── components/      # Vue组件
│   │       │   ├── ChatBox.vue  # 聊天框组件
│   │       │   ├── MapDisplay.vue # 地图显示组件
│   │       │   ├── Header.vue   # 页面头部组件
│   │       │   └── Footer.vue   # 页面底部组件
│   │       ├── router/          # 路由配置
│   │       ├── store/           # Vuex状态管理
│   │       ├── utils/           # 工具函数
│   │       └── views/           # 页面组件
│   │
│   ├── backend/                 # 后端代码
│   │   ├── api/                 # API接口
│   │   ├── models/              # 数据模型
│   │   └── utils/               # 工具函数
│   │
│   └── docs/                    # 项目API文档
│
├── .gitignore                   # Git忽略文件配置
└── README.md                    # 项目说明文档（本文件）
```

## 技术栈

### 前端
- **框架**：Vue.js
- **UI组件库**：Element UI
- **状态管理**：Vuex
- **路由**：Vue Router
- **HTTP客户端**：Axios
- **地图服务**：高德地图JavaScript API

### 后端
- **框架**：Flask
- **数据库**：MySQL
- **ORM**：SQLAlchemy
- **地图服务**：高德地图服务端API

## 开发指南

### 前端开发
1. 进入前端目录：`cd map-chat-website/frontend`
2. 安装依赖：`npm install`
3. 启动开发服务器：`npm run serve`
4. 构建生产版本：`npm run build`

### 后端开发
1. 进入后端目录：`cd map-chat-website/backend`
2. 创建虚拟环境：`python -m venv venv`
3. 激活虚拟环境：
   - Windows: `venv\Scripts\activate`
   - MacOS/Linux: `source venv/bin/activate`
4. 安装依赖：`pip install -r requirements.txt`
5. 启动开发服务器：`python app.py`

## 部署说明

项目采用GitHub + Vercel进行持续集成和部署：
- 前端部署到Vercel
- 后端部署到Vercel Serverless Functions
- 数据库使用云数据库服务

## 许可证

本项目采用Apache 2.0许可证，详情请参阅LICENSE文件。 