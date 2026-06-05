<template>
  <a
    :href="site.url"
    target="_blank"
    rel="noopener noreferrer"
    class="site-card"
    :aria-label="`打开 ${site.name}`"
  >
    <div class="site-icon">
      <img v-if="!iconFailed" :src="site.icon" :alt="site.name" @error="handleImageError" />
      <span v-else>{{ fallbackInitial }}</span>
    </div>
    <div class="site-info">
      <div class="site-heading">
        <h3 class="site-name">{{ site.name }}</h3>
        <svg class="site-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <p class="site-description">{{ site.description }}</p>
      <span class="site-host">{{ host }}</span>
    </div>
  </a>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  site: {
    type: Object,
    required: true
  }
})

const iconFailed = ref(false)

const fallbackInitial = computed(() => props.site.name?.trim().slice(0, 1).toUpperCase() || '?')

const host = computed(() => {
  try {
    return new URL(props.site.url).hostname.replace(/^www\./, '')
  } catch {
    return props.site.url
  }
})

const handleImageError = () => {
  iconFailed.value = true
}
</script>

<style scoped>
.site-card {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  min-height: 128px;
  padding: 18px;
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 8px;
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.07);
  backdrop-filter: blur(16px);
  transition: transform var(--transition-normal) var(--ease-spring), box-shadow var(--transition-normal), border-color var(--transition-normal), background-color var(--transition-normal);
}

.site-card::before {
  position: absolute;
  inset: 0 auto 0 0;
  width: 4px;
  content: '';
  background: linear-gradient(180deg, var(--color-primary), var(--color-accent), var(--color-warm));
  opacity: 0.82;
}

.site-card::after {
  position: absolute;
  top: 0;
  left: -70%;
  width: 42%;
  height: 100%;
  content: '';
  pointer-events: none;
  background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.72), transparent);
  opacity: 0;
  transform: skewX(-18deg);
  transition: left 0.65s ease, opacity 0.3s ease;
}

.site-card:hover {
  background: rgba(255, 255, 255, 0.94);
  border-color: rgba(37, 99, 235, 0.3);
  box-shadow: 0 22px 50px rgba(15, 23, 42, 0.12), 0 14px 28px rgba(37, 99, 235, 0.1);
  transform: translateY(-5px);
}

.site-card:hover::after {
  left: 120%;
  opacity: 1;
}

.site-card:focus-visible {
  outline: 3px solid rgba(37, 99, 235, 0.28);
  outline-offset: 3px;
}

.site-icon {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  overflow: hidden;
  color: var(--color-primary);
  font-size: 22px;
  font-weight: 900;
  background: linear-gradient(135deg, #ffffff, #eef6ff);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 8px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.76), 0 10px 24px rgba(15, 23, 42, 0.08);
  transition: transform var(--transition-normal) var(--ease-spring);
}

.site-card:hover .site-icon {
  transform: translateY(-2px) rotate(2deg);
}

.site-icon img {
  width: 34px;
  height: 34px;
  object-fit: contain;
}

.site-info {
  position: relative;
  z-index: 1;
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.site-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.site-name {
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  color: var(--color-heading);
  font-size: 18px;
  font-weight: 850;
  line-height: 1.25;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.site-arrow {
  flex-shrink: 0;
  margin-top: 2px;
  color: #94a3b8;
  transition: color var(--transition-fast), transform var(--transition-fast);
}

.site-card:hover .site-arrow {
  color: var(--color-primary);
  transform: translate(2px, -2px);
}

.site-description {
  display: -webkit-box;
  min-height: 42px;
  margin: 8px 0 13px;
  overflow: hidden;
  color: var(--color-text-muted);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.site-host {
  display: inline-flex;
  align-self: flex-start;
  max-width: 100%;
  padding: 5px 9px;
  overflow: hidden;
  color: var(--color-accent);
  font-size: 12px;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: var(--color-accent-soft);
  border-radius: 999px;
}

:global(.dark) .site-card {
  background: rgba(15, 23, 42, 0.82);
  border-color: rgba(148, 163, 184, 0.18);
}

:global(.dark) .site-name {
  color: #f8fafc;
}

:global(.dark) .site-description {
  color: #cbd5e1;
}

@media (max-width: 768px) {
  .site-card {
    gap: 13px;
    min-height: 118px;
    padding: 15px;
  }

  .site-icon {
    width: 46px;
    height: 46px;
  }

  .site-icon img {
    width: 30px;
    height: 30px;
  }

  .site-name {
    font-size: 16px;
  }

  .site-description {
    min-height: auto;
    margin-bottom: 10px;
  }
}
</style>
