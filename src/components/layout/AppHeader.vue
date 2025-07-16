<template>
  <header class="search-header">
    <!-- 侧边栏折叠按钮 -->
    <button 
      class="collapse-btn" 
      @click="$emit('toggle-sidebar')" 
      :title="sidebarCollapsed ? '展开侧边栏' : '收起侧边栏'"
    >
      <svg v-if="!sidebarCollapsed" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="6" width="16" height="2" rx="1" fill="#2c3e50"/>
        <rect x="4" y="11" width="16" height="2" rx="1" fill="#2c3e50"/>
        <rect x="4" y="16" width="16" height="2" rx="1" fill="#2c3e50"/>
        <polygon points="19,12 15,9 15,15" fill="#2c3e50"/>
      </svg>
      <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="6" width="16" height="2" rx="1" fill="#2c3e50"/>
        <rect x="4" y="11" width="16" height="2" rx="1" fill="#2c3e50"/>
        <rect x="4" y="16" width="16" height="2" rx="1" fill="#2c3e50"/>
        <polygon points="5,12 9,9 9,15" fill="#2c3e50"/>
      </svg>
    </button>
    
    <!-- 搜索容器 -->
    <SearchBox />
    


    <!-- 移动端菜单按钮 -->
    <button class="mobile-menu-btn" @click="toggleMobileMenu">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>

    <!-- 移动端分类菜单 -->
    <MobileMenu 
      :show="showMobileMenu"
      :categories="categories"
      @close="closeMobileMenu"
      @scroll-to-category="handleMobileScroll"
    />
  </header>
</template>

<script setup>
import { useMobileMenu } from '@/composables/useMobileMenu'
import SearchBox from '../common/SearchBox.vue'
import MobileMenu from '../common/MobileMenu.vue'

// Props
defineProps({
  sidebarCollapsed: {
    type: Boolean,
    default: false
  },
  categories: {
    type: Array,
    default: () => []
  }
})

// Emits
const emit = defineEmits(['toggle-sidebar', 'scroll-to-category'])

// 移动端菜单
const { showMobileMenu, toggleMobileMenu, closeMobileMenu, scrollToCategoryMobile } = useMobileMenu()

// 处理移动端滚动
const handleMobileScroll = (categoryId) => {
  scrollToCategoryMobile(categoryId, (id) => emit('scroll-to-category', id))
}
</script>

<style scoped>
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

/* 响应式设计 */
@media (max-width: 768px) {
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

  .mobile-menu-btn {
    display: block; /* 在移动端显示菜单按钮 */
    flex-shrink: 0;
  }
}
</style>
