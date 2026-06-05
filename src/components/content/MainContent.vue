<template>
  <div class="content-area">
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>正在整理导航...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="$emit('retry')" class="retry-btn">重试</button>
    </div>
    
    <div v-else class="content-shell">
      <section class="content-overview">
        <div>
          <p class="overview-kicker">Personal Navigation</p>
          <h1>{{ title }}</h1>
        </div>
        <div class="overview-stats" aria-label="导航统计">
          <span>{{ categories.length }} 分类</span>
          <span>{{ totalSites }} 站点</span>
        </div>
      </section>

      <div class="categories-container">
        <CategorySection
          v-for="category in categories"
          :key="category.id"
          :category="category"
        />
      </div>

      <AppFooter />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import CategorySection from './CategorySection.vue'
import AppFooter from '../layout/AppFooter.vue'

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: '梅零落的导航'
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  }
})

// Emits
defineEmits(['retry'])

const countSites = (items = []) => items.reduce((total, category) => {
  const ownSites = category.sites?.length || 0
  const nestedSites = category.categories ? countSites(category.categories) : 0
  return total + ownSites + nestedSites
}, 0)

const totalSites = computed(() => countSites(props.categories))
</script>

<style scoped>
.content-area {
  flex: 1;
  padding: 34px clamp(20px, 4vw, 54px) 56px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
  min-height: 0;
  scroll-padding-top: 110px;
}

.content-area::-webkit-scrollbar {
  width: 10px;
}

.content-area::-webkit-scrollbar-track {
  background: transparent;
}

.content-area::-webkit-scrollbar-thumb {
  background: rgba(100, 116, 139, 0.24);
  border: 3px solid transparent;
  border-radius: 999px;
  background-clip: content-box;
}

.content-area::-webkit-scrollbar-thumb:hover {
  background-color: rgba(37, 99, 235, 0.36);
}

.content-shell {
  width: min(100%, 1360px);
  margin: 0 auto;
  animation: fadeInUp 0.55s var(--ease-spring);
}

.content-overview {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  padding: 8px 2px 30px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.22);
}

.overview-kicker {
  margin: 0 0 10px;
  color: var(--color-accent);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.content-overview h1 {
  margin: 0;
  color: var(--color-heading);
  font-size: clamp(32px, 5vw, 58px);
  font-weight: 900;
  line-height: 1.02;
}

.overview-stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
  flex-shrink: 0;
}

.overview-stats span {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 7px 13px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.64);
  color: var(--color-text-muted);
  font-size: 13px;
  font-weight: 700;
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(14px);
}

.loading,
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 160px);
  color: var(--color-text-muted);
}

.loading-spinner {
  width: 46px;
  height: 46px;
  border: 4px solid rgba(37, 99, 235, 0.12);
  border-top: 4px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-btn {
  margin-top: 10px;
  padding: 10px 18px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: var(--shadow-glow);
}

.categories-container {
  margin: 34px auto 0;
  width: 100%;
  box-sizing: border-box;
}

:global(.dark) .content-area {
  background: #0f172a;
}

@media (max-width: 768px) {
  .content-area {
    flex: 1;
    padding: 104px 16px 72px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .content-overview {
    align-items: flex-start;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 24px;
  }

  .overview-stats {
    justify-content: flex-start;
  }

  .categories-container {
    margin-top: 28px;
  }
}
</style>
