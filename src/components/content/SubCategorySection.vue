<template>
    <div class="subcategory-section" :id="`category-${category.id}`">
        <h3 class="subcategory-title">
            <span class="subcategory-icon">{{ category.icon }}</span>
            <span class="subcategory-name">{{ category.name }}</span>
        </h3>
        <div class="sites-grid">
            <SiteCard v-for="site in category.sites" :key="site.id" :site="site" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import SiteCard from './SiteCard.vue'

// Props
const props = defineProps({
    category: {
        type: Object,
        required: true
    }
})

</script>

<style scoped>
.subcategory-section {
    margin-bottom: 30px;
}

.subcategory-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #2c3e50;
  display: flex;
  align-items: center;
  cursor: default;
}

.subcategory-title:hover {
  cursor: default;
}

.subcategory-title .subcategory-icon {
    font-size: 24px;
    margin-right: 12px;
}

.subcategory-title .subcategory-name {
    margin-left: 8px;
    font-size: 20px;
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

    .subcategory-title {
        font-size: 20px;
        margin-bottom: 16px;
    }

    .subcategory-title .subcategory-icon {
        font-size: 20px;
        margin-right: 10px;
    }

    .subcategory-title .subcategory-name {
        font-size: 18px;
    }
}

/* 暗色主题 */
:global(.dark) .subcategory-title {
    color: #ffffff;
}

:global(.dark) .subcategory-title .subcategory-icon {
    filter: brightness(1.2);
}
</style>