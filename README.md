# 智能代码审查助手 / Intelligent Code Review Assistant

[English](#english) | [中文](#chinese)

---

## <a id="chinese"></a>🚀 智能代码审查助手

一个基于 AI 的智能代码审查和优化助手，帮助开发者提升代码质量，发现潜在问题，并提供最佳实践建议。

### ✨ 核心功能

- 🔍 **智能代码分析**：支持多种编程语言的代码上传和分析
- 📊 **质量评分**：基于多维度指标的代码质量评估
- 💡 **优化建议**：AI 驱动的代码改进建议和最佳实践
- 📈 **可视化报告**：直观的分析结果展示和趋势图表
- 📚 **知识库**：编程最佳实践和常见问题解决方案
- 🕒 **历史记录**：分析历史管理和对比功能
- 🎨 **现代界面**：响应式设计，支持深色/浅色主题

### 🛠️ 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **样式方案**：Tailwind CSS
- **状态管理**：Zustand
- **代码编辑器**：Monaco Editor
- **图表库**：Recharts
- **UI 组件**：Lucide React Icons
- **文件上传**：React Dropzone
- **通知系统**：Sonner

### 🚀 快速开始

#### 环境要求
- Node.js >= 18.0.0
- npm 或 pnpm

#### 安装依赖
```bash
# 克隆项目
git clone https://gitee.com/chips520/intelligent-code-review-assistant---ai-powered-code-analysis-tool.git
cd intelligent-code-review-assistant---ai-powered-code-analysis-tool

# 安装依赖
npm install
# 或
pnpm install
```

#### 启动开发服务器
```bash
npm run dev
# 或
pnpm dev
```

访问 http://localhost:5173 查看应用

#### 构建生产版本
```bash
npm run build
# 或
pnpm build
```

### 🌐 在线演示

- **Vercel 部署**：https://traesolotraevrtg-14741668-1637-zhouhangyuans-projects.vercel.app
- **腾讯云部署**：即将上线

### 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── Empty.tsx       # 空状态组件
│   └── Layout.tsx      # 布局组件
├── hooks/              # 自定义 Hooks
│   └── useTheme.ts     # 主题管理
├── pages/              # 页面组件
│   ├── Home.tsx        # 首页
│   ├── CodeAnalysis.tsx # 代码分析页
│   ├── AnalysisReport.tsx # 分析报告页
│   ├── History.tsx     # 历史记录页
│   └── KnowledgeBase.tsx # 知识库页
├── lib/                # 工具函数
│   └── utils.ts        # 通用工具
└── assets/             # 静态资源
```

### 🚀 部署指南

#### Vercel 部署
1. 连接 GitHub/Gitee 仓库
2. 选择 React 框架预设
3. 构建命令：`npm run build`
4. 输出目录：`dist`

#### 腾讯云静态网站托管
```bash
# 安装 CloudBase CLI
npm install -g @cloudbase/cli

# 登录
tcb login

# 构建项目
npm run build

# 部署到腾讯云
cd dist
tcb hosting deploy . -e your-env-id
```

### 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

---

## <a id="english"></a>🚀 Intelligent Code Review Assistant

An AI-powered intelligent code review and optimization assistant that helps developers improve code quality, identify potential issues, and provides best practice recommendations.

### ✨ Key Features

- 🔍 **Smart Code Analysis**: Support for multiple programming languages with code upload and analysis
- 📊 **Quality Scoring**: Multi-dimensional code quality assessment
- 💡 **Optimization Suggestions**: AI-driven code improvement suggestions and best practices
- 📈 **Visual Reports**: Intuitive analysis results display with trend charts
- 📚 **Knowledge Base**: Programming best practices and common problem solutions
- 🕒 **History Management**: Analysis history management and comparison features
- 🎨 **Modern UI**: Responsive design with dark/light theme support

### 🛠️ Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Code Editor**: Monaco Editor
- **Charts**: Recharts
- **UI Components**: Lucide React Icons
- **File Upload**: React Dropzone
- **Notifications**: Sonner

### 🚀 Quick Start

#### Prerequisites
- Node.js >= 18.0.0
- npm or pnpm

#### Installation
```bash
# Clone the repository
git clone https://gitee.com/chips520/intelligent-code-review-assistant---ai-powered-code-analysis-tool.git
cd intelligent-code-review-assistant---ai-powered-code-analysis-tool

# Install dependencies
npm install
# or
pnpm install
```

#### Development
```bash
npm run dev
# or
pnpm dev
```

Visit http://localhost:5173 to view the application

#### Build for Production
```bash
npm run build
# or
pnpm build
```

### 🌐 Live Demo

- **Vercel Deployment**: https://traesolotraevrtg-14741668-1637-zhouhangyuans-projects.vercel.app
- **Tencent Cloud Deployment**: Coming Soon

### 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Empty.tsx       # Empty state component
│   └── Layout.tsx      # Layout component
├── hooks/              # Custom hooks
│   └── useTheme.ts     # Theme management
├── pages/              # Page components
│   ├── Home.tsx        # Home page
│   ├── CodeAnalysis.tsx # Code analysis page
│   ├── AnalysisReport.tsx # Analysis report page
│   ├── History.tsx     # History page
│   └── KnowledgeBase.tsx # Knowledge base page
├── lib/                # Utility functions
│   └── utils.ts        # Common utilities
└── assets/             # Static assets
```

### 🚀 Deployment

#### Vercel Deployment
1. Connect your GitHub/Gitee repository
2. Select React framework preset
3. Build command: `npm run build`
4. Output directory: `dist`

#### Tencent Cloud Static Website Hosting
```bash
# Install CloudBase CLI
npm install -g @cloudbase/cli

# Login
tcb login

# Build project
npm run build

# Deploy to Tencent Cloud
cd dist
tcb hosting deploy . -e your-env-id
```

### 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

---

## 🏆 Trae Solo Top Player Activity

This project is developed for the **Trae Solo Top Player AI Programming Activity**, showcasing:

- 🤖 **AI Integration**: Intelligent code analysis capabilities
- 🎯 **Practical Application**: Real-world code review scenarios
- 🚀 **Modern Technology**: Latest React and TypeScript features
- 🌟 **User Experience**: Intuitive and responsive design
- 📱 **Cross-platform**: Works on desktop and mobile devices

### 🎖️ Activity Highlights

- **Theme**: Intelligent Code Review and Optimization
- **Technology**: React + TypeScript + AI Analysis
- **Features**: Multi-language support, Visual reports, Best practices
- **Deployment**: Multi-platform deployment (Vercel + Tencent Cloud)
- **Innovation**: AI-powered code quality assessment

---

**Made with ❤️ for the Trae Solo Community**
