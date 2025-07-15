<template>
  <div class="nav-home" :class="{ dark: isDark }">
    <!-- 侧边栏 -->
    <aside class="sidebar" :class="{ collapsed: sidebarCollapsed, dark: isDark }">
      <div class="logo-section">
        <img src="@/assets/logo.png" alt="logo" class="logo" />
        <h1 class="site-title" v-show="!sidebarCollapsed">{{ title || '梅零落的导航' }}</h1>
      </div>
      <nav class="category-nav">
        <h2 class="nav-title" v-show="!sidebarCollapsed">分类导航</h2>
        <ul class="category-list">
          <li
            v-for="category in categories"
            :key="category.id"
            class="category-item"
            :class="{ active: activeCategoryId === category.id }"
            @click="selectCategory(category.id); scrollToCategory(category.id)"
          >
            <span class="category-icon">{{ category.icon }}</span>
            <span class="category-name" v-show="!sidebarCollapsed">{{ category.name }}</span>
          </li>
        </ul>
      </nav>
      <div class="sidebar-footer">
        <a
          href="https://github.com/Whatp/nav"
          target="_blank"
          rel="noopener noreferrer"
          class="github-link"
          title="查看源代码"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>开源项目,Star</span>
        </a>
      </div>
    </aside>
    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 顶部搜索栏 -->
      <header class="search-header">
        <button class="collapse-btn" @click="toggleSidebar" :title="sidebarCollapsed ? '展开侧边栏' : '收起侧边栏'">
          <svg v-if="!sidebarCollapsed" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="6" width="16" height="2" rx="1" fill="#2c3e50"/><rect x="4" y="11" width="16" height="2" rx="1" fill="#2c3e50"/><rect x="4" y="16" width="16" height="2" rx="1" fill="#2c3e50"/><polygon points="19,12 15,9 15,15" fill="#2c3e50"/></svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="6" width="16" height="2" rx="1" fill="#2c3e50"/><rect x="4" y="11" width="16" height="2" rx="1" fill="#2c3e50"/><rect x="4" y="16" width="16" height="2" rx="1" fill="#2c3e50"/><polygon points="5,12 9,9 9,15" fill="#2c3e50"/></svg>
        </button>
        <div class="search-container">
          <div class="search-engine-selector">
            <img :src="searchEngines[selectedEngine].icon" :alt="selectedEngine" class="engine-logo" />
            <select v-model="selectedEngine" class="engine-select">
              <option value="google">Google</option>
              <option value="baidu">百度</option>
              <option value="bing">Bing</option>
              <option value="duckduckgo">DuckDuckGo</option>
            </select>
          </div>
          <input
            type="text"
            v-model="searchQuery"
            :placeholder="searchEngines[selectedEngine].placeholder"
            class="search-input"
            @keyup.enter="handleSearch"
          />
        </div>
        <button class="theme-toggle-btn" @click="toggleTheme" :title="isDark ? '切换为浅色' : '切换为深色'">
          <svg v-if="!isDark" width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5" fill="#2c3e50"/><g stroke="#2c3e50" stroke-width="2"><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></g></svg>
          <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79z" fill="#f1c40f"/></svg>
        </button>

        <!-- 移动端菜单按钮 -->
        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>

        <!-- 移动端分类菜单 -->
        <div class="mobile-menu" :class="{ active: showMobileMenu }">
          <div class="mobile-menu-header">
            <h3>分类导航</h3>
            <button class="close-btn" @click="closeMobileMenu">×</button>
          </div>
          <ul class="mobile-category-list">
            <li
              v-for="category in categories"
              :key="category.id"
              class="mobile-category-item"
              @click="scrollToCategoryMobile(category.id)"
            >
              <span class="category-icon">{{ category.icon }}</span>
              <span class="category-name">{{ category.name }}</span>
            </li>
          </ul>
        </div>

        <!-- 移动端菜单遮罩 -->
        <div class="mobile-menu-overlay" :class="{ active: showMobileMenu }" @click="closeMobileMenu"></div>
      </header>

      <!-- 导航内容区 -->
      <div class="content-area">
        <!-- 加载状态 -->
        <div v-if="loading" class="loading">
          <div class="loading-spinner"></div>
          <p>加载中...</p>
        </div>
        <!-- 错误状态 -->
        <div v-else-if="error" class="error">
          <p>{{ error }}</p>
          <button @click="fetchCategories" class="retry-btn">重试</button>
        </div>
        <!-- 分类内容 -->
        <div v-else class="categories-container card-style">
          <section
            v-for="category in categories"
            :key="category.id"
            class="category-section"
            :id="`category-${category.id}`"
          >
            <h2 class="category-title">
              <span class="category-icon">{{ category.icon }}</span>
              <span class="category-name">{{ category.name }}</span>
            </h2>
            <div class="sites-grid">
              <a
                v-for="site in category.sites"
                :key="site.id"
                :href="site.url"
                target="_blank"
                rel="noopener noreferrer"
                class="site-card"
              >
                <div class="site-icon">
                  <img :src="site.icon" :alt="site.name" @error="handleImageError" />
                </div>
                <div class="site-info">
                  <h3 class="site-name">{{ site.name }}</h3>
                  <p class="site-description">{{ site.description }}</p>
                </div>
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useNavigation } from '@/apis/useNavigation.js'
// 导入搜索引擎logo图片
import googleLogo from '@/assets/goolge.png'
import baiduLogo from '@/assets/baidu.png'
import bingLogo from '@/assets/bing.png'
import duckLogo from '@/assets/duck.png'

