<template>
  <Transition name="fade">
    <button
      v-show="isVisible"
      @click="scrollToTop"
      class="back-to-top"
      title="返回顶部"
      aria-label="返回顶部"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m18 15-6-6-6 6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const handleScroll = () => {
  const contentArea = document.querySelector('.content-area')
  if (contentArea) {
    isVisible.value = contentArea.scrollTop > 300
  }
}

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
    contentArea.addEventListener('scroll', handleScroll, { passive: true })
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
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  color: var(--color-primary);
  cursor: pointer;
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 16px;
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(18px);
  transition: transform var(--transition-normal) var(--ease-spring), box-shadow var(--transition-normal), color var(--transition-fast);
}

.back-to-top:hover {
  color: var(--color-accent);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.back-to-top:active {
  transform: translateY(-1px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-normal), transform var(--transition-normal);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(14px) scale(0.92);
}

@media (max-width: 768px) {
  .back-to-top {
    right: 18px;
    bottom: 18px;
    width: 46px;
    height: 46px;
    border-radius: 14px;
  }
}
</style>
