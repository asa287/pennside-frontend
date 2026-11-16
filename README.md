# PennSide frontend

校园活动与同伴发现平台的可交互前端，基于提供的 Figma Make 原型源码整理，保留原有界面与图片。

在线演示：[PennSide 项目网站](https://asa287.github.io/pennside-frontend/)

注册后的活动需求使用结构化选项：活动、起止可用时间（美东时间）、每人美元预算双滑块、地点和总参与人数（包含发起人）。无需自然语言识别，确认前可以返回编辑。预算支持免费活动。

## 本地运行

需要 Node.js 22.12+（推荐 Node.js 24）及 pnpm。

```sh
corepack enable
pnpm install
pnpm dev
```

```sh
pnpm typecheck
pnpm build
pnpm preview
```

生产文件输出到 `dist/`。

## 已包含

- 三屏首页：循环拍立得、Explore、加入引导。
- PennKey 概念演示和登录后的活动发现、活动详情、需求澄清、匹配、邀请与个人资料界面。
- 原型自带的响应式样式、减少动态效果支持和图片来源说明。

## 功能边界

这是前端原型。PennKey 为模拟流程，不接收真实凭据。活动、验证状态、匹配和邀请均为演示数据/浏览器内状态，没有真实身份认证、官方事件校验、消息发送或数据库持久化。刷新后状态会重置。页面字体通过 Google Fonts 加载；不可用时使用系统回退字体。

后端开发时需要对接学校认证、活动 API、用户资料、匹配和邀请服务；所有权限及数据校验应在后端完成。

## 部署

仓库保存源码；网站需要单独部署。标准静态托管配置：安装 `pnpm install --frozen-lockfile`，构建 `pnpm build`，发布目录 `dist`。

- Vercel / Netlify：导入此仓库，选择 Vite，使用以上构建配置。
- GitHub Pages：启用 Settings → Pages → GitHub Actions 后，可手动运行附带的 Deploy GitHub Pages 工作流。仓库及套餐需支持 Pages。
- 子路径部署：设置 `VITE_BASE_PATH=/仓库名/` 再构建；附带 Pages 工作流已配置该值。

默认 GitHub Actions 仅构建和检查；不会自动发布网站。私有仓库不等于网站私有，部署时应单独检查访问设置。

## 设计来源

[Figma Make 原型](https://www.figma.com/make/YKuAXT3iw3c6i6VNAVLOBi/PennSide-Event-Companion-Prototype)

保留 `DESIGN.md` 和页面内 Photography & sources。图片来自原型，来源与署名信息在 `src/Landing.tsx` 中。
