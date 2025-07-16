<template>
  <Transition name="fade">
    <button
      v-show="isVisible"
      @click="scrollToTop"
      class="back-to-top"
      title="返回顶部"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m18 15-6-6-6 6"/>
      </svg>
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

// 监听滚动事件
const handleScroll = () => {
  const contentArea = document.querySelector('.content-area')
  if (contentArea) {
    const scrollTop = contentArea.scrollTop
    isVisible.value = scrollTop > 300
  }
}

// 返回顶部
const scrollToTop = () => {
  const contentArea = document.querySelector('.content-area')
  if (contentArea) {
    contentArea.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

onMounted(() => {
  const contentArea = document.querySelector('.content-area')
  if (contentArea) {
    contentArea.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  const contentArea = document.querySelector('.content-area')
  if (contentArea) {
    contentArea.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
}

.back-to-top:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.6);
  background: linear-gradient(135deg, #5a67d8 0%, #667eea 100%);
}

.back-to-top:active {
  transform: translateY(-1px) scale(1.02);
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .back-to-top {
    right: 20px;
    bottom: 20px;
    width: 45px;
    height: 45px;
  }
}
</style>