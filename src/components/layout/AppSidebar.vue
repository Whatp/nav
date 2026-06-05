<template>
  <aside class="sidebar" :class="{ collapsed }">
    <div class="logo-section">
      <div class="brand-mark">
        <img :src="logoUrl" alt="logo" class="logo" />
      </div>
      <div v-show="!collapsed" class="brand-copy">
        <h1 class="site-title">{{ title }}</h1>
        <p>Navigation</p>
      </div>
    </div>

    <nav class="category-nav" aria-label="分类导航">
      <h2 class="nav-title" v-show="!collapsed">导航分类</h2>
      <ul class="category-list">
        <template v-for="category in categories" :key="category.id">
          <li
            class="category-item"
            :class="{
              active: activeCategoryId === category.id,
              'has-subcategories': category.categories && category.categories.length > 0
            }"
            :title="collapsed ? category.name : undefined"
            @click="handleCategoryClick(category.id)"
          >
            <div class="category-icon-wrapper">
              <span class="category-icon">{{ category.icon }}</span>
              <div v-if="collapsed" class="tooltip">{{ category.name }}</div>
            </div>
            <span class="category-name" v-show="!collapsed">{{ category.name }}</span>
            <span
              v-if="category.categories && category.categories.length > 0 && !collapsed"
              class="expand-icon"
              :class="{ expanded: expandedCategories[category.id] }"
              aria-hidden="true"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="m7 10 5 5 5-5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </li>

          <template v-if="category.categories && category.categories.length > 0 && expandedCategories[category.id] && !collapsed">
            <li
              v-for="subCategory in category.categories"
              :key="subCategory.id"
              class="subcategory-item"
              :class="{ active: activeCategoryId === subCategory.id }"
              @click.stop="handleSubCategoryClick(subCategory.id)"
            >
              <span class="subcategory-icon">{{ subCategory.icon }}</span>
              <span class="subcategory-name">{{ subCategory.name }}</span>
            </li>
          </template>
        </template>
      </ul>
    </nav>

    <div class="sidebar-footer">
      <a
        href="https://github.com/Whatp/nav"
        target="_blank"
        rel="noopener noreferrer"
        class="github-link"
        title="查看源码"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
          />
        </svg>
        <span v-show="!collapsed">GitHub</span>
      </a>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch } from 'vue'
import logoUrl from '@/assets/logo.png'

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

const emit = defineEmits(['toggle-sidebar', 'select-category', 'scroll-to-category'])

const expandedCategories = ref({})

watch(
  () => props.categories,
  (newCategories) => {
    if (!newCategories?.length) return

    newCategories.forEach((category) => {
      if (category.categories?.length && expandedCategories.value[category.id] === undefined) {
        expandedCategories.value[category.id] = false
      }
    })
  },
  { immediate: true }
)

const toggleSubCategory = (categoryId) => {
  expandedCategories.value[categoryId] = !expandedCategories.value[categoryId]
}

const handleCategoryClick = (categoryId) => {
  const category = props.categories.find((cat) => cat.id === categoryId)
  if (category?.categories?.length) {
    toggleSubCategory(categoryId)
    emit('select-category', categoryId)
    emit('scroll-to-category', categoryId)
    return
  }

  emit('select-category', categoryId)
  emit('scroll-to-category', categoryId)
}

const handleSubCategoryClick = (subCategoryId) => {
  emit('select-category', subCategoryId)
  emit('scroll-to-category', subCategoryId)
}
</script>

<style scoped>
.sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: var(--sidebar-width);
  min-width: var(--sidebar-width);
  max-width: var(--sidebar-width);
  height: 100vh;
  overflow: hidden;
  color: #f8fafc;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.08), transparent 32%),
    linear-gradient(135deg, var(--sidebar-bg), var(--sidebar-bg-soft) 58%, #101513);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 14px 0 40px rgba(15, 23, 42, 0.18);
  transition: width var(--transition-normal) var(--ease-spring), min-width var(--transition-normal) var(--ease-spring), max-width var(--transition-normal) var(--ease-spring);
}

.sidebar.collapsed {
  width: var(--sidebar-collapsed-width);
  min-width: var(--sidebar-collapsed-width);
  max-width: var(--sidebar-collapsed-width);
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: var(--header-height);
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.sidebar.collapsed .logo-section {
  justify-content: center;
  padding: 14px 0;
}

.brand-mark {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14);
}

.logo {
  width: 30px;
  height: 30px;
  border-radius: 10px;
  object-fit: cover;
}

.brand-copy {
  min-width: 0;
}

.site-title {
  margin: 0;
  overflow: hidden;
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
  line-height: 1.15;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.brand-copy p {
  margin: 5px 0 0;
  color: rgba(226, 232, 240, 0.66);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.category-nav {
  flex: 1;
  min-height: 0;
  padding: 18px 0 78px;
  overflow-y: auto;
  scrollbar-width: none;
}

.category-nav::-webkit-scrollbar {
  display: none;
}

.nav-title {
  margin: 0 18px 12px;
  color: rgba(226, 232, 240, 0.62);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0;
  padding: 0 10px;
}

.category-item,
.subcategory-item {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 44px;
  color: rgba(241, 245, 249, 0.78);
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 14px;
  transition: background-color var(--transition-fast), color var(--transition-fast), transform var(--transition-fast), border-color var(--transition-fast);
}

.category-item {
  gap: 11px;
  padding: 8px 10px;
}

.sidebar.collapsed .category-list {
  align-items: center;
  padding: 0 8px;
}

.sidebar.collapsed .category-item {
  justify-content: center;
  width: 50px;
  padding: 8px 0;
}

.category-item:hover,
.subcategory-item:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.08);
  transform: translateX(2px);
}

.sidebar.collapsed .category-item:hover {
  transform: translateY(-1px);
}

.category-item.active,
.subcategory-item.active {
  color: #ffffff;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.88), rgba(15, 118, 110, 0.8));
  border-color: rgba(255, 255, 255, 0.16);
  box-shadow: 0 16px 28px rgba(37, 99, 235, 0.24);
}

.category-icon-wrapper,
.subcategory-icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
}

.category-icon,
.subcategory-icon {
  font-size: 18px;
  line-height: 1;
}

.category-name,
.subcategory-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  font-size: 14px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.expand-icon {
  display: grid;
  place-items: center;
  color: rgba(226, 232, 240, 0.72);
  transition: transform var(--transition-fast);
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

.tooltip {
  position: fixed;
  left: calc(var(--sidebar-collapsed-width) + 12px);
  z-index: 9999;
  padding: 8px 11px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  pointer-events: none;
  visibility: hidden;
  background: var(--sidebar-bg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: var(--shadow-lg);
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity var(--transition-fast), transform var(--transition-fast), visibility var(--transition-fast);
}

.category-item:hover .tooltip {
  visibility: visible;
  opacity: 1;
  transform: translateX(0);
}

.subcategory-item {
  gap: 10px;
  min-height: 38px;
  margin-left: 24px;
  padding: 7px 10px;
  color: rgba(226, 232, 240, 0.68);
  border-radius: 12px;
}

.subcategory-name {
  font-size: 13px;
  font-weight: 650;
}

.sidebar-footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  padding: 10px;
  background: linear-gradient(180deg, transparent, rgba(15, 23, 42, 0.86) 28%);
}

.github-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 42px;
  color: rgba(241, 245, 249, 0.84);
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.08);
  transition: transform var(--transition-fast), background-color var(--transition-fast), color var(--transition-fast);
}

.github-link:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.14);
  transform: translateY(-1px);
}

.sidebar.collapsed .github-link {
  width: 48px;
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>
