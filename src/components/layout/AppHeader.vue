<template>
  <header class="search-header">
    <button
      class="collapse-btn"
      @click="$emit('toggle-sidebar')"
      :title="sidebarCollapsed ? '展开侧边栏' : '收起侧边栏'"
      :aria-label="sidebarCollapsed ? '展开侧边栏' : '收起侧边栏'"
    >
      <svg v-if="!sidebarCollapsed" width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 6.5h16M4 12h11M4 17.5h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <path d="m18 9 3 3-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 6.5h16M9 12h11M4 17.5h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        <path d="m6 9-3 3 3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <SearchBox />

    <button class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="打开分类菜单">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>

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

const emit = defineEmits(['toggle-sidebar', 'scroll-to-category'])

const { showMobileMenu, toggleMobileMenu, closeMobileMenu, scrollToCategoryMobile } = useMobileMenu()

const handleMobileScroll = (categoryId) => {
  scrollToCategoryMobile(categoryId, (id) => emit('scroll-to-category', id))
}
</script>

<style scoped>
.search-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: var(--header-height);
  padding: 12px clamp(16px, 3vw, 34px);
  background: rgba(255, 255, 255, 0.72);
  border-bottom: 1px solid rgba(255, 255, 255, 0.72);
  box-shadow: 0 1px 0 rgba(148, 163, 184, 0.18);
  backdrop-filter: blur(22px) saturate(150%);
}

.collapse-btn,
.mobile-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  color: var(--color-heading);
  background: var(--surface-strong);
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 14px;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), color var(--transition-fast);
}

.collapse-btn:hover,
.mobile-menu-btn:hover {
  color: var(--color-primary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.mobile-menu-btn {
  display: none;
}

@media (max-width: 768px) {
  .search-header {
    position: fixed;
    right: 0;
    left: 0;
    min-height: 78px;
    padding: 14px 16px;
    background: rgba(246, 248, 251, 0.82);
    box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);
  }

  .collapse-btn {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }
}
</style>
