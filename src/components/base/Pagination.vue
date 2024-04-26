<template>
  <div>
    <ul class="pagination">
      <li v-if="currentPage > 1">
        <Button
          btnClass="page-link bg-white hover:bg-green-50  px-2 py-3"
          @click="updatePage(currentPage - 1)"
          :disabled="isLoading"
        >
          <Icon icon="heroicons-outline:chevron-left" />
        </Button>
      </li>

      <li
        v-if="showEllipsisBefore"
        @mouseenter="hoverStart('before')"
        @mouseleave="hoverEnd('before')"
      >
        <Button
          btnClass="ellipsis bg-white text-gray transition ease-in duration-300"
          v-if="!hoverState.before"
          text="..."
        />
        <Button
          v-else
          btnClass="page-link bg-white hover:bg-green-50  px-1 py-3"
          @click="updatePage(1)"
          :disabled="isLoading"
        >
          <Icon icon="heroicons-outline:chevron-double-left" />
        </Button>
      </li>

      <li v-for="page in pagesToShow" :key="page">
        <Button
          :btnClass="`page-link hover:bg-green-200 hover:text-primary px-2 py-2  ${page == currentPage ? 'border-green-200 bg-green-200 border-2' : 'bg-white'}`"
          @click="updatePage(page)"
          :text="`${page}`"
        />
      </li>

      <li
        v-if="showEllipsisAfter"
        @mouseenter="hoverStart('before')"
        @mouseleave="hoverEnd('before')"
      >
        <Button
          btnClass="ellipsis bg-white text-gray transition ease-in duration-300"
          v-if="!hoverState.before"
          text="..."
        />
        <Button
          v-else
          btnClass="page-link bg-white hover:bg-green-50  px-1 py-3"
          @click="updatePage(totalPages)"
          :disabled="isLoading"
        >
          <Icon icon="heroicons-outline:chevron-double-right" />
        </Button>
      </li>

      <li v-if="currentPage < totalPages">
        <Button
          btnClass="page-link bg-white  px-2 py-3"
          @click="updatePage(currentPage + 1)"
          :disabled="isLoading"
        >
          <Icon icon="heroicons-outline:chevron-right" />
        </Button>
      </li>

      <li>
        <!-- Dropdown để chọn số mục trên mỗi trang -->
        <select class="border px-2 py-2 rounded" v-model="selectedPerPage" @change="updatePerPage">
          <option v-for="option in perPageOptions" :value="option" :key="option">
            {{ option }} / page
          </option>
        </select>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue'
import Button from '@/components/base/Button.vue'
import Icon from '@/components/base/Icon.vue'

const props = defineProps({
  modelValue: Number,
  totalPages: Number,
  perPageOptions: {
    type: Array,
    default: () => [10, 20, 30, 50, 100]
  }
})

const emits = defineEmits(['update:modelValue', 'update:perPage'])
const isLoading = ref(false)

const currentPage = computed(() => props.modelValue)
const selectedPerPage = ref(props.perPageOptions[0]) // Mặc định là tùy chọn đầu tiên

const showEllipsisBefore = computed(() => currentPage.value > 4)
const showEllipsisAfter = computed(() => currentPage.value < props.totalPages - 3)

const pagesToShow = computed(() => {
  const pages = []
  const startPage = Math.max(1, currentPage.value - 2)
  const endPage = Math.min(props.totalPages, currentPage.value + 2)

  if (props.totalPages > 4) {
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
  } else {
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i)
    }
  }
  return pages
})

// function updatePage(page) {
//   emits('update:modelValue', page)
// }

function updatePage(page) {
  if (!isLoading.value) {
    isLoading.value = true
    emits('update:modelValue', page)
    // Reset isLoading after a delay or once the page has been successfully loaded
    setTimeout(() => {
      isLoading.value = false
    }, 1000) // Adjust the timeout duration as needed
  }
}

function updatePerPage() {
  emits('update:perPage', selectedPerPage.value)
  // Cập nhật lại trang hiện tại về 1 khi thay đổi số mục trên mỗi trang
  updatePage(1)
}
const hoverState = ref({ before: false, after: false })

function hoverStart(position) {
  hoverState.value[position] = true
}

function hoverEnd(position) {
  hoverState.value[position] = false
}
</script>

<style scoped>
.pagination {
  @apply flex flex-wrap gap-x-1 justify-end py-3;
}

.page-link {
  @apply px-4 py-2 bg-white rounded-md;
}

.page-link.active {
  @apply bg-primary text-white;
}
</style>
