<template>
    <footer class="app-footer">
        <div class="footer-content">
            <div class="footer-section">
                <h3>关于本站</h3>
                <p>梅零落的个人导航网站，收录优质网站和工具，让你的网络生活更高效。</p>
            </div>

            <div class="footer-section">
                <h3>友情链接</h3>
                <div class="footer-links">
                    <a href="https://wordpress.meilingluo.cn" target="_blank" rel="noopener noreferrer"
                        class="footer-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                        </svg>
                        我的博客
                    </a>
                    <a href="https://github.com/whatp" target="_blank" rel="noopener noreferrer" class="footer-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                    </a>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <div class="copyright">
                <p>&copy; 2025 梅零落的导航. All rights reserved.</p>
                <p>Built with ❤️ using Vue.js & Vite</p>
            </div>
        </div>
    </footer>
</template>

<script setup>
// 页脚组件
</script>

<style scoped>
.app-footer {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 50px 0 30px;
    margin-top: 80px;
    border-radius: 32px 32px 0 0;
    box-shadow: 0 -10px 30px rgba(102, 126, 234, 0.2);
    position: relative;
    overflow: hidden;
}

/* 添加装饰性圆形 */
.app-footer::before {
    content: '';
    position: absolute;
    top: -80px;
    right: -80px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    z-index: 1;
}

.app-footer::after {
    content: '';
    position: absolute;
    bottom: -60px;
    left: 10%;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    z-index: 1;
}

.footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 30px;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 40px;
}

.footer-section h3 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 18px;
    color: rgba(255, 255, 255, 1);
    position: relative;
    display: inline-block;
    padding-bottom: 8px;
}

.footer-section h3::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 10px;
}

.footer-section p {
    font-size: 15px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.85);
    margin: 0;
    padding: 0 0 0 2px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.footer-links {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.footer-link {
    display: flex;
    align-items: center;
    gap: 10px;
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    padding: 10px 16px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.footer-link:hover {
    color: white;
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-3px) translateX(2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
}

.footer-bottom {
    position: relative;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    margin-top: 40px;
    padding-top: 25px;
    z-index: 2;
}

.footer-bottom::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 10px;
}

.copyright {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 30px;
    text-align: center;
    position: relative;
}

.copyright p {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    margin: 6px 0;
    letter-spacing: 0.5px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.copyright p:last-child {
    margin-top: 8px;
    font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .footer-content {
        grid-template-columns: 1fr;
        gap: 30px;
        padding: 0 20px;
    }

    .app-footer {
        padding: 30px 0 15px;
    }

    .footer-links {
        flex-direction: row;
        flex-wrap: wrap;
    }

    .copyright {
        padding: 0 20px;
    }
}
</style>