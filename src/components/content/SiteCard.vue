<template>
  <a
    :href="site.url"
    target="_blank"
    rel="noopener noreferrer"
    class="site-card"
  >
    <div class="site-icon">
      <img :src="site.icon" :alt="site.name" @error="handleImageError" />
    </div>
    <div class="site-info">
      <h3 class="site-name">{{ site.name }}</h3>
      <p class="site-description">{{ site.description }}</p>
    </div>
  </a>
</template>

<script setup>
// Props
defineProps({
  site: {
    type: Object,
    required: true
  }
})

// 处理图片加载错误
const handleImageError = (event) => {
  event.target.style.display = 'none'
}
</script>

<style scoped>
.site-card {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
  position: relative;
  overflow: hidden;
}

.site-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(155, 89, 182, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.site-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.site-card:hover::before {
  opacity: 1;
}

.site-icon {
  width: 48px;
  height: 48px;
  margin-right: 16px;
  border-radius: 8px;
  overflow: hidden;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.site-icon img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.site-info {
  flex: 1;
  position: relative;
  z-index: 1;
}

.site-name {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 5px 0;
  color: #232a3d;
}

.site-description {
  font-size: 15px;
  color: #5a627a;
  margin: 0;
  line-height: 1.4;
}



/* 响应式设计 */
@media (max-width: 768px) {
  .site-card {
    padding: 15px;
  }
}
</style>
