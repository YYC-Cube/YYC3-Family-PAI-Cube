---
file: README.md
description: "@yyc3/cli — YYC³ UI 智能编程库 CLI"
author: YanYuCloudCube Team <admin@0379.email>
version: v1.1.0
created: 2026-04-27
updated: 2026-05-22
status: active
tags: [cli, scaffold, components, shadcn, radix, tailwind, registry]
category: package
---

# 🛠️ @yyc3/cli

<p align="center">
  <strong>YYC³ UI 智能编程库 CLI</strong><br/>
  <em>言启象限 | 语枢未来 — 组件脚手架 · 注册表管理 · 主题×场景正交组合</em>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@yyc3/cli"><img src="https://img.shields.io/npm/v/@yyc3/cli.svg?style=flat-square" alt="npm version"/></a>
  <a href="https://www.npmjs.com/package/@yyc3/cli"><img src="https://img.shields.io/npm/dt/@yyc3/cli.svg?style=flat-square" alt="npm downloads"/></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License"/></a>
  <a href="https://github.com/YanYuCloudCube/YYC3-FAmily-Pai"><img src="https://img.shields.io/badge/GitHub-YYC3--FAmily--Pai-black?style=flat-square&logo=github" alt="GitHub"/></a>
</p>

---

> ***YanYuCloudCube***
> *言启象限 | 语枢未来*
> ***Words Initiate Quadrants, Language Serves as Core for Future***

---

## 目录

