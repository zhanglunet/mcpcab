# 地图对话网站 - 前端

这是地图对话网站的前端项目，基于 Vue.js 开发。

## 项目设置

### 安装依赖
```
npm install
```

### 开发环境运行
```
npm run serve
```

### 构建生产环境版本
```
npm run build
```

### 代码检查和修复
```
npm run lint
```

## 项目结构

```
frontend/
├── public/                # 静态资源目录
│   ├── index.html         # HTML 模板
│   └── favicon.ico        # 网站图标
├── src/                   # 源代码目录
│   ├── assets/            # 资源文件（图片、样式等）
│   │   └── styles/        # 样式文件
│   ├── components/        # 组件目录
│   │   ├── ChatBox.vue    # 聊天框组件
│   │   ├── MapDisplay.vue # 地图显示组件
│   │   ├── Header.vue     # 页面头部组件
│   │   └── Footer.vue     # 页面底部组件
│   ├── router/            # 路由配置
│   │   └── index.js       # 路由定义
│   ├── store/             # Vuex 状态管理
│   │   ├── index.js       # Store 配置
│   │   └── modules/       # Store 模块
│   │       ├── chat.js    # 聊天相关状态
│   │       └── map.js     # 地图相关状态
│   ├── utils/             # 工具函数
│   │   ├── api.js         # API 请求封装
│   │   ├── mapUtils.js    # 地图相关工具
│   │   └── messageFormat.js # 消息格式化工具
│   ├── views/             # 页面组件
│   │   ├── Home.vue       # 首页
│   │   ├── About.vue      # 关于页面
│   │   ├── Help.vue       # 帮助页面
│   │   └── NotFound.vue   # 404 页面
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
├── .env.example           # 环境变量示例
├── babel.config.js        # Babel 配置
├── package.json           # 依赖配置
└── vue.config.js          # Vue CLI 配置
```

## 技术栈

- Vue.js 2.x
- Vuex
- Vue Router
- Element UI
- Axios
- SCSS

## 开发指南

### 组件开发

所有组件应遵循单一职责原则，一个组件只负责一个功能。组件应该是可复用的，避免在组件内部使用过于特定的逻辑。

### 状态管理

使用 Vuex 进行状态管理。将状态分为全局状态和模块状态，模块状态使用命名空间。

### API 调用

所有 API 调用都应该通过 `utils/api.js` 进行，不要在组件中直接使用 Axios。

### 样式规范

- 使用 SCSS 编写样式
- 使用 BEM 命名规范
- 优先使用 Element UI 组件的样式
- 自定义样式放在 `assets/styles` 目录下

## 环境变量

在开发和生产环境中，可以使用以下环境变量：

- `VUE_APP_API_URL`: 后端 API 地址
- `VUE_APP_AMAP_KEY`: 高德地图 API 密钥
- `VUE_APP_VERSION`: 应用版本号

需复制 `.env.example` 为 `.env.local` 并填入正确的值。 