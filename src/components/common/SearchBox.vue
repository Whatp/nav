<template>
  <form class="search-container" @submit.prevent="handleSearch">
    <label class="search-engine-selector" aria-label="选择搜索引擎">
      <img :src="searchEngines[selectedEngine].icon" :alt="selectedEngine" class="engine-logo" />
      <select v-model="selectedEngine" class="engine-select">
        <option value="google">Google</option>
        <option value="baidu">百度</option>
        <option value="bing">Bing</option>
        <option value="duckduckgo">DuckDuckGo</option>
      </select>
      <svg class="select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </label>

    <div class="input-shell">
      <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" />
        <path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="searchEngines[selectedEngine].placeholder"
        class="search-input"
      />
    </div>

    <button class="search-submit" type="submit" aria-label="搜索">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </form>
</template>

<script setup>
import { useSearch } from '@/composables/useSearch'

const { searchQuery, selectedEngine, searchEngines, handleSearch } = useSearch()
</script>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 760px;
  min-width: 0;
  height: 50px;
  margin: 0 auto;
  padding: 4px;
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(148, 163, 184, 0.24);
  border-radius: 18px;
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(18px);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast), transform var(--transition-fast);
}

.search-container:focus-within {
  border-color: rgba(37, 99, 235, 0.42);
  box-shadow: var(--shadow-glow);
  transform: translateY(-1px);
}

.search-engine-selector {
  position: relative;
  display: flex;
  align-items: center;
  gap: 7px;
  height: 100%;
  min-width: 58px;
  padding: 0 10px;
  color: var(--color-text-muted);
  border-radius: 14px;
  background: rgba(241, 245, 249, 0.9);
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

.search-engine-selector:hover {
  color: var(--color-primary);
  background: rgba(219, 234, 254, 0.78);
}

.engine-logo {
  width: 25px;
  height: 25px;
  object-fit: contain;
  border-radius: 6px;
  pointer-events: none;
}

.engine-select {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;
}

.select-arrow {
  pointer-events: none;
}

.input-shell {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  height: 100%;
}

.search-icon {
  position: absolute;
  left: 16px;
  color: #94a3b8;
  pointer-events: none;
}

.search-input {
  width: 100%;
  min-width: 0;
  height: 100%;
  padding: 0 14px 0 48px;
  color: var(--color-heading);
  font-size: 16px;
  font-weight: 600;
  background: transparent;
  border: none;
  outline: none;
}

.search-input::placeholder {
  color: #94a3b8;
  font-weight: 500;
}

.search-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  color: white;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  border-radius: 14px;
  box-shadow: 0 12px 24px rgba(37, 99, 235, 0.24);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), filter var(--transition-fast);
}

.search-submit:hover {
  transform: translateY(-1px);
  filter: saturate(1.08);
  box-shadow: 0 16px 30px rgba(15, 118, 110, 0.26);
}

@media (max-width: 768px) {
  .search-container {
    max-width: none;
    height: 50px;
    margin: 0;
    border-radius: 16px;
  }

  .search-engine-selector {
    min-width: 50px;
    padding: 0 8px;
  }

  .select-arrow {
    display: none;
  }

  .search-input {
    padding-left: 42px;
    font-size: 15px;
  }

  .search-submit {
    width: 40px;
    height: 40px;
  }
}
</style>
