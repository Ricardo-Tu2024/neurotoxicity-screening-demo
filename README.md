# 线虫神经毒性筛查系统 Demo

基于论文《High-throughput neurotoxicity screening in *Caenorhabditis elegans* dopaminergic neurons with self-supervised learning》的演示网页。

## 功能特点

本系统展示了对秀丽隐杆线虫多巴胺能神经元的高通量形态学分析，可检测10项关键指标：

### 四大分析模块

1. **串珠分析**
   - 串珠数量
   - 平均串珠大小

2. **细胞体分析**
   - CEP数量
   - 平均CEP大小
   - ADE数量
   - 平均ADE大小

3. **树突分析**
   - 树突长度

4. **形态异常分析**
   - 断裂检测
   - 增生检测
   - 异常弯曲检测

## 使用说明

1. 选择样本（提供3个示例样本）
2. 点击"预处理"按钮查看预处理后的图像
3. 点击"分析"按钮查看完整的分析结果和指标

## 项目结构

```
Demo/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # 交互逻辑
├── images/             # 图片资源
│   ├── original/       # 原始图片
│   ├── preprocessed/   # 预处理后的图片
│   └── results/        # 分析结果图片
└── README.md           # 说明文档
```

## 部署到 GitHub Pages

### 方法一：通过 GitHub 网页界面

1. 在 GitHub 上创建新仓库
2. 上传所有文件到仓库
3. 进入仓库的 Settings > Pages
4. 在 Source 下选择 `main` 分支
5. 点击 Save，等待部署完成
6. 访问 `https://你的用户名.github.io/仓库名/`

### 方法二：通过命令行

```bash
# 初始化 git 仓库
cd D:\CursorCode\Demo
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Neurotoxicity screening demo"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/仓库名.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

然后在 GitHub 仓库设置中启用 GitHub Pages。

## 准备图片资源

### 当前状态

- ✅ 原始图片：已从 `D:\CursorCode\Dataset\imagesTr` 复制了3张样本图片
- ⚠️ 预处理图片：需要手动添加
- ⚠️ 分析结果图片：需要手动添加

### 需要添加的图片

请将以下图片放入对应目录：

#### 预处理图片（`images/preprocessed/`）
- `sample1_preprocessed.png`
- `sample2_preprocessed.png`
- `sample3_preprocessed.png`

#### 分析结果图片（`images/results/`）

每个样本需要4张结果图：

**样本1：**
- `sample1_bead.png` - 串珠分析结果
- `sample1_cellbody.png` - 细胞体分析结果
- `sample1_dendrite.png` - 树突分析结果
- `sample1_morphology.png` - 形态异常分析结果

**样本2：**
- `sample2_bead.png`
- `sample2_cellbody.png`
- `sample2_dendrite.png`
- `sample2_morphology.png`

**样本3：**
- `sample3_bead.png`
- `sample3_cellbody.png`
- `sample3_dendrite.png`
- `sample3_morphology.png`

### 生成分析结果图片

可以使用 `D:\CursorCode\NeuroSentinel\neorual-analysis` 中的脚本生成分析结果：

```bash
cd D:\CursorCode\NeuroSentinel\neorual-analysis

# 串珠分析
python visualize_bead_segmentation.py --img <图像路径> --out-dir <输出目录>

# 细胞体分析
python visualize_Cellbody_instance_segmentation.py --img <图像路径> --out-dir <输出目录>

# 树突分析
python visualize_Dendrite_detection.py --img <图像路径> --out-dir <输出目录>

# 形态分类
python inference_vit_classification.py --img <图像路径> --out-dir <输出目录>
```

## 技术栈

- HTML5
- CSS3（响应式设计、渐变、动画）
- 原生 JavaScript（无依赖）

## 浏览器兼容性

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## 许可证

本项目仅用于学术演示目的。

## 参考文献

Lv Shenchong, Sun Yutao, Tu Zijian, et al. High-throughput neurotoxicity screening in *Caenorhabditis elegans* dopaminergic neurons with self-supervised learning.
