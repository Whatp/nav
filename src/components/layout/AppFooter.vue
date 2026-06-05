<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>关于本站</h3>
        <p>梅零落的个人导航网站，收录常用网站和工具，让日常访问更集中、更轻松。</p>
      </div>

      <div class="footer-section">
        <h3>友情链接</h3>
        <div class="footer-links">
          <a href="https://wordpress.meilingluo.cn" target="_blank" rel="noopener noreferrer" class="footer-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
              />
            </svg>
            我的博客
          </a>
          <a href="https://github.com/whatp" target="_blank" rel="noopener noreferrer" class="footer-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>梅零落的导航</p>
      <p>Built with Vue.js & Vite</p>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.app-footer {
  margin-top: clamp(54px, 7vw, 92px);
  padding: 34px clamp(18px, 4vw, 42px);
  color: var(--color-text);
  background: rgba(255, 255, 255, 0.62);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(16px);
}

.footer-content {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(260px, 0.8fr);
  gap: 34px;
}

.footer-section h3 {
  margin: 0 0 12px;
  color: var(--color-heading);
  font-size: 16px;
  font-weight: 900;
}

.footer-section p {
  max-width: 680px;
  margin: 0;
  color: var(--color-text-muted);
  font-size: 14px;
  line-height: 1.7;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 38px;
  padding: 8px 12px;
  color: var(--color-heading);
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
  background: rgba(241, 245, 249, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 8px;
  transition: color var(--transition-fast), transform var(--transition-fast), border-color var(--transition-fast), background-color var(--transition-fast);
}

.footer-link:hover {
  color: var(--color-primary);
  background: rgba(219, 234, 254, 0.7);
  border-color: rgba(37, 99, 235, 0.24);
  transform: translateY(-1px);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 28px;
  padding-top: 20px;
  color: var(--color-text-muted);
  border-top: 1px solid rgba(148, 163, 184, 0.18);
}

.footer-bottom p {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
}

@media (max-width: 768px) {
  .app-footer {
    padding: 26px 18px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .footer-bottom {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
