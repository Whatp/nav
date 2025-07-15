export function useGitHubAPI() {
  const GITHUB_API_BASE = 'https://api.github.com'

  // 从环境变量获取配置
  const getConfig = () => {
    const token = import.meta.env.VITE_GITHUB_TOKEN
    const owner = import.meta.env.VITE_GITHUB_OWNER
    const repo = import.meta.env.VITE_GITHUB_REPO
    const branch = import.meta.env.VITE_GITHUB_BRANCH

    if (!token) {
      throw new Error('GitHub Token 未配置，请在环境变量中设置 VITE_GITHUB_TOKEN')
    }
    if (!owner) {
      throw new Error('GitHub Owner 未配置，请在环境变量中设置 VITE_GITHUB_OWNER')
    }
    if (!repo) {
      throw new Error('GitHub Repo 未配置，请在环境变量中设置 VITE_GITHUB_REPO')
    }
    if (!branch) {
      throw new Error('GitHub Branch 未配置，请在环境变量中设置 VITE_GITHUB_BRANCH')
    }

    return { token, owner, repo, branch }
  }

  // 获取文件内容
  const getFileContent = async (path) => {
    const { token, owner, repo } = getConfig()

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`

    // 创建超时控制
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10秒超时

    try {
      console.log('发送GitHub API请求:', url)
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'X-GitHub-Api-Version': '2022-11-28'
        },
        signal: controller.signal
      })

      clearTimeout(timeoutId)
      console.log('GitHub API响应状态:', response.status, response.statusText)

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        try {
          const error = await response.json()
          errorMessage = `GitHub API Error: ${error.message}`
        } catch {
          // 如果无法解析错误响应，使用基本错误信息
          console.log('无法解析GitHub API错误响应')
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      console.log('GitHub API响应数据:', data)

      if (!data.content) {
        throw new Error('GitHub API返回的数据中没有content字段')
      }

      return {
        content: decodeURIComponent(escape(atob(data.content))), // 正确处理中文解码
        sha: data.sha,
        path: data.path
      }
    } catch (error) {
      clearTimeout(timeoutId)
      console.error('GitHub API请求失败:', error)

      if (error.name === 'AbortError') {
        throw new Error('请求超时，请检查网络连接')
      }

      // 检查是否是CORS相关错误
      if (error.message.includes('CORS') || error.message.includes('Network')) {
        throw new Error('网络请求失败，可能是CORS问题或网络连接问题')
      }

      // 检查是否是认证相关错误
      if (error.message.includes('401') || error.message.includes('403')) {
        throw new Error('GitHub认证失败，请检查GITHUB_TOKEN是否正确配置')
      }

      // 检查是否是环境变量配置错误
      if (error.message.includes('VITE_GITHUB')) {
        throw new Error('环境变量配置错误：' + error.message)
      }

      throw error
    }
  }

  // 更新文件内容
  const updateFileContent = async (path, content, message, sha) => {
    const { token, owner, repo, branch } = getConfig()

    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`

    // 创建超时控制
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15秒超时

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          content: btoa(unescape(encodeURIComponent(content))), // 处理中文编码
          sha,
          branch
        }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`GitHub API Error: ${error.message}`)
      }

      return await response.json()
    } catch (error) {
      clearTimeout(timeoutId)
      if (error.name === 'AbortError') {
        throw new Error('保存超时，请检查网络连接')
      }
      throw error
    }
  }

  // 生成mock_data.js文件内容
  const generateMockDataContent = (data) => {
    const formattedData = JSON.stringify(data, null, 2)
    return `export const mockData = ${formattedData}
`
  }

  // 从GitHub加载分类数据
  const loadCategoriesFromGitHub = async () => {
    try {
      const file = await getFileContent('src/mock/mock_data.js')

      // 解析JavaScript文件内容
      const content = file.content
      const exportMatch = content.match(/export const mockData = ({[\s\S]*})/)

      if (!exportMatch) {
        throw new Error('无法解析mock_data.js文件格式')
      }

      // 安全地解析JSON内容
      const dataString = exportMatch[1]
      const data = JSON.parse(dataString)

      return {
        ...data,
        _fileSha: file.sha
      }
    } catch (error) {
      console.error('从GitHub加载数据失败:', error)
      throw error
    }
  }

  // 保存分类数据到GitHub
  const saveCategoriesToGitHub = async (data) => {
    try {
      // 首先获取当前文件的SHA
      const currentFile = await getFileContent('src/mock/mock_data.js')

      // 生成新的文件内容
      const newContent = generateMockDataContent(data)

      // 提交信息
      const message = `chore: 更新导航数据 - ${new Date().toLocaleString('zh-CN')}`

      // 更新文件
      const result = await updateFileContent(
        'src/mock/mock_data.js',
        newContent,
        message,
        currentFile.sha
      )

      return result
    } catch (error) {
      console.error('保存到GitHub失败:', error)
      throw error
    }
  }

  // 验证GitHub连接
  const verifyGitHubConnection = async () => {
    try {
      const { token, owner, repo } = getConfig()

      const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}`
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      })

      if (!response.ok) {
        throw new Error('GitHub连接失败')
      }

      const repoInfo = await response.json()
      return {
        connected: true,
        repo: repoInfo.full_name,
        permissions: repoInfo.permissions
      }
    } catch (error) {
      return {
        connected: false,
        error: error.message
      }
    }
  }

  return {
    loadCategoriesFromGitHub,
    saveCategoriesToGitHub,
    verifyGitHubConnection,
    getFileContent,
    updateFileContent
  }
}
