import { ref } from 'vue'
// 导入搜索引擎logo图片
import googleLogo from '@/assets/goolge.png'
import baiduLogo from '@/assets/baidu.png'
import bingLogo from '@/assets/bing.png'
import duckLogo from '@/assets/duck.png'

/**
 * 搜索功能 composable
 */
export function useSearch() {
  const searchQuery = ref('')
  const selectedEngine = ref('google')

  // 搜索引擎配置
  const searchEngines = {
    google: {
      url: 'https://www.google.com/search?q=',
      icon: googleLogo,
      placeholder: 'Google 搜索'
    },
    baidu: {
      url: 'https://www.baidu.com/s?wd=',
      icon: baiduLogo,
      placeholder: '百度一下'
    },
    bing: {
      url: 'https://www.bing.com/search?q=',
      icon: bingLogo,
      placeholder: 'Bing 搜索'
    },
    duckduckgo: {
      url: 'https://duckduckgo.com/?q=',
      icon: duckLogo,
      placeholder: 'DuckDuckGo 搜索'
    }
  }

  // 处理搜索
  const handleSearch = () => {
    if (!searchQuery.value.trim()) return

    const engine = searchEngines[selectedEngine.value]
    const url = engine.url + encodeURIComponent(searchQuery.value)
    window.open(url, '_blank')
  }

  return {
    searchQuery,
    selectedEngine,
    searchEngines,
    handleSearch
  }
}
