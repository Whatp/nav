<template>
  <div class="search-container">
    <div class="search-engine-selector">
      <img :src="searchEngines[selectedEngine].icon" :alt="selectedEngine" class="engine-logo" />
      <select v-model="selectedEngine" class="engine-select">
        <option value="google">Google</option>
        <option value="baidu">百度</option>
        <option value="bing">Bing</option>
        <option value="duckduckgo">DuckDuckGo</option>
      </select>
    </div>
    <input type="text" v-model="searchQuery" :placeholder="searchEngines[selectedEngine].placeholder"
      class="search-input" @keyup.enter="handleSearch" />
  </div>
</template>

<script setup>
import { useSearch } from '@/composables/useSearch'

// 使用搜索功能
const { searchQuery, selectedEngine, searchEngines, handleSearch } = useSearch()
</script>

<style scoped>
.search-container {
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  gap: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  flex: 1;
  border: 2px solid #e3e8f0;
  background: #fff;
}

.search-engine-selector {
  position: relative;
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border-right: 1px solid #e9ecef;
  transition: background-color 0.2s ease;
}

.search-engine-selector:hover {
  background: #e9ecef;
}

.engine-logo {
  width: 24px;
  height: 24px;
  margin: 8px;
  object-fit: contain;
  pointer-events: none;
  border-radius: 4px;
}

.engine-select {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;
}

.search-input {
  flex: 1;
  border: none;
  padding: 12px 16px;
  font-size: 16px;
  outline: none;
  background: white;
}

.search-input::placeholder {
  color: #95a5a6;
}



/* 响应式设计 */
@media (max-width: 768px) {
  .search-container {
    margin: 0;
    max-width: none;
  }
}
</style>
