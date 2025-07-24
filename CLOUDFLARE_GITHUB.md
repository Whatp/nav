# Cloudflare 部署环境中的 GitHub 权限配置

## 问题描述
在 Cloudflare Pages 部署的项目中，当尝试通过管理员界面保存更改到 GitHub 时，可能会遇到 "Resource not accessible by personal access token" 错误。

## 原因分析
这个错误通常由以下原因引起：
1. 使用了 Fine-grained Personal Access Token 而不是 Classic Token
2. Fine-grained Token 的权限配置不正确
3. Token 没有正确的仓库访问权限

## 解决方案

### 方案 1：使用 Classic Personal Access Token（推荐）

1. 访问 GitHub 的 Personal Access Tokens 页面：
   - Classic tokens: https://github.com/settings/tokens

2. 点击 "Generate new token" → "Generate new token (classic)"

3. 配置 Token：
   - **Token name**: nav-editor
   - **Expiration**: 根据需要选择（建议不超过90天）
   - **Select scopes**:
     - 勾选 `repo`（Full control of private repositories）
     - 其他权限可以保持默认

4. 点击 "Generate token"

5. 在 Cloudflare Pages 项目设置中配置环境变量：
   - `VITE_GITHUB_TOKEN`: 使用刚刚生成的 token
   - `VITE_GITHUB_OWNER`: 你的 GitHub 用户名
   - `VITE_GITHUB_REPO`: 仓库名称（通常是 nav）
   - `VITE_GITHUB_BRANCH`: 分支名称（通常是 master 或 main）

### 方案 2：正确配置 Fine-grained Personal Access Token

如果您坚持使用 Fine-grained Token，请按照以下步骤配置：

1. 访问 GitHub 的 Personal Access Tokens 页面：
   - Fine-grained tokens: https://github.com/settings/tokens?type=beta

2. 点击 "Generate new token" → "Generate new token (fine-grained)"

3. 配置 Token：
   - **Token name**: nav-editor
   - **Expiration**: 根据需要选择
   - **Repository access**:
     - 选择 "Only select repositories"
     - 选择您的导航网站仓库

4. 配置 Repository permissions：
   - `Contents`: Read and write
   - `Metadata`: Read-only

5. 点击 "Generate token"

6. 在 Cloudflare Pages 项目设置中配置相同的环境变量。

## Cloudflare Pages 环境变量配置步骤

1. 登录 Cloudflare 控制台
2. 进入 Pages 项目
3. 点击 "Settings" → "Environment variables"
4. 添加以下环境变量：
   ```
   VITE_ADMIN_PASSWORD = your_admin_password
   VITE_GITHUB_TOKEN = your_github_token
   VITE_GITHUB_OWNER = your_github_username
   VITE_GITHUB_REPO = nav
   VITE_GITHUB_BRANCH = master
   ```
5. 点击 "Save"
6. 重新部署项目以使环境变量生效

## 验证配置

1. 等待重新部署完成
2. 访问您的网站 /admin 路径
3. 使用管理员密码登录
4. 尝试保存一些更改

## 常见问题排查

### 1. Token 权限检查
确保 Token 具有正确的权限：
- Classic Token 需要有 `repo` 权限
- Fine-grained Token 需要有 `Contents: Read and write` 权限

### 2. 仓库访问权限
确保 Token 可以访问目标仓库：
- Classic Token 默认可以访问所有仓库（如果选择了 repo 权限）
- Fine-grained Token 需要明确指定可以访问的仓库

### 3. 环境变量是否生效
在管理员界面中添加调试代码来检查环境变量是否正确加载：

```javascript
// 在 AdminView.vue 的 onMounted 钩子中添加
onMounted(() => {
  console.log('GitHub 配置检查:', {
    token: import.meta.env.VITE_GITHUB_TOKEN ? '已配置' : '未配置',
    owner: import.meta.env.VITE_GITHUB_OWNER,
    repo: import.meta.env.VITE_GITHUB_REPO,
    branch: import.meta.env.VITE_GITHUB_BRANCH
  });
});
```

### 4. 网络问题
如果在 Cloudflare 环境中仍然遇到问题，可能是网络连接问题。可以在管理员界面中添加更详细的错误日志：

```javascript
// 在 useGitHubAPI.js 的 getFileContent 和 updateFileContent 函数中
console.log('GitHub API 请求详情:', {
  url,
  method: 'GET' || 'PUT',
  headers: {
    'Authorization': 'Bearer ***', // 不要输出实际的 token
    'Accept': 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28'
  }
});
```

## 安全建议

1. **Token 安全**：
   - 不要在客户端代码中硬编码 Token
   - 定期更换 Token
   - 为不同的应用创建不同的 Token

2. **权限最小化**：
   - 只给 Token 必需的最小权限
   - 使用 Fine-grained Token 可以更精确地控制权限

3. **监控和日志**：
   - 启用 GitHub Token 的使用日志
   - 监控异常的 API 调用

通过以上步骤，您应该能够解决在 Cloudflare 部署环境中遇到的 GitHub 权限问题。