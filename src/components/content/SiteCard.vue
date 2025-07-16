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
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.08), rgba(155, 89, 182, 0.08));
  border-radius: 16px;
  padding: 20px;
  text-decoration: none;
  color: inherit;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 2px solid rgba(52, 152, 219, 0.2);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.site-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.15), rgba(155, 89, 182, 0.15));
  opacity: 0;
  transition: all 0.4s ease;
  transform: scale(0.8);
}

.site-card::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: rotate(45deg) translateX(-100%);
  transition: transform 0.6s ease;
}

.site-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    0 20px 40px rgba(52, 152, 219, 0.2),
    0 10px 20px rgba(155, 89, 182, 0.15),
    0 0 0 1px rgba(52, 152, 219, 0.3);
  border-color: rgba(52, 152, 219, 0.4);
}

.site-card:hover::before {
  opacity: 1;
  transform: scale(1);
}

.site-card:hover::after {
  transform: rotate(45deg) translateX(100%);
}

.site-icon {
  width: 52px;
  height: 52px;
  margin-right: 18px;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.site-card:hover .site-icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 8px 20px rgba(52, 152, 219, 0.3);
  background: linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.9));
}

.site-icon img {
  width: 36px;
  height: 36px;
  object-fit: contain;
  transition: all 0.4s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.site-card:hover .site-icon img {
  transform: scale(1.05);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
}

.site-info {
  flex: 1;
  position: relative;
  z-index: 2;
}

.site-name {
  font-size: 19px;
  font-weight: 800;
  margin: 0 0 6px 0;
  color: #1a202c;
  transition: all 0.3s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.site-card:hover .site-name {
  color: #2d3748;
  transform: translateX(2px);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.site-description {
  font-size: 15px;
  color: #4a5568;
  margin: 0;
  line-height: 1.5;
  transition: all 0.3s ease;
  font-weight: 500;
}

.site-card:hover .site-description {
  color: #2d3748;
  transform: translateX(2px);
}



/* 响应式设计 */
@media (max-width: 768px) {
  .site-card {
    padding: 15px;
  }
}
</style>
