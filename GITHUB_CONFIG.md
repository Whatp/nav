# GitHub 权限配置说明

## 问题描述
当您在管理员界面尝试保存更改到GitHub时，可能会遇到"没有权限"的错误。这通常是由于GitHub Token未正确配置或权限不足导致的。

## 解决方案

### 1. 创建 GitHub Personal Access Token

1. 访问 GitHub 设置页面：https://github.com/settings/tokens
2. 点击 "Generate new token" → "Generate new token (classic)"
3. 设置 Token 名称，例如 "nav-editor"
4. 选择合适的过期时间
5. 在权限部分，选择以下权限：
   - `repo` - Full control of private repositories
     - `repo:status` - Access commit status
     - `repo_deployment` - Access deployment status
     - `public_repo` - Access public repositories
     - `repo:invite` - Access repository invitations

### 2. 配置环境变量

1. 在项目根目录下创建 `.env` 文件（如果还没有的话）
2. 复制 `.env.example` 文件的内容到 `.env` 文件
3. 修改以下配置项：

```
# GitHub API 配置（用于管理员界面编辑数据）
VITE_GITHUB_TOKEN=your_github_token_here
VITE_GITHUB_OWNER=your_github_username
VITE_GITHUB_REPO=nav
VITE_GITHUB_BRANCH=main
```

将 `your_github_token_here` 替换为您在第一步中创建的GitHub Personal Access Token。
将 `your_github_username` 替换为您的GitHub用户名。

### 3. 验证配置

1. 重启开发服务器
2. 访问管理员界面 `/admin`
3. 登录后尝试保存更改

### 4. 常见问题排查

1. **Token权限不足**：确保Token具有repo权限
2. **Token过期**：检查Token是否已过期，如果过期需要重新生成
3. **环境变量未生效**：确保在启动开发服务器前配置好环境变量
4. **仓库名称错误**：确保VITE_GITHUB_REPO配置正确
5. **"Resource not accessible by personal access token"错误**：
   - 如果您使用的是Fine-grained tokens而不是Classic tokens，可能需要额外的配置
   - 确保Token具有对目标仓库的写入权限
   - 检查Token的Repository permissions设置：
     - `Contents`: Read and write
     - `Metadata`: Read-only

### 5. 更详细的错误信息

如果您仍然遇到问题，可以在浏览器控制台中查看更详细的错误信息，或者在管理员界面中添加以下代码来显示详细错误：

```javascript
// 在 AdminView.vue 中的 saveToGitHub 函数中
catch (error) {
  console.error('保存到GitHub失败的详细信息:', error);
  showDialog(
    'error',
    '❌ 保存失败',
    '保存过程中发生错误，请重试',
    [
      `• 错误详情: ${error.message}`,
      `• 错误类型: ${error.constructor.name}`,
      `• 完整错误对象: ${JSON.stringify(error, null, 2)}`
    ]
  )
}
```

这样可以帮助您更好地诊断问题。