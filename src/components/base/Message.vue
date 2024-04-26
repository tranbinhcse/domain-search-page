<template>
  <div
    v-show="open"
    role="alert"
    class="fixed inset-0 left-auto bottom-auto top-[72px] right-4 z-40"
  >
    <div v-for="{ type, message, id } in notifications" :key="id" class="notification-item mb-3">
      <div
        class="bg-white dark:bg-slate-600 drop-shadow-md inline-flex min-w-80 px-4 py-3 rounded-md text-sm border"
        :class="typeColor(type)"
      >
        <div class="flex w-full justify-between items-start">
          <div class="flex">
            <svg
              v-if="type === 'warning'"
              class="w-4 h-4 shrink-0 fill-current opacity-80 mt-[3px] mr-3"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z"
              />
            </svg>
            <svg
              v-else-if="type === 'error'"
              class="w-4 h-4 shrink-0 fill-current opacity-80 mt-[3px] mr-3"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8 9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z"
              />
            </svg>
            <svg
              v-else-if="type === 'success'"
              class="w-4 h-4 shrink-0 fill-current opacity-80 mt-[3px] mr-3"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z"
              />
            </svg>
            <svg
              v-else
              class="w-4 h-4 shrink-0 fill-current opacity-80 mt-[3px] mr-3"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"
              />
            </svg>
            <div>
              <div v-if="type === 'warning'" class="text-yellow-800 dark:text-yellow-100">
                {{ 'Warning' }}
              </div>
              <div v-if="type === 'error'" class="text-red-800 dark:text-red-100">
                {{ 'Error' }}
              </div>
              <div v-if="type === 'success'" class="text-primary dark:text-primary">
                {{ 'Success' }}
              </div>
              <div>
                {{ message }}
              </div>
            </div>
          </div>
          <button class="opacity-70 hover:opacity-80 ml-3 mt-[3px]" @click="removeNotification(id)">
            <div class="sr-only">Close</div>
            <svg class="w-4 h-4 fill-current">
              <path
                d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import eventBus from '@/utils/eventBus'
const typeColor = (type) => {
  switch (type) {
    case 'warning':
      return ' border-amber-200 dark:border-transparent text-amber-600 dark:text-amber-400'
    case 'error':
      return ' border-rose-200 dark:border-transparent text-rose-600 dark:text-rose-400'
    case 'success':
      return ' border-primary dark:border-transparent text-primary dark:text-primary'
    default:
      return ' border-gray-300 dark:border-transparent text-gray-500 dark:text-gray-500'
  }
}

const open = ref(false)
const type = ref('info')
const message = ref('')

const notifications = ref([])
const removeNotification = (id) => {
  notifications.value = notifications.value.filter((n) => n.id !== id)
}

onMounted(() => {
  eventBus.on('show-notification', (data) => {
    open.value = true
    const id = Date.now()
    notifications.value.push({ ...data, id })
    setTimeout(() => removeNotification(id), 4000)
  })
})

// Hủy nghe sự kiện khi unmounted
onUnmounted(() => {
  eventBus.off('show-notification')
})
</script>
