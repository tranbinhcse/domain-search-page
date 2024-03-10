<template>
  <span class="relative w-14 h-8 cursor-pointer select-none rounded-full" @click="$emit('update:modelValue', !modelValue)"
    :class="modelValue ? 'bg-green-500' : 'bg-gray-300'">
    <span class="absolute flex items-center justify-center w-6 h-6 transition bg-white rounded-full left-1 top-1"
      :class="modelValue ? 'translate-x-full' : ''">
      <svg v-if="modelValue" class="h-4 w-4" fill="currentColor" viewBox="0 0 12 12">
        <path
          d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
      </svg>
      <svg v-else class="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 12 12">
        <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </span>
  </span>
</template>

<script setup>
import { ref } from 'vue'
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>