import { ref } from 'vue'

/**
 * 移动端菜单管理 composable
 */
export function useMobileMenu() {
  const showMobileMenu = ref(false)

  // 切换移动端菜单
  const toggleMobileMenu = () => {
    showMobileMenu.value = !showMobileMenu.value
  }

  // 关闭移动端菜单
  const closeMobileMenu = () => {
    showMobileMenu.value = false
  }

  // 移动端分类滚动（带菜单关闭）
  const scrollToCategoryMobile = (categoryId, scrollToCategory) => {
    closeMobileMenu() // 先关闭菜单

    // 稍微延迟一下再滚动，确保菜单关闭动画完成
    setTimeout(() => {
      scrollToCategory(categoryId)
    }, 200)
  }

  return {
    showMobileMenu,
    toggleMobileMenu,
    closeMobileMenu,
    scrollToCategoryMobile
  }
}