- [✨ 核心特性](#-核心特性)
- [📦 安装](#-安装)
- [🚀 快速开始](#-快速开始)
- [📖 命令详解](#-命令详解)
- [🎨 主题系统](#-主题系统)
- [🎬 场景系统](#-场景系统)
- [📋 注册表](#-注册表)
- [🔌 MCP 集成](#-mcp-集成)
- [🧪 测试](#-测试)
- [📄 维护指南](#-维护指南)
- [📜 License](#-license)

---

## ✨ 核心特性

### 🏗️ 项目脚手架
- **11 主题 × 18 场景** — 正交组合，一键创建 Next.js 项目
- **`npx create-yyc3-app`** — 零配置启动，交互式主题/场景选择
- **多框架支持** — Next.js / Vite / Astro / Laravel 模板

### 📦 组件管理
- **`yyc3 add`** — 从注册表添加 UI 组件
- **`yyc3 init`** — 初始化项目配置
- **`yyc3 build`** — 构建组件注册表
- **`yyc3 diff`** — 组件差异对比

### 🔍 搜索与浏览
- **`yyc3 search`** — 模糊搜索组件
- **`yyc3 view`** — 预览组件效果
- **`yyc3 docs`** — 查看组件文档
- **`yyc3 info`** — 环境信息诊断

### 🔄 迁移工具
- **`yyc3 migrate`** — 自动迁移（Radix / Icons / RTL）
- **`yyc3 apply`** — 应用变更到项目

### 🔌 MCP Server
- **`yyc3 mcp init`** — 初始化 MCP Server
- **`yyc3 registry`** — 注册表管理命令

---

## 📦 安装

```bash
# 全局安装
pnpm add -g @yyc3/cli

# 或使用 npx (无需安装)
npx @yyc3/cli --help

# 项目脚手架
npx create-yyc3-app my-app
```

### 系统要求

| 要求 | 版本 |
|------|------|
| Node.js | >= 18.0.0 |
| pnpm | >= 8.0.0 |
| React | ^18.0.0 \|\| ^19.0.0 (可选) |

---

## 🚀 快速开始

### 创建新项目

```bash
npx create-yyc3-app my-app

# 指定主题
npx create-yyc3-app my-app --theme cyberpunk

# 指定场景
npx create-yyc3-app my-app --scenes ai-chat,admin-dashboard

# 指定端口
npx create-yyc3-app my-app --port 3300
```

### 管理组件

```bash
# 初始化项目
yyc3 init

# 添加组件
yyc3 add button
yyc3 add card dialog

# 搜索组件
yyc3 search input

# 查看差异
yyc3 diff button
```

---

## 📖 命令详解

| 命令 | 说明 | 示例 |
|------|------|------|
| `yyc3 init` | 初始化项目配置 | `yyc3 init` |
| `yyc3 add <component>` | 添加组件到项目 | `yyc3 add button card` |
| `yyc3 build` | 构建注册表 | `yyc3 build` |
| `yyc3 diff <component>` | 对比组件变更 | `yyc3 diff button` |
| `yyc3 docs <component>` | 查看组件文档 | `yyc3 docs dialog` |
| `yyc3 info` | 环境信息 | `yyc3 info` |
| `yyc3 view <component>` | 预览组件 | `yyc3 view card` |
| `yyc3 search <query>` | 搜索组件 | `yyc3 search table` |
| `yyc3 migrate` | 迁移工具 | `yyc3 migrate --radix` |
| `yyc3 apply` | 应用变更 | `yyc3 apply` |
| `yyc3 mcp` | MCP Server 管理 | `yyc3 mcp init` |
| `yyc3 registry` | 注册表管理 | `yyc3 registry add` |

---

## 🎨 主题系统

内置 11 种精心设计的视觉主题：

| 主题 | 值 | 描述 |
|------|------|------|
| YYC³ Brand | `yyc3-brand` | 默认品牌标准色 / Geist / Lucide |
| 赛博朋克 | `cyberpunk` | 霓虹发光 / 暗色 / 故障效果 |
| 未来科技 | `futuristic` | 玻璃拟态 / 粒子背景 / 渐变光晕 |
| 极光星空 | `aurora` | 极光渐变 / 深空背景 / 微光闪烁 |
| 液态玻璃 | `liquid-glass` | 透明毛玻璃 / 折射 / 浮动卡片 |
| 医疗洁净 | `medical` | 柔和蓝绿 / 干净圆角 / 安全感 |
| 音乐律动 | `musical` | 紫蓝渐变 / 频谱动画 |
| 黑客极客 | `hacker` | 绿色终端 / 等宽字体 / 矩阵风格 |
| 暗黑极简 | `dark-minimal` | 极致暗色 / 锌色调 |
| 商务专业 | `professional` | 蓝色标准 / 白色背景 / 企业级 |
| YYC³ Dark | `yyc3-dark` | YYC³ 暗色主题 / Zinc 基底 |

---

## 🎬 场景系统

内置 18 种业务场景模板：

| 场景 | 值 | 依赖包 |
|------|------|------|
| AI 对话 | `ai-chat` | @yyc3/ai-hub |
| 管理后台 | `admin-dashboard` | recharts |
| 数据仪表盘 | `data-dashboard` | recharts |
| 企业官网 | `landing` | @yyc3/motion |
| 医疗健康 | `medical` | — |
| 学习教育 | `education` | — |
| CRM 客户 | `crm` | — |
| AI 全栈平台 | `ai-platform` | @yyc3/ai-hub |
| 音乐播放器 | `music-player` | — |
| DevOps | `devops` | — |
| SaaS 平台 | `saas` | — |
| 电商商城 | `ecommerce` | — |
| 知识库 Wiki | `knowledge-wiki` | — |
| 金融量化 | `financial` | recharts |
| AI 编程 IDE | `ai-code-ide` | — |
| AI 呼叫中心 | `ai-call-center` | — |
| 作品集 | `portfolio` | @yyc3/motion |
| 智慧城市 | `smart-city` | — |

---

## 📋 注册表

内置 3D/高级组件注册表：

| 组件 | 文件 | 说明 |
|------|------|------|
| Card3D | `card-3d.json` | 3D 卡片翻转效果 |
| ParticleCanvas | `particle-canvas.json` | 粒子画布背景 |
| Spotlight | `spotlight.json` | 聚光灯效果 |
| SplineScene | `spline-scene.json` | Spline 3D 场景嵌入 |

---

## 🔌 MCP 集成

```bash
# 初始化 MCP Server
yyc3 mcp init

# MCP 配置文件自动生成
# 支持 Stdio / HTTP 传输协议
```

---

## 🧪 测试

```bash
# 运行测试
pnpm test

# 覆盖率
pnpm test:coverage

# 类型检查
pnpm typecheck

# 代码检查
pnpm lint
```

---

## 📄 维护指南

详见 [MAINTENANCE.md](./MAINTENANCE.md)

---

## 📜 License

[MIT](./LICENSE) © 2024-2026 YYC³ AI Team

---

<div align="center">

**© 2024-2026 YanYuCloudCube Team. All Rights Reserved.**

*五维驱动 · 五高五标五化*

</div>
