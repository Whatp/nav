<template>
  <div class="mobile-menu" :class="{ active: show }" role="dialog" aria-label="分类导航">
    <div class="mobile-menu-header">
      <div>
        <p>Menu</p>
        <h3>分类导航</h3>
      </div>
      <button class="close-btn" @click="$emit('close')" aria-label="关闭菜单">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <ul class="mobile-category-list">
      <template v-for="category in categories" :key="category.id">
        <li
          class="mobile-category-item"
          @click="$emit('scroll-to-category', category.id)"
        >
          <span class="category-icon">{{ category.icon }}</span>
          <span class="category-name">{{ category.name }}</span>
        </li>
        <li
          v-for="subCategory in category.categories || []"
          :key="subCategory.id"
          class="mobile-category-item subcategory"
          @click="$emit('scroll-to-category', subCategory.id)"
        >
          <span class="category-icon">{{ subCategory.icon }}</span>
          <span class="category-name">{{ subCategory.name }}</span>
        </li>
      </template>
    </ul>
  </div>

  <div class="mobile-menu-overlay" :class="{ active: show }" @click="$emit('close')"></div>
</template>

<script setup>
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

defineEmits(['close', 'scroll-to-category'])
</script>

<style scoped>
.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1001;
  display: none;
  width: min(86vw, 340px);
  height: 100vh;
  overflow-y: auto;
  color: var(--color-heading);
  background:
    linear-gradient(180deg, rgba(37, 99, 235, 0.08), transparent 26%),
    rgba(255, 255, 255, 0.94);
  border-left: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: -24px 0 60px rgba(15, 23, 42, 0.18);
  transform: translateX(102%);
  transition: transform var(--transition-normal) var(--ease-spring);
  backdrop-filter: blur(22px);
}

.mobile-menu.active {
  transform: translateX(0);
}

.mobile-menu-header {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 20px;
  background: rgba(255, 255, 255, 0.82);
  border-bottom: 1px solid rgba(148, 163, 184, 0.18);
  backdrop-filter: blur(16px);
}

.mobile-menu-header p {
  margin: 0 0 4px;
  color: var(--color-accent);
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.mobile-menu-header h3 {
  margin: 0;
  color: var(--color-heading);
  font-size: 22px;
  font-weight: 900;
}

.close-btn {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  color: var(--color-heading);
  background: rgba(241, 245, 249, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 14px;
  transition: color var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
}

.close-btn:hover {
  color: var(--color-primary);
  transform: rotate(6deg);
  box-shadow: var(--shadow-md);
}

.mobile-category-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 16px 14px 32px;
}

.mobile-category-item {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 48px;
  padding: 10px 12px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 8px;
  transition: background-color var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast);
}

.mobile-category-item:hover {
  background: rgba(37, 99, 235, 0.08);
  border-color: rgba(37, 99, 235, 0.12);
  transform: translateX(2px);
}

.mobile-category-item.subcategory {
  min-height: 42px;
  margin-left: 24px;
  color: var(--color-text-muted);
  background: rgba(241, 245, 249, 0.55);
}

.mobile-category-item .category-icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  font-size: 18px;
}

.mobile-category-item .category-name {
  min-width: 0;
  overflow: hidden;
  color: inherit;
  font-size: 15px;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: none;
  visibility: hidden;
  background: rgba(15, 23, 42, 0.42);
  opacity: 0;
  transition: opacity var(--transition-normal), visibility var(--transition-normal);
  backdrop-filter: blur(2px);
}

.mobile-menu-overlay.active {
  visibility: visible;
  opacity: 1;
}

:global(.dark) .mobile-menu {
  color: #f8fafc;
  background: rgba(15, 23, 42, 0.94);
  border-color: rgba(148, 163, 184, 0.18);
}

:global(.dark) .mobile-menu-header {
  background: rgba(15, 23, 42, 0.82);
}

:global(.dark) .mobile-menu-header h3 {
  color: #f8fafc;
}

@media (max-width: 768px) {
  .mobile-menu,
  .mobile-menu-overlay {
    display: block;
  }
}
</style>
