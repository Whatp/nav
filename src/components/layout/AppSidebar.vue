<template>
  <aside class="sidebar" :class="{ collapsed: collapsed }">
    <!-- Logo区域 -->
    <div class="logo-section">
      <img src="@/assets/logo.png" alt="logo" class="logo" />
      <h1 class="site-title" v-show="!collapsed">{{ title }}</h1>
    </div>

    <!-- 分类导航 -->
    <nav class="category-nav">
      <h2 class="nav-title" v-show="!collapsed">分类导航</h2>
      <ul class="category-list">
        <template v-for="category in categories" :key="category.id">
          <li class="category-item"
            :class="{
              active: activeCategoryId === category.id,
              'ai-item': category.name.includes('AI') || category.name.includes('智能'),
              'cloud-item': category.name.includes('云') || category.name.includes('服务'),
              'has-subcategories': category.categories && category.categories.length > 0
            }"
            @click="handleCategoryClick(category.id)"
          >
            <div class="category-icon-wrapper">
              <span class="category-icon">{{ category.icon }}</span>
              <!-- 收起状态下的悬停提示 -->
              <div v-if="collapsed" class="tooltip">{{ category.name }}</div>
            </div>
            <span class="category-name" v-show="!collapsed">{{ category.name }}</span>
            <!-- 展开/收起图标 -->
            <span
              v-if="category.categories && category.categories.length > 0 && !collapsed"
              class="expand-icon"
              :class="{ 'expanded': expandedCategories[category.id] }"
            >
              ▼
            </span>
          </li>
          
          <!-- 二级分类 -->
          <template v-if="category.categories && category.categories.length > 0 && (expandedCategories[category.id] !== undefined ? expandedCategories[category.id] : false) && !collapsed">
            <li
              v-for="subCategory in category.categories"
              :key="subCategory.id"
              class="subcategory-item"
              :class="{ active: activeCategoryId === subCategory.id }"
              @click.stop="handleSubCategoryClick(subCategory.id, category.id)"
            >
              <div class="subcategory-icon-wrapper">
                <span class="subcategory-icon">{{ subCategory.icon }}</span>
              </div>
              <span class="subcategory-name">{{ subCategory.name }}</span>
            </li>
          </template>
        </template>
      </ul>
    </nav>

    <!-- 底部GitHub链接 -->
    <div class="sidebar-footer">
      <a href="https://github.com/Whatp/nav" target="_blank" rel="noopener noreferrer" class="github-link"
        title="查看源代码">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        <span v-show="!collapsed">开源项目,Star</span>
      </a>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

// Props
const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  },
  activeCategoryId: {
    type: [String, Number],
    default: null
  },
  categories: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: '梅零落的导航'
  }
})

// Emits
const emit = defineEmits(['toggle-sidebar', 'select-category', 'scroll-to-category'])

// 二级菜单展开状态
const expandedCategories = ref({})

// 初始化所有具有子分类的分类为收起状态
import { watch } from 'vue'

watch(
  () => props.categories,
  (newCategories) => {
    if (newCategories && newCategories.length > 0) {
      newCategories.forEach(category => {
        if (category.categories && category.categories.length > 0) {
          // 默认收起所有二级菜单
          expandedCategories.value[category.id] = false
        }
      })
    }
  },
  { immediate: true }
)

// 切换二级菜单展开状态
const toggleSubCategory = (categoryId) => {
  expandedCategories.value[categoryId] = !expandedCategories.value[categoryId]
}

// 处理分类点击
const handleCategoryClick = (categoryId) => {
  // 检查是否有子分类
  const category = props.categories.find(cat => cat.id === categoryId)
  if (category && category.categories && category.categories.length > 0) {
    // 如果有子分类，则切换展开状态
    toggleSubCategory(categoryId)
  } else {
    // 如果没有子分类，则触发导航
    emit('select-category', categoryId)
    emit('scroll-to-category', categoryId)
  }
}

// 处理子分类点击
const handleSubCategoryClick = (subCategoryId, parentCategoryId) => {
  emit('select-category', subCategoryId)
  emit('scroll-to-category', subCategoryId)
}
</script>

<style scoped>
/* 左侧边栏样式 */
.sidebar {
  width: 160px;
  min-width: 160px;
  max-width: 160px;
  transition: width 0.2s cubic-bezier(.4, 2, .6, 1), min-width 0.2s;
  background: #001529;
  color: #ffffff;
  padding: 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  height: 100vh;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  display: flex;
  flex-direction: column;
}

.sidebar.collapsed {
  width: 56px;
  min-width: 56px;
  max-width: 56px;
}

.logo-section {
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 10px 0 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  justify-content: flex-start;
  min-height: 56px;
  box-sizing: border-box;
}

.sidebar.collapsed .logo-section {
  justify-content: center;
  padding: 0;
}