// 使用导航API
const { categories, title, loading, error, fetchCategories } = useNavigation()

// 响应式数据
const searchQuery = ref('') // 搜索查询
const selectedEngine = ref('google') // 选中的搜索引擎
const showMobileMenu = ref(false) // 移动端菜单显示状态
const sidebarCollapsed = ref(false)
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}
const activeCategoryId = ref(null)
const selectCategory = (id) => {
  activeCategoryId.value = id
}

// 搜索引擎配置
const searchEngines = {
  google: {
    url: 'https://www.google.com/search?q=',
    icon: googleLogo,
    placeholder: 'Google 搜索'
  },
  baidu: {
    url: 'https://www.baidu.com/s?wd=',
    icon: baiduLogo,
    placeholder: '百度一下'
  },
  bing: {
    url: 'https://www.bing.com/search?q=',
    icon: bingLogo,
    placeholder: 'Bing 搜索'
  },
  duckduckgo: {
    url: 'https://duckduckgo.com/?q=',
    icon: duckLogo,
    placeholder: 'DuckDuckGo 搜索'
  }
}

// 自定义固定时间滚动函数
const smoothScrollTo = (container, targetTop, duration = 600) => {
  const startTop = container.scrollTop
  const distance = targetTop - startTop
  let startTime = null

  const animateScroll = (currentTime) => {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)

    // 使用缓动函数 (easeInOutCubic)
    const ease = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2

    container.scrollTop = startTop + distance * ease

    if (progress < 1) {
      requestAnimationFrame(animateScroll)
    }
  }

  requestAnimationFrame(animateScroll)
}

// 滚动到指定分类
const scrollToCategory = (categoryId) => {
  const element = document.getElementById(`category-${categoryId}`)
  const container = document.querySelector('.content-area')

  if (element && container) {
    // 检查是否为移动端
    const isMobile = window.innerWidth <= 768

    let targetTop = 0

    if (isMobile) {
      // 移动端：在 content-area 容器内滚动
      const elementOffsetTop = element.offsetTop
      const searchHeaderHeight = 80 // 固定高度，因为搜索框是fixed定位
      targetTop = elementOffsetTop - searchHeaderHeight
    } else {
      // 桌面端：在容器内滚动
      const searchHeader = document.querySelector('.search-header')
      const elementOffsetTop = element.offsetTop
      const searchHeaderHeight = searchHeader ? searchHeader.offsetHeight + 20 : 100
      targetTop = elementOffsetTop - searchHeaderHeight
    }

    // 使用固定时间滚动（600毫秒）
    smoothScrollTo(container, Math.max(0, targetTop), 600)
  }
}

