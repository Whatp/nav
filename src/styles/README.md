# 样式架构说明

本项目采用模块化的 CSS 架构，将样式按功能和用途进行分类组织。

## 目录结构

```
src/styles/
├── index.css           # 主样式入口文件
├── base/              # 基础样式
│   ├── reset.css      # CSS 重置和基础样式
│   ├── variables.css  # CSS 变量定义
│   └── typography.css # 字体和排版样式
├── layout/            # 布局相关样式
│   ├── app.css        # 应用主布局
│   ├── header.css     # 头部导航样式
│   └── sidebar.css    # 侧边栏样式
├── components/        # 组件样式
│   ├── buttons.css    # 按钮组件
│   ├── cards.css      # 卡片组件
│   └── forms.css      # 表单组件
├── themes/            # 主题样式
│   ├── light.css      # 浅色主题
│   └── dark.css       # 深色主题
└── utils/             # 工具类样式
    ├── responsive.css # 响应式工具类
    └── animations.css # 动画和过渡效果
```

## 样式组织原则

### 1. 基础样式 (base/)
- **reset.css**: CSS 重置，统一浏览器默认样式
- **variables.css**: 定义全局 CSS 变量，包括颜色、间距、圆角等
- **typography.css**: 字体、文本样式定义

### 2. 布局样式 (layout/)
- **app.css**: 应用整体布局，网格系统，容器样式
- **header.css**: 顶部导航栏样式
- **sidebar.css**: 侧边栏导航样式

### 3. 组件样式 (components/)
- **buttons.css**: 各种按钮样式和状态
- **cards.css**: 卡片组件，包括网站卡片、分类卡片等
- **forms.css**: 表单控件样式

### 4. 主题样式 (themes/)
- **light.css**: 浅色主题变量覆盖
- **dark.css**: 深色主题变量覆盖

### 5. 工具类 (utils/)
- **responsive.css**: 响应式断点和工具类
- **animations.css**: 动画效果和过渡

## CSS 变量系统

项目使用 CSS 自定义属性（变量）来管理设计令牌：

```css
:root {
  /* 颜色系统 */
  --color-background: #ffffff;
  --color-text: #2c3e50;
  --color-heading: #2c3e50;
  --color-border: rgba(60, 60, 60, 0.12);
  
  /* 间距系统 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* 圆角系统 */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
  
  /* 过渡动画 */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
}
```

## 主题切换

项目支持浅色和深色主题，通过在根元素添加 `.light` 或 `.dark` 类来切换：

```html
<div class="app-layout dark">
  <!-- 深色主题内容 -->
</div>
```

## 响应式设计

采用移动端优先的响应式设计策略：

- **移动端**: < 768px
- **平板端**: 769px - 1024px  
- **桌面端**: > 1024px
- **大屏幕**: > 1440px

## 使用指南

### 1. 引入样式
在 `main.js` 中引入主样式文件：

```javascript
import './styles/index.css'
```

### 2. 使用工具类
```html
<div class="flex items-center justify-between p-4 mb-3">
  <h2 class="text-lg font-semibold">标题</h2>
  <button class="btn btn-primary">按钮</button>
</div>
```

### 3. 自定义组件样式
在 Vue 组件中使用 CSS 变量：

```vue
<style scoped>
.custom-component {
  padding: var(--spacing-md);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-normal);
}
</style>
```

## 最佳实践

1. **优先使用 CSS 变量**: 确保主题切换的一致性
2. **遵循 BEM 命名规范**: 保持类名的可读性和维护性
3. **移动端优先**: 先写移动端样式，再添加桌面端适配
4. **避免深层嵌套**: CSS 选择器嵌套不超过 3 层
5. **使用语义化类名**: 类名应该描述用途而不是样式
6. **复用工具类**: 优先使用现有的工具类，减少重复代码

## 扩展指南

### 添加新组件样式
1. 在 `components/` 目录下创建新的 CSS 文件
2. 在 `index.css` 中导入新文件
3. 遵循现有的命名规范和结构

### 添加新主题
1. 在 `themes/` 目录下创建主题文件
2. 定义主题特定的 CSS 变量
3. 在 `index.css` 中导入主题文件

### 添加新工具类
1. 在 `utils/` 目录下的相应文件中添加
2. 遵循原子化 CSS 的原则
3. 确保响应式兼容性