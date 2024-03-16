<template>
  <div>
    <input
      type="text"
      class="py-2 px-4 w-full  border rounded-md border-gray-300 dark:border-gray-500 dark:bg-slate-700 dark:text-gray-300"
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)"
    >
    <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'
defineProps(['modelValue', 'error'])
defineEmits(['update:modelValue'])

</script>

<style>

</style>