// 处理搜索
const handleSearch = () => {
  if (!searchQuery.value.trim()) return

  const engine = searchEngines[selectedEngine.value]
  const url = engine.url + encodeURIComponent(searchQuery.value)
  window.open(url, '_blank')
}

// 处理图片加载错误
const handleImageError = (event) => {
  event.target.style.display = 'none'
}

// 移动端菜单控制
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

// 移动端分类滚动
const scrollToCategoryMobile = (categoryId) => {
  closeMobileMenu() // 先关闭菜单

  // 稍微延迟一下再滚动，确保菜单关闭动画完成
  setTimeout(() => {
    scrollToCategory(categoryId)
  }, 200)
}

const isDark = ref(false)
const toggleTheme = () => {
  isDark.value = !isDark.value
  document.body.classList.toggle('dark', isDark.value)
  document.body.classList.toggle('light', !isDark.value)
}

// 组件挂载时获取数据
onMounted(() => {
  fetchCategories()
})
</script>

<style scoped>
.nav-home {
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
}

/* 左侧边栏样式 */
.sidebar {
  width: 160px;
  min-width: 160px;
  max-width: 160px;
  transition: width 0.2s cubic-bezier(.4,2,.6,1), min-width 0.2s;
  background: #fff;
  color: #3a4266;
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
.collapse-btn {
  margin-right: 16px;
  background: none;
  border: none;
  color: #2c3e50;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.collapse-btn:hover {
  background: #f8f9fa;
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
  color: #3a4266;
  transition: opacity 0.2s, font-size 0.2s, margin 0.2s;
  white-space: nowrap;
}
.sidebar.collapsed .site-title {
  display: none;
}
.category-nav {
  padding: 20px 0;
  height: calc(100vh - 180px);
  overflow-y: auto;
}
.nav-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 20px 15px;
  color: #bdc3c7;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: opacity 0.2s;
}
.sidebar.collapsed .nav-title {
  display: none;
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
  justify-content: center;
  padding: 10px 0;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  border-left: 3px solid transparent;
  border-radius: 6px 0 0 6px;
  width: 100%;
}
.sidebar.collapsed .category-item {
  justify-content: center;
  padding: 10px 0;
  border-radius: 6px;
}
.category-item:hover {
  background-color: rgba(255,255,255,0.08);
  border-left: 3px solid #3498db;
  color: #fff;
}
.category-item.active {
  background-color: rgba(52,152,219,0.18);
  border-left: 3px solid #3498db;
  color: #fff;
}
.category-item.active .category-icon,
.category-item.active .category-name {
  color: #fff;
}
.category-icon {
  font-size: 20px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
.sidebar.collapsed .category-icon {
  margin: 0;
}
.category-name {
  font-size: 15px;
  font-weight: 500;
  transition: opacity 0.2s, color 0.2s;
  margin-left: 8px;
}
.sidebar.collapsed .category-name {
  display: none;
}
.sidebar-footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 0;
  margin: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 32px;
  box-sizing: border-box;
}
.sidebar.collapsed .sidebar-footer {
  padding: 0;
}
.github-link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bdc3c7;
  text-decoration: none;
  padding: 0 6px;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-size: 11px;
  line-height: 1.1;
  min-height: 20px;
  min-width: 20px;
  height: 28px;
}
.sidebar.collapsed .github-link span {
  display: none;
}
.github-link:hover {
  background: rgba(255, 255, 255, 0.12);
  color: white;
  transform: translateY(-1px);
}
.github-link svg {
  margin-right: 8px;
  transition: transform 0.3s ease;
}
.github-link:hover svg {
  transform: scale(1.1);
}
.github-link span {
  transition: opacity 0.2s;
}

