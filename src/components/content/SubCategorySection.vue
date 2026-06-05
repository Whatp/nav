<template>
  <div class="subcategory-section" :id="`category-${category.id}`">
    <div class="subcategory-heading">
      <h3 class="subcategory-title">
        <span class="subcategory-icon">{{ category.icon }}</span>
        <span class="subcategory-name">{{ category.name }}</span>
      </h3>
      <span v-if="category.sites?.length" class="subcategory-count">{{ category.sites.length }}</span>
    </div>
    <div class="sites-grid">
      <SiteCard v-for="site in category.sites" :key="site.id" :site="site" />
    </div>
  </div>
</template>

<script setup>
import SiteCard from './SiteCard.vue'

defineProps({
  category: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.subcategory-section {
  scroll-margin-top: 106px;
}

.subcategory-heading {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.subcategory-title {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  margin: 0;
  color: var(--color-heading);
  cursor: default;
}

.subcategory-title .subcategory-icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  font-size: 20px;
  border-radius: 13px;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.2);
}

.subcategory-title .subcategory-name {
  overflow: hidden;
  color: var(--color-heading);
  font-size: 20px;
  font-weight: 850;
  line-height: 1.15;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.subcategory-count {
  display: grid;
  place-items: center;
  min-width: 28px;
  height: 28px;
  padding: 0 8px;
  color: var(--color-text-muted);
  font-size: 12px;
  font-weight: 800;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.68);
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.sites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 18px;
}

:global(.dark) .subcategory-title,
:global(.dark) .subcategory-title .subcategory-name {
  color: #ffffff;
}

@media (max-width: 768px) {
  .subcategory-section {
    scroll-margin-top: 98px;
  }

  .subcategory-title .subcategory-name {
    font-size: 18px;
    white-space: normal;
  }

  .sites-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
}
</style>
