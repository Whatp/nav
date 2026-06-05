<template>
  <div class="app-layout">
    <!-- 侧边栏 -->
    <AppSidebar 
      :collapsed="sidebarCollapsed"
      :active-category-id="activeCategoryId"
      :categories="categories"
      :title="title"
      @toggle-sidebar="toggleSidebar"
      @select-category="selectCategory"
      @scroll-to-category="scrollToCategory"
    />
    
    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 顶部搜索栏 -->
      <AppHeader 
        :sidebar-collapsed="sidebarCollapsed"
        :categories="categories"
        @toggle-sidebar="toggleSidebar"
        @scroll-to-category="scrollToCategory"
      />
      
      <!-- 主要内容 -->
      <slot />
    </main>
    
    <!-- 返回顶部按钮 -->
    <BackToTop />
  </div>
</template>

<script setup>
import { useSidebar } from '@/composables/useSidebar'
import { useScroll } from '@/composables/useScroll'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
import BackToTop from '../common/BackToTop.vue'

// Props
defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: '梅零落的导航'
  }
})

// 使用 composables
const { sidebarCollapsed, activeCategoryId, toggleSidebar, selectCategory } = useSidebar()
const { scrollToCategory } = useScroll()
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  background:
    linear-gradient(120deg, rgba(37, 99, 235, 0.08), transparent 28%),
    linear-gradient(300deg, rgba(15, 118, 110, 0.08), transparent 34%),
    repeating-linear-gradient(90deg, rgba(15, 23, 42, 0.028) 0 1px, transparent 1px 80px),
    repeating-linear-gradient(0deg, rgba(15, 23, 42, 0.024) 0 1px, transparent 1px 80px),
    var(--color-background);
  color: var(--color-text);
  position: relative;
  transition: background-color var(--transition-normal);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  min-width: 0;
  position: relative;
  z-index: 1;
}

@media (max-width: 768px) {
  .app-layout {
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  .main-content {
    flex: 1;
    height: 100vh;
    margin-left: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
}
</style>
