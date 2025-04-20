# 地图对话网站架构文档

## 项目文档目录 `/memory-bank/`
- `implementation-plan.md` - 项目实施计划，详细描述开发步骤和测试方法
- `rules.md` - 项目编程规则，规定代码结构和命名规范
- `tech-stack.md` - 技术栈说明，描述所选用的前后端技术
- `design_document.md` - 设计文档，包含功能设计和交互设计
- `progress.md` - 进度跟踪文档，记录项目完成情况
- `architecture.md` - 本文档，描述项目结构和文件用途

## 前端目录结构 `/frontend/`
### 源代码目录 `/frontend/src/`
- `main.js` - 应用程序入口文件，初始化 Vue 实例
- `App.vue` - 根组件，定义应用程序的基本结构

#### 组件目录 `/frontend/src/components/`
- `ChatBox.vue` - 聊天框组件，处理用户输入和消息显示
- `MapDisplay.vue` - 地图显示组件，集成高德地图功能
- `Header.vue` - 页面头部组件
- `Footer.vue` - 页面底部组件

#### 路由配置 `/frontend/src/router/`
- `index.js` - 路由配置文件，定义页面路由规则

#### 状态管理 `/frontend/src/store/`
- `index.js` - Vuex store 配置文件
- `modules/` - 存放不同模块的状态管理文件
  - `chat.js` - 聊天相关的状态管理
  - `map.js` - 地图相关的状态管理

#### 工具函数 `/frontend/src/utils/`
- `api.js` - API 请求封装
- `mapUtils.js` - 地图相关工具函数
- `messageFormat.js` - 消息格式化工具

#### 样式文件 `/frontend/src/assets/`
- `styles/` - 样式文件目录
  - `main.css` - 主样式文件
  - `variables.scss` - SCSS 变量定义
  - `mixins.scss` - SCSS 混入定义

#### 静态资源 `/frontend/public/`
- `index.html` - HTML 模板文件
- `favicon.ico` - 网站图标
- `images/` - 图片资源目录

## 后端目录结构 `/backend/`
### 主程序文件
- `app.py` - Flask 应用程序入口文件
- `config.py` - 配置文件，包含数据库和API密钥等配置

### API 接口目录 `/backend/api/`
- `__init__.py` - API 包初始化文件
- `chat.py` - 聊天相关的API接口
- `map_query.py` - 地图查询相关的API接口
- `user.py` - 用户相关的API接口

### 数据模型目录 `/backend/models/`
- `__init__.py` - 模型包初始化文件
- `user_history.py` - 用户历史记录模型
- `common_place.py` - 常用地点模型
- `base.py` - 基础模型类

### 工具函数目录 `/backend/utils/`
- `__init__.py` - 工具包初始化文件
- `amap_utils.py` - 高德地图工具封装
- `db_utils.py` - 数据库操作工具
- `message_parser.py` - 消息解析工具

### 数据库目录 `/backend/database/`
- `migrations/` - 数据库迁移文件
- `scripts/` - 数据库脚本

## 测试目录结构
### 前端测试 `/frontend/tests/`
- `unit/` - 单元测试
- `e2e/` - 端到端测试

### 后端测试 `/backend/tests/`
- `unit/` - 单元测试
- `integration/` - 集成测试
- `api/` - API测试

## 部署配置文件
- `vercel.json` - Vercel 部署配置文件
- `.github/workflows/` - GitHub Actions 工作流配置
- `.env.example` - 环境变量示例文件

## 版本控制
- `.gitignore` - Git 忽略文件配置
- `.git/` - Git 版本控制目录

## 依赖管理
### 前端依赖
- `package.json` - npm 包配置文件
- `yarn.lock` - Yarn 依赖锁定文件

### 后端依赖
- `requirements.txt` - Python 依赖列表
- `Pipfile` - Pipenv 依赖配置
- `Pipfile.lock` - Pipenv 依赖锁定文件

## 根目录文件
- `README.md` - 项目说明文档，包含项目概述、目录结构和开发指南
- `.gitignore` - Git 忽略文件配置，排除不需要版本控制的文件

## 文档目录 `/docs/`
- `README.md` - 文档目录说明
- `api-docs.md` - API 接口文档，详细描述后端 API 的使用方法和参数
- `frontend/` - 前端文档目录
- `backend/` - 后端文档目录
- `database/` - 数据库文档目录

## 架构见解

### 前后端分离架构
项目采用前后端分离的架构设计，前端使用 Vue.js 开发单页应用，后端使用 Flask 提供 RESTful API。这种架构的优势在于：
1. **关注点分离**：前端专注于用户界面和交互体验，后端专注于业务逻辑和数据处理
2. **独立部署**：前后端可以独立开发、测试和部署
3. **技术选择灵活**：两端可以选择最适合的技术栈和工具

### 组件化设计
前端采用组件化设计，将页面拆分为多个独立的组件（如 ChatBox、MapDisplay）。每个组件有自己的模板、逻辑和样式，实现了：
1. **代码复用**：组件可以在不同页面重复使用
2. **维护性提高**：每个组件职责单一，易于维护和测试
3. **团队协作**：不同开发者可以并行开发不同组件

### 模块化后端
后端代码按功能模块划分为不同的包和模块，如 API 接口、数据模型、工具函数等，这样做的好处是：
1. **结构清晰**：代码组织有序，易于理解和导航
2. **功能内聚**：相关功能代码集中管理
3. **可扩展性**：新功能可以作为新模块添加，不影响现有代码

### 数据流设计
应用中的数据流采用以下流程：
1. 用户在聊天框中输入查询
2. 前端组件捕获输入并发送到后端 API
3. 后端解析请求，调用高德地图 API 获取结果
4. 后端处理结果并返回给前端
5. 前端根据结果更新 UI（聊天记录和地图显示）

### Serverless 部署策略
项目采用 GitHub + Vercel 的 Serverless 部署方案，好处包括：
1. **零运维**：无需管理服务器，减少维护成本
2. **自动扩展**：根据流量自动扩展资源
3. **持续部署**：代码推送到 GitHub 后自动部署
4. **低成本**：按实际使用量计费，小规模应用成本低

### 安全考虑
1. API 密钥管理：敏感信息存储在环境变量中，不直接包含在代码中
2. 输入验证：所有用户输入都经过验证，防止注入攻击
3. CORS 配置：适当配置跨域资源共享，控制 API 访问权限

### 性能优化策略
1. 前端资源按需加载，减少首屏加载时间
2. 使用缓存机制减少重复请求
3. 使用连接池优化数据库连接
4. 实现 API 请求限流，防止过载 