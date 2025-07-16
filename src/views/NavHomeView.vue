<template>
  <AppLayout
    :categories="categories"
    :title="title"
  >
    <MainContent
      :categories="categories"
      :loading="loading"
      :error="error"
      @retry="fetchCategories"
    />
  </AppLayout>
</template>

<script setup>
import { onMounted } from 'vue'
import { useNavigation } from '@/apis/useNavigation.js'
import AppLayout from '@/components/layout/AppLayout.vue'
import MainContent from '@/components/content/MainContent.vue'

// 使用导航API
const { categories, title, loading, error, fetchCategories } = useNavigation()

// 组件挂载时获取数据
onMounted(() => {
  fetchCategories()
})
</script>