/* 右侧主内容区样式 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.search-header {
  background: white;
  padding: 0 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 15px;
  height: 56px;
  border-bottom: 2px solid #f0f1f5;
}

.search-container {
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  gap: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  flex: 1;
  border: 2px solid #e3e8f0;
  background: #fff;
}

@media (max-width: 768px) {
  .search-container {
    margin: 0;
    max-width: none;
  }
}

.search-engine-selector {
  position: relative;
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-right: 1px solid #e9ecef;
  transition: background-color 0.2s ease;
}

.search-engine-selector:hover {
  background: #e9ecef;
}

.engine-logo {
  width: 24px;
  height: 24px;
  margin: 8px;
  object-fit: contain;
  pointer-events: none;
  border-radius: 4px;
}

.engine-select {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;
}

.search-input {
  flex: 1;
  border: none;
  padding: 12px 16px;
  font-size: 16px;
  outline: none;
  background: white;
}

.search-input::placeholder {
  color: #95a5a6;
}

/* 移动端菜单按钮 */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: #2c3e50;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.mobile-menu-btn:hover {
  background: #f8f9fa;
}

/* 移动端菜单 */
.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 280px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  transition: right 0.3s ease;
  overflow-y: auto;
}

.mobile-menu.active {
  right: 0;
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  background: #2c3e50;
  color: white;
}

.mobile-menu-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.mobile-category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mobile-category-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #f8f9fa;
}

.mobile-category-item:hover {
  background: #f8f9fa;
}

.mobile-category-item .category-icon {
  font-size: 20px;
  margin-right: 12px;
  width: 24px;
  text-align: center;
}

.mobile-category-item .category-name {
  font-size: 16px;
  font-weight: 500;
  color: #2c3e50;
}

/* 移动端菜单遮罩 */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.mobile-menu-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* 内容区域样式 */
.content-area {
  flex: 1;
  padding: 30px;
  padding-bottom: 400px;
  overflow-y: auto;
}

.loading, .error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: #7f8c8d;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #ecf0f1;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-btn {
  margin-top: 10px;
  padding: 8px 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.categories-container {
  max-width: 1200px;
  margin: 0 auto;
}

.category-section {
  margin-bottom: 50px;
}

.category-title {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 25px;
  color: #2c3e50;
  display: flex;
  align-items: center;
}

.category-title .category-icon {
  font-size: 32px;
  margin-right: 16px;
}

.category-title .category-name {
  margin-left: 10px;
  font-size: 26px;
}

.sites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.site-card {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
  position: relative;
  overflow: hidden;
}

