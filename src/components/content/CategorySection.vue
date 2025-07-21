<template>
  <section
    class="category-section"
    :id="`category-${category.id}`"
  >
    <h2 class="category-title">
      <span class="category-icon">{{ category.icon }}</span>
      <span class="category-name">{{ category.name }}</span>
    </h2>
    
    <!-- 如果有子分类，显示子分类 -->
    <div v-if="hasSubCategories" class="subcategories-container">
      <SubCategorySection
        v-for="subCategory in category.categories"
        :key="subCategory.id"
        :category="subCategory"
      />
    </div>
    
    <!-- 如果有网站，显示网站 -->
    <div v-else-if="hasSites" class="sites-grid">
      <SiteCard
        v-for="site in category.sites"
        :key="site.id"
        :site="site"
      />
    </div>
    
    <!-- 如果既没有子分类也没有网站，显示空状态 -->
    <div v-else class="empty-category">
      <p>暂无内容</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import SiteCard from './SiteCard.vue'
import SubCategorySection from './SubCategorySection.vue'

// Props
const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

// 计算属性：是否有子分类
const hasSubCategories = computed(() => {
  return props.category.categories && props.category.categories.length > 0
})

// 计算属性：是否有网站
const hasSites = computed(() => {
  return props.category.sites && props.category.sites.length > 0
})
</script>

<style scoped>
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

.subcategories-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.empty-category {
  padding: 20px;
  text-align: center;
  color: #95a5a6;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px dashed #e9ecef;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sites-grid {
    grid-template-columns: 1fr;
    gap: 15px;
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
}

/* 暗色主题 */
:global(.dark) .category-title {
  color: #ffffff;
}

:global(.dark) .category-title .category-icon {
  filter: brightness(1.2);
}

:global(.dark) .empty-category {
  background: #1e1f2a;
  color: #95a5a6;
  border-color: #333333;
}
</style>
