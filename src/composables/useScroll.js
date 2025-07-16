/**
 * 滚动功能 composable
 */
export function useScroll() {
  // 自定义固定时间滚动函数
  const smoothScrollTo = (container, targetTop, duration = 600) => {
    const startTop = container.scrollTop
    const distance = targetTop - startTop
    let startTime = null

    const animateScroll = (currentTime) => {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)

      // 使用缓动函数 (easeInOutCubic)
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2

      container.scrollTop = startTop + distance * ease

      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      }
    }

    requestAnimationFrame(animateScroll)
  }

  // 滚动到指定分类
  const scrollToCategory = (categoryId) => {
    const element = document.getElementById(`category-${categoryId}`)
    const container = document.querySelector('.content-area')

    if (element && container) {
      // 检查是否为移动端
      const isMobile = window.innerWidth <= 768

      let targetTop = 0

      if (isMobile) {
        // 移动端：在 content-area 容器内滚动
        const elementOffsetTop = element.offsetTop
        const searchHeaderHeight = 80 // 固定高度，因为搜索框是fixed定位
        targetTop = elementOffsetTop - searchHeaderHeight
      } else {
        // 桌面端：在容器内滚动
        const searchHeader = document.querySelector('.search-header')
        const elementOffsetTop = element.offsetTop
        const searchHeaderHeight = searchHeader ? searchHeader.offsetHeight + 20 : 100
        targetTop = elementOffsetTop - searchHeaderHeight
      }

      // 使用固定时间滚动（600毫秒）
      smoothScrollTo(container, Math.max(0, targetTop), 600)
    }
  }

  return {
    scrollToCategory,
    smoothScrollTo
  }
}
