import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 侧边栏状态管理 composable
 */
export function useSidebar() {
  const sidebarCollapsed = ref(false)
  const activeCategoryId = ref(null)

  // 切换侧边栏折叠状态
  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
    // 保存状态到localStorage
    localStorage.setItem('sidebarCollapsed', sidebarCollapsed.value.toString())
  }

  // 选择分类
  const selectCategory = (id) => {
    activeCategoryId.value = id
  }

  // 初始化侧边栏状态
  const initSidebar = () => {
    // 从localStorage读取保存的状态
    const saved = localStorage.getItem('sidebarCollapsed')
    if (saved !== null) {
      sidebarCollapsed.value = saved === 'true'
    }

    // 根据屏幕尺寸自动调整
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        sidebarCollapsed.value = true
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }

  onMounted(() => {
    const cleanup = initSidebar()
    onUnmounted(cleanup)
  })

  return {
    sidebarCollapsed,
    activeCategoryId,
    toggleSidebar,
    selectCategory
  }
}
