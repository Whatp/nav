<template>
  <section
    class="category-section"
    :id="`category-${category.id}`"
  >
    <h2 class="category-title">
      <span class="category-icon">{{ category.icon }}</span>
      <span class="category-name">{{ category.name }}</span>
    </h2>
    <div class="sites-grid">
      <SiteCard
        v-for="site in category.sites"
        :key="site.id"
        :site="site"
      />
    </div>
  </section>
</template>

<script setup>
import SiteCard from './SiteCard.vue'

// Props
defineProps({
  category: {
    type: Object,
    required: true
  }
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
</style>
