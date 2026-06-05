<template>
  <section class="category-section" :id="`category-${category.id}`">
    <div class="category-heading">
      <h2 class="category-title">
        <span class="category-icon">{{ category.icon }}</span>
        <span class="category-name">{{ category.name }}</span>
      </h2>
      <span v-if="siteCount" class="category-count">{{ siteCount }} 个入口</span>
    </div>

    <div v-if="hasSubCategories" class="subcategories-container">
      <SubCategorySection
        v-for="subCategory in category.categories"
        :key="subCategory.id"
        :category="subCategory"
      />
    </div>

    <div v-else-if="hasSites" class="sites-grid">
      <SiteCard
        v-for="site in category.sites"
        :key="site.id"
        :site="site"
      />
    </div>

    <div v-else class="empty-category">
      <p>暂无内容</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import SiteCard from './SiteCard.vue'
import SubCategorySection from './SubCategorySection.vue'

const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

const hasSubCategories = computed(() => props.category.categories?.length > 0)
const hasSites = computed(() => props.category.sites?.length > 0)

const countSites = (category) => {
  const ownSites = category.sites?.length || 0
  const nestedSites = category.categories?.reduce((total, item) => total + countSites(item), 0) || 0
  return ownSites + nestedSites
}

const siteCount = computed(() => countSites(props.category))
</script>

<style scoped>
.category-section {
  scroll-margin-top: 106px;
  margin-bottom: clamp(44px, 6vw, 74px);
  animation: fadeInUp 0.55s var(--ease-spring);
}

.category-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.18);
}

.category-title {
  display: flex;
  align-items: center;
  gap: 13px;
  min-width: 0;
  margin: 0;
  color: var(--color-heading);
  cursor: default;
}

.category-title .category-icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  font-size: 24px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(15, 118, 110, 0.12));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72);
}

.category-title .category-name {
  overflow: hidden;
  font-size: clamp(24px, 3vw, 34px);
  font-weight: 900;
  line-height: 1.1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.category-count {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  min-height: 32px;
  padding: 6px 12px;
  color: var(--color-text-muted);
  font-size: 13px;
  font-weight: 800;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.66);
}

.sites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 18px;
}

.subcategories-container {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.empty-category {
  padding: 22px;
  text-align: center;
  color: var(--color-text-muted);
  border: 1px dashed rgba(148, 163, 184, 0.38);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.46);
}

.empty-category p {
  margin: 0;
}

:global(.dark) .category-title,
:global(.dark) .subcategory-title {
  color: #ffffff;
}

:global(.dark) .empty-category {
  color: #cbd5e1;
  background: rgba(15, 23, 42, 0.72);
  border-color: rgba(148, 163, 184, 0.28);
}

@media (max-width: 768px) {
  .category-section {
    scroll-margin-top: 98px;
    margin-bottom: 42px;
  }

  .category-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 16px;
  }

  .category-title .category-icon {
    width: 40px;
    height: 40px;
    font-size: 22px;
    border-radius: 14px;
  }

  .category-title .category-name {
    white-space: normal;
  }

  .sites-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
}
</style>
