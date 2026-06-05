import { ref } from 'vue'
import googleLogo from '@/assets/goolge.png'
import baiduLogo from '@/assets/baidu.png'
import bingLogo from '@/assets/bing.png'
import duckLogo from '@/assets/duck.png'

export function useSearch() {
  const searchQuery = ref('')
  const selectedEngine = ref('google')

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

  const handleSearch = () => {
    const query = searchQuery.value.trim()
    if (!query) return

    const engine = searchEngines[selectedEngine.value]
    window.open(engine.url + encodeURIComponent(query), '_blank', 'noopener,noreferrer')
  }

  return {
    searchQuery,
    selectedEngine,
    searchEngines,
    handleSearch
  }
}
