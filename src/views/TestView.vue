<template>
  <div class="test-page">
    <h1>🔍 GitHub API 调试页面</h1>

    <div class="test-section">
      <h2>环境变量检查</h2>
      <button @click="checkEnvVars">检查环境变量</button>
      <div v-if="envResult" class="results">
        <pre>{{ envResult }}</pre>
      </div>
    </div>

    <!-- <div class="test-section">
      <h2>GitHub API 测试</h2>
      <button @click="testGitHubAPI" :disabled="apiTesting">
        {{ apiTesting ? '测试中...' : '测试GitHub API' }}
      </button>
      <div v-if="apiResult" class="results">
        <h3>API响应结果：</h3>
        <div class="api-info">
          <p><strong>状态:</strong> {{ apiResult.status }}</p>
          <p><strong>URL:</strong> {{ apiResult.url }}</p>
          <p><strong>Headers:</strong></p>
          <pre>{{ apiResult.headers }}</pre>
          <p><strong>响应内容:</strong></p>
          <pre>{{ apiResult.response }}</pre>
        </div>
      </div>
    </div>

    <div class="test-section">
      <h2>直接调用useGitHubAPI</h2>
      <button @click="testUseGitHubAPI" :disabled="githubTesting">
        {{ githubTesting ? '测试中...' : '测试loadCategoriesFromGitHub' }}
      </button>
      <div v-if="githubResult" class="results">
        <pre>{{ githubResult }}</pre>
      </div>
    </div> -->
  </div>
</template>

<script setup>
// import { ref } from 'vue'
// import { useGitHubAPI } from '@/apis/useGitHubAPI.js'

// const envResult = ref('')
// const apiResult = ref(null)
// const githubResult = ref('')
// const apiTesting = ref(false)
// const githubTesting = ref(false)

const checkEnvVars = () => {
  const result = {
    '当前环境': import.meta.env.MODE,
    '构建时间': new Date().toLocaleString(),
    '域名': window.location.hostname,
    '环境变量检查': {
      VITE_ADMIN_PASSWORD: import.meta.env.VITE_ADMIN_PASSWORD ? '已配置' : '未配置',
      VITE_GITHUB_TOKEN: import.meta.env.VITE_GITHUB_TOKEN ?
        `已配置 (${import.meta.env.VITE_GITHUB_TOKEN.substring(0, 10)}...)` : '未配置',
      VITE_GITHUB_OWNER: import.meta.env.VITE_GITHUB_OWNER || '未配置',
      VITE_GITHUB_REPO: import.meta.env.VITE_GITHUB_REPO || '未配置',
      VITE_GITHUB_BRANCH: import.meta.env.VITE_GITHUB_BRANCH || '未配置'
    }
  }

  // envResult.value = JSON.stringify(result, null, 2)
  console.log('环境变量测试结果:', result)
}

// const testGitHubAPI = async () => {
//   apiTesting.value = true

//   try {
//     const token = import.meta.env.VITE_GITHUB_TOKEN
//     const owner = import.meta.env.VITE_GITHUB_OWNER
//     const repo = import.meta.env.VITE_GITHUB_REPO

//     if (!token || !owner || !repo) {
//       apiResult.value = {
//         status: 'ERROR',
//         url: 'N/A',
//         headers: 'N/A',
//         response: '环境变量未配置完整'
//       }
//       return
//     }

//     const url = `https://api.github.com/repos/${owner}/${repo}/contents/src/mock/mock_data.js`

//     const response = await fetch(url, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Accept': 'application/vnd.github.v3+json',
//         'X-GitHub-Api-Version': '2022-11-28'
//       }
//     })

//     const responseHeaders = {}
//     for (const [key, value] of response.headers.entries()) {
//       responseHeaders[key] = value
//     }

//     const responseText = await response.text()
//     let parsedResponse
//     try {
//       parsedResponse = JSON.parse(responseText)
//     } catch {
//       parsedResponse = responseText
//     }

//     apiResult.value = {
//       status: `${response.status} ${response.statusText}`,
//       url: url,
//       headers: JSON.stringify(responseHeaders, null, 2),
//       response: typeof parsedResponse === 'object' ?
//         JSON.stringify(parsedResponse, null, 2) : parsedResponse
//     }
//   } catch (error) {
//     apiResult.value = {
//       status: 'ERROR',
//       url: 'N/A',
//       headers: 'N/A',
//       response: error.message
//     }
//   } finally {
//     apiTesting.value = false
//   }
// }

// const testUseGitHubAPI = async () => {
//   githubTesting.value = true

//   try {
//     const { loadCategoriesFromGitHub } = useGitHubAPI()
//     const result = await loadCategoriesFromGitHub()
//     githubResult.value = JSON.stringify(result, null, 2)
//   } catch (error) {
//     githubResult.value = `错误: ${error.message}`
//   } finally {
//     githubTesting.value = false
//   }
// }
</script>

<style scoped>
.test-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.test-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.test-section h2 {
  margin-top: 0;
  color: #333;
}

.results {
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 5px;
  max-height: 400px;
  overflow-y: auto;
}

.api-info {
  text-align: left;
}

.api-info p {
  margin: 10px 0;
}

pre {
  background: white;
  padding: 10px;
  border-radius: 3px;
  overflow-x: auto;
  font-size: 12px;
  line-height: 1.4;
}

button {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background: #0056b3;
}
</style>