.logo {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  margin-right: 0;
  transition: width 0.2s, height 0.2s, margin 0.2s;
}

.sidebar:not(.collapsed) .logo {
  margin-right: 4px;
}

.sidebar.collapsed .logo {
  width: 24px;
  height: 24px;
  margin-right: 0;
}

.site-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 0 4px;
  color: #ffffff;
  transition: opacity 0.2s, font-size 0.2s, margin 0.2s;
  white-space: nowrap;
  cursor: default;
}

.category-nav {
  padding: 20px 0;
  height: calc(100vh - 120px);
  overflow-y: auto;
  /* 隐藏滚动条但保持滚动功能 */
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE/Edge */
}

.category-nav::-webkit-scrollbar {
  display: none;
  /* Chrome/Safari/Webkit */
}

.nav-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 20px 15px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: opacity 0.2s;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.category-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  border-left: 3px solid transparent;
  border-radius: 6px 0 0 6px;
  width: 100%;
}

.sidebar:not(.collapsed) .category-item {
  justify-content: flex-start;
  padding-left: 16px;
  /* 统一左侧间距 */
}

.sidebar.collapsed .category-item {
  justify-content: center;
  padding: 10px 0;
  border-radius: 6px;
}

.category-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-left: 3px solid rgba(255, 255, 255, 0.5);
}

.category-item.active {
  background-color: rgba(255, 255, 255, 0.2);
  border-left: 3px solid #ffffff;
}

.category-item.active .category-icon,
.category-item.active .category-name {
  color: #ffffff;
}

.category-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: transparent; /* 确保背景透明 */
}

.category-icon {
  font-size: 16px;
  width: 24px;
  height: 24px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  flex-shrink: 0;
  /* 防止图标被压缩 */
  line-height: 1;
  /* 确保所有图标垂直居中 */
  background: transparent; /* 确保背景透明 */
}

/* 特殊处理AI智能和云服务图标 */
.ai-item .category-icon,
.cloud-item .category-icon {
  font-size: 18px;
  /* 稍微调小字体 */
  transform: translateY(1px);
  /* 微调垂直位置 */
}

/* 悬停提示样式 */
.tooltip {
  position: fixed; /* 使用固定定位，避免被父元素overflow:hidden截断 */
  left: 70px; /* 固定位置，刚好在侧边栏收起状态的右侧 */
  background: #5f2c82;
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  z-index: 9999; /* 确保显示在最上层 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  pointer-events: none;
}

/* 添加小三角形 */
.tooltip::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  border-width: 6px 6px 6px 0;
  border-style: solid;
  border-color: transparent #5f2c82 transparent transparent;
}

/* 悬停时显示提示 */
.category-item:hover .tooltip {
  opacity: 1;
  visibility: visible;
}

.category-name {
  font-size: 15px;
  font-weight: 600;
  transition: opacity 0.2s, color 0.2s;
  margin-left: 6px; /* 添加小间距，类似图片中的效果 */
  color: #ffffff;
  letter-spacing: 0.5px;
  text-align: left; /* 改为左对齐 */
  flex: 1;
  /* 占据剩余空间 */
}

.expand-icon {
  margin-left: 4px; /* 将图标与文字靠近一些 */
  font-size: 12px; /* 调整图标大小 */
  transition: transform 0.2s ease; /* 添加旋转动画 */
}

.expand-icon.expanded {
  transform: rotate(180deg); /* 展开时旋转180度 */
}

.sidebar-footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 8px 0;
  margin: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  box-sizing: border-box;
}

.github-link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-size: 10px;
  line-height: 1;
  height: 32px;
  max-width: 140px;
}

.sidebar.collapsed .github-link span {
  display: none;
}

.github-link:hover {
  background: #5f2c82;
  color: white;
  transform: translateY(-1px);
}

.github-link svg {
  margin-right: 6px;
  transition: transform 0.3s ease;
  width: 16px;
  height: 16px;
}

.github-link:hover svg {
  transform: scale(1.1);
}

.github-link span {
  transition: opacity 0.2s;
  font-weight: 600;
  letter-spacing: 0.5px;
}



/* 二级分类样式 */
.subcategory-item {
  display: flex;
  align-items: center;
  padding: 8px 0 8px 24px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  border-left: 3px solid transparent;
  border-radius: 6px 0 0 6px;
  width: 100%;
  font-size: 14px;
}

.subcategory-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-left: 3px solid rgba(255, 255, 255, 0.5);
}

.subcategory-item.active {
  background-color: rgba(255, 255, 255, 0.2);
  border-left: 3px solid #ffffff;
}

.subcategory-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.subcategory-icon {
  font-size: 16px;
  width: 24px;
  height: 24px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.subcategory-name {
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  letter-spacing: 0.5px;
  text-align: left;
  flex: 1;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sidebar {
    display: none;
    /* 在移动端隐藏左侧边栏 */
  }
}
</style>