.site-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(155, 89, 182, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.site-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.site-card:hover::before {
  opacity: 1;
}

.site-icon {
  width: 48px;
  height: 48px;
  margin-right: 16px;
  border-radius: 8px;
  overflow: hidden;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.site-icon img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.site-info {
  flex: 1;
  position: relative;
  z-index: 1;
}

.site-name {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 5px 0;
  color: #2c3e50;
}

.site-description {
  font-size: 14px;
  color: #7f8c8d;
  margin: 0;
  line-height: 1.4;
}

/* 页面底部 */
.page-footer {
  margin-top: 60px;
  padding: 40px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  border-top: 3px solid #3498db;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  gap: 30px;
}

.footer-info h3 {
  color: #2c3e50;
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.footer-info p {
  color: #7f8c8d;
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
}

.footer-links {
  display: flex;
  gap: 15px;
}

.footer-link {
  display: flex;
  align-items: center;
  color: #3498db;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 20px;
  background: white;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
}

.footer-link:hover {
  background: #3498db;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.footer-link svg {
  margin-right: 6px;
  transition: transform 0.3s ease;
}

.footer-link:hover svg {
  transform: scale(1.1);
}

.footer-bottom {
  border-top: 1px solid #e9ecef;
  padding-top: 20px;
  text-align: center;
}

.footer-bottom p {
  color: #7f8c8d;
  font-size: 13px;
  margin: 5px 0;
  line-height: 1.4;
}

.footer-bottom a {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.footer-bottom a:hover {
  color: #2980b9;
  text-decoration: underline;
}

.footer-tech {
  font-size: 12px !important;
  opacity: 0.8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-home {
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  .sidebar {
    display: none; /* 在移动端隐藏左侧边栏 */
  }

  .main-content {
    flex: 1;
    height: 100vh;
    margin-left: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .search-header {
    padding: 15px 20px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 500;
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .content-area {
    flex: 1;
    padding: 20px 15px;
    padding-top: 100px; /* 为固定的搜索框留出空间 */
    padding-bottom: 100px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; /* iOS平滑滚动 */
  }

  .mobile-menu-btn {
    display: block; /* 在移动端显示菜单按钮 */
    flex-shrink: 0;
  }

  .sites-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .site-card {
    padding: 15px;
  }

  .category-title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .category-title .category-icon {
    font-size: 28px;
    margin-right: 12px;
  }

  .category-title .category-name {
    font-size: 22px;
  }

  /* 移动端页面底部 */
  .page-footer {
    margin-top: 40px;
    padding: 30px 20px;
  }

  .footer-content {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  .footer-links {
    justify-content: center;
  }

  .footer-bottom {
    padding-top: 15px;
  }

  .footer-bottom p {
    font-size: 12px;
  }
}

/* 侧边栏渐变色 */
.sidebar {
  background: linear-gradient(160deg, #b6c6f5 0%, #e6d6f5 100%);
  color: #333;
}
.sidebar.dark {
  background: linear-gradient(160deg, #23272e 0%, #31343b 100%);
  color: #e0e0e0;
}

/* 主体背景色 */
.nav-home {
  background: #fff;
}
.nav-home.dark {
  background: #23272e;
}

/* 侧边栏分类导航、开源项目等文字颜色优化 */
.sidebar {
  background: linear-gradient(160deg, #e3e8fa 0%, #f3eafd 100%);
  color: #3a4266;
}
.sidebar .nav-title,
.sidebar .category-name,
.sidebar .github-link span {
  color: #3a4266;
  font-weight: 600;
  letter-spacing: 0.5px;
}
.sidebar .category-item.active .category-name,
.sidebar .category-item:hover .category-name {
  color: #5f2c82;
}
.sidebar .github-link {
  color: #3a4266;
}
.sidebar .github-link:hover {
  color: #fff;
  background: #5f2c82;
}

/* 主体卡片和搜索栏边框加深 */
.card-style {
  background: #fff;
  border-radius: 28px;
  box-shadow: 0 2px 12px 0 rgba(120,130,255,0.06) inset, 0 4px 32px 0 rgba(80, 100, 150, 0.10);
  border: 2px solid #e3e8f0;
  padding: 32px 32px 48px 32px;
  margin: 32px auto 0 auto;
  max-width: 1200px;
  transition: background 0.3s, color 0.3s, border 0.3s;
  color: #232a3d;
}
.nav-home.dark .card-style {
  background: #23262b;
  box-shadow: 0 4px 32px 0 rgba(0,0,0,0.18);
  color: #fff;
  border: 2px solid #353a45;
}
.nav-home.dark .site-name {
  color: #fff;
}
.nav-home.dark .site-description {
  color: #bfc6d1;
}
.nav-home.dark .search-container {
  background: #23262b;
  border: 2px solid #353a45;
}
.nav-home.dark .category-title,
.nav-home.dark .site-icon img {
  filter: brightness(0.8) grayscale(0.2);
  color: #bbb;
}
.site-name {
  color: #232a3d;
  font-weight: 700;
}
.site-description {
  color: #5a627a;
  font-size: 15px;
}

/* 顶部搜索栏右侧主题切换按钮 */
.theme-toggle-btn {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  transition: background 0.2s;
}
.theme-toggle-btn:hover {
  background: #f1f1f1;
}
.nav-home.dark .theme-toggle-btn:hover {
  background: #333;
}
</style>