# GitHub Pages 部署指南

## 快速部署步骤

### 1. 创建 GitHub 仓库

1. 登录 GitHub
2. 点击右上角的 "+" 号，选择 "New repository"
3. 填写仓库名称（例如：`neurotoxicity-screening-demo`）
4. 选择 Public（公开）
5. 不要勾选 "Initialize this repository with a README"
6. 点击 "Create repository"

### 2. 上传代码到 GitHub

在 Demo 目录下打开命令行，执行以下命令：

```bash
# 初始化 git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Neurotoxicity screening demo"

# 添加远程仓库（替换为你的实际仓库地址）
git remote add origin https://github.com/你的用户名/neurotoxicity-screening-demo.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 3. 启用 GitHub Pages

1. 进入你的 GitHub 仓库页面
2. 点击 "Settings"（设置）
3. 在左侧菜单中找到 "Pages"
4. 在 "Source" 部分：
   - Branch: 选择 `main`
   - Folder: 选择 `/ (root)`
5. 点击 "Save"
6. 等待几分钟，页面会显示你的网站地址：
   `https://你的用户名.github.io/neurotoxicity-screening-demo/`

### 4. 访问你的网站

部署完成后，访问显示的网址即可查看你的 Demo。

## 更新网站

当你修改了代码后，使用以下命令更新：

```bash
git add .
git commit -m "描述你的修改"
git push
```

GitHub Pages 会自动重新部署，通常需要几分钟时间。

## 自定义域名（可选）

如果你有自己的域名，可以在 GitHub Pages 设置中配置：

1. 在 "Custom domain" 输入框中输入你的域名
2. 在你的域名提供商处添加 CNAME 记录，指向 `你的用户名.github.io`

## 故障排除

### 问题：页面显示 404

**解决方案：**
- 确认 GitHub Pages 已启用
- 检查分支是否选择正确（应该是 `main`）
- 等待几分钟让部署完成

### 问题：图片无法显示

**解决方案：**
- 检查图片路径是否正确
- 确认所有图片文件都已上传到 GitHub
- 检查浏览器控制台的错误信息

### 问题：样式或脚本不生效

**解决方案：**
- 清除浏览器缓存
- 检查文件路径是否正确
- 在浏览器开发者工具中查看网络请求

## 本地测试

在上传到 GitHub 之前，建议先在本地测试：

### 方法一：使用 Python 简单服务器

```bash
cd D:\CursorCode\Demo
python -m http.server 8000
```

然后在浏览器中访问 `http://localhost:8000`

### 方法二：使用 VS Code Live Server

1. 安装 "Live Server" 扩展
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

## 注意事项

1. **图片大小**：确保图片文件不要太大，建议每张图片不超过 2MB
2. **文件命名**：避免使用中文文件名，使用英文和数字
3. **路径**：使用相对路径，不要使用绝对路径
4. **浏览器兼容性**：在多个浏览器中测试（Chrome、Firefox、Safari）

## 进一步优化

### 压缩图片

使用在线工具或命令行工具压缩图片：

```bash
# 使用 ImageMagick
convert input.png -quality 85 output.png

# 使用 Python PIL
python -c "from PIL import Image; img = Image.open('input.png'); img.save('output.png', optimize=True, quality=85)"
```

### 添加 Google Analytics（可选）

在 `index.html` 的 `<head>` 标签中添加 Google Analytics 代码，追踪访问数据。

### 添加 SEO 优化

在 `index.html` 的 `<head>` 标签中添加：

```html
<meta name="description" content="线虫神经毒性筛查系统演示">
<meta name="keywords" content="神经毒性,线虫,C. elegans,机器学习">
<meta name="author" content="你的名字">
```

## 联系支持

如果遇到问题，可以：
- 查看 GitHub Pages 官方文档：https://docs.github.com/pages
- 在 GitHub 仓库中创建 Issue
- 查看浏览器控制台的错误信息
