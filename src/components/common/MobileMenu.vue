<template>
  <!-- 移动端分类菜单 -->
  <div class="mobile-menu" :class="{ active: show }">
    <div class="mobile-menu-header">
      <h3>分类导航</h3>
      <button class="close-btn" @click="$emit('close')">×</button>
    </div>
    <ul class="mobile-category-list">
      <li
        v-for="category in categories"
        :key="category.id"
        class="mobile-category-item"
        @click="$emit('scroll-to-category', category.id)"
      >
        <span class="category-icon">{{ category.icon }}</span>
        <span class="category-name">{{ category.name }}</span>
      </li>
    </ul>
  </div>

  <!-- 移动端菜单遮罩 -->
  <div class="mobile-menu-overlay" :class="{ active: show }" @click="$emit('close')"></div>
</template>

<script setup>
// Props
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  categories: {
    type: Array,
    default: () => []
  }
})

// Emits
defineEmits(['close', 'scroll-to-category'])
</script>

<style scoped>
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
  display: none;
}

@media (max-width: 768px) {
  .mobile-menu {
    display: block;
  }
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
  display: none;
}

@media (max-width: 768px) {
  .mobile-menu-overlay {
    display: block;
  }
}

.mobile-menu-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* 暗色主题 */
:global(.dark) .mobile-menu {
  background: #1a1a1a;
  color: #ffffff;
}

:global(.dark) .mobile-category-item {
  border-bottom: 1px solid #333333;
  color: #ffffff;
}

:global(.dark) .mobile-category-item:hover {
  background: #404040;
}

:global(.dark) .mobile-category-item .category-name {
  color: #ffffff;
}
</style>
