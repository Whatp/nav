<template>
  <div class="content-area">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>
    
    <!-- 错误状态 -->
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="$emit('retry')" class="retry-btn">重试</button>
    </div>
    
    <!-- 分类内容 -->
    <div v-else class="categories-container card-style">
      <CategorySection
        v-for="category in categories"
        :key="category.id"
        :category="category"
      />
    </div>
  </div>
</template>

<script setup>
import CategorySection from './CategorySection.vue'

// Props
defineProps({
  categories: {
    type: Array,
    default: () => []
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
</script>

<style scoped>
/* 内容区域样式 */
.content-area {
  flex: 1;
  padding: 30px;
  padding-bottom: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
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
  width: 100%;
  box-sizing: border-box;
}

/* 主体卡片样式 */
.card-style {
  background: #fff;
  border-radius: 28px;
  box-shadow: 0 2px 12px 0 rgba(120,130,255,0.06) inset, 0 4px 32px 0 rgba(80, 100, 150, 0.10);
  border: 2px solid #e3e8f0;
  padding: 32px 32px 48px 32px;
  margin: 32px auto 0 auto;
  max-width: 1200px;
  width: 100%;
  box-sizing: border-box;
  transition: background 0.3s, color 0.3s, border 0.3s;
  color: #232a3d;
}

/* 暗色主题 */
:global(.dark) .card-style {
  background: #1a1a1a;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.3) inset, 0 4px 32px 0 rgba(0,0,0,0.5);
  color: #ffffff;
  border: 2px solid #333333;
}

:global(.dark) .content-area {
  background: #000000;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-area {
    flex: 1;
    padding: 20px 15px;
    padding-top: 100px; /* 为固定的搜索框留出空间 */
    padding-bottom: 100px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; /* iOS平滑滚动 */
  }
}
</style>
