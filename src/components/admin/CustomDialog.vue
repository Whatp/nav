<template>
  <teleport to="body">
    <div v-if="visible" class="dialog-overlay" @click="handleOverlayClick">
      <div class="dialog-container" @click.stop>
        <div class="dialog-header">
          <div class="dialog-icon">
            <svg v-if="type === 'success'" class="icon-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
              <path d="M9 11l3 3L22 4"></path>
            </svg>
            <svg v-else-if="type === 'error'" class="icon-error" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M15 9l-6 6"></path>
              <path d="M9 9l6 6"></path>
            </svg>
            <svg v-else-if="type === 'loading'" class="icon-loading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c.55 0 1.1.05 1.63.13"></path>
            </svg>
            <svg v-else class="icon-info" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
          </div>
          <h3 class="dialog-title">{{ title }}</h3>
        </div>

        <div class="dialog-body">
          <p class="dialog-message">{{ message }}</p>
          <div v-if="details" class="dialog-details">
            <p v-for="detail in details" :key="detail" class="detail-item">{{ detail }}</p>
          </div>
        </div>

        <div class="dialog-footer">
          <button v-if="showCancel" @click="handleCancel" class="btn btn-cancel">
            {{ cancelText }}
          </button>
          <button @click="handleConfirm" class="btn btn-confirm" :class="{ 'btn-loading': loading }">
            <span v-if="loading" class="loading-spinner"></span>
            <span>{{ confirmText }}</span>
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { watch } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'info', // success, error, info, loading
    validator: (value) => ['success', 'error', 'info', 'loading'].includes(value)
  },
  title: {
    type: String,
    default: '提示'
  },
  message: {
    type: String,
    required: true
  },
  details: {
    type: Array,
    default: () => []
  },
  showCancel: {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
    default: '确定'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  loading: {
    type: Boolean,
    default: false
  },
  closeOnOverlay: {
    type: Boolean,
    default: true
  },
  autoClose: {
    type: Number,
    default: 0 // 0 means no auto close
  }
})

const emit = defineEmits(['confirm', 'cancel', 'close'])

let autoCloseTimer = null

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    emit('close')
  }
}

// 自动关闭功能
watch(() => props.visible, (newValue) => {
  if (newValue && props.autoClose > 0) {
    autoCloseTimer = setTimeout(() => {
      emit('close')
    }, props.autoClose)
  } else if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
    autoCloseTimer = null
  }
}, { immediate: true })
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.3s ease-out;
}

.dialog-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow: hidden;
  animation: slideIn 0.3s ease-out;
}

.dialog-header {
  display: flex;
  align-items: center;
  padding: 24px 24px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.dialog-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  flex-shrink: 0;
}

.icon-success {
  width: 24px;
  height: 24px;
  color: #52c41a;
}

.dialog-icon:has(.icon-success) {
  background: #f6ffed;
  border: 2px solid #d9f7be;
}

.icon-error {
  width: 24px;
  height: 24px;
  color: #ff4d4f;
}

.dialog-icon:has(.icon-error) {
  background: #fff2f0;
  border: 2px solid #ffccc7;
}

.icon-loading {
  width: 24px;
  height: 24px;
  color: #1890ff;
  animation: spin 1s linear infinite;
}

.dialog-icon:has(.icon-loading) {
  background: #f0f9ff;
  border: 2px solid #bae0ff;
}

.icon-info {
  width: 24px;
  height: 24px;
  color: #1890ff;
}

.dialog-icon:has(.icon-info) {
  background: #f0f9ff;
  border: 2px solid #bae0ff;
}

.dialog-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #262626;
  line-height: 1.3;
}

.dialog-body {
  padding: 16px 24px 24px;
}

.dialog-message {
  margin: 0 0 16px;
  font-size: 16px;
  line-height: 1.6;
  color: #595959;
}

.dialog-details {
  background: #fafafa;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
}

.detail-item {
  margin: 0 0 8px;
  font-size: 14px;
  color: #8c8c8c;
  display: flex;
  align-items: center;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-item::before {
  content: "•";
  margin-right: 8px;
  color: #d9d9d9;
}

.dialog-footer {
  display: flex;
  gap: 12px;
  padding: 16px 24px 24px;
  justify-content: flex-end;
}

.btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;
}

.btn-cancel {
  background: #f5f5f5;
  color: #8c8c8c;
  border: 1px solid #d9d9d9;
}

.btn-cancel:hover {
  background: #f0f0f0;
  border-color: #bfbfbf;
}

.btn-confirm {
  background: #1890ff;
  color: white;
  min-width: 80px;
}

.btn-confirm:hover:not(.btn-loading) {
  background: #40a9ff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
}

.btn-loading {
  cursor: not-allowed;
  opacity: 0.8;
}

.loading-spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .dialog-container {
    width: 95%;
    margin: 20px;
  }

  .dialog-header {
    padding: 20px 20px 12px;
  }

  .dialog-body {
    padding: 12px 20px 20px;
  }

  .dialog-footer {
    padding: 12px 20px 20px;
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
