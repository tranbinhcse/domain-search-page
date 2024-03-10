<template>
    <div class="grid md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
      <div v-for="(period, index) in periods"
        :key="index"
        class="p-6 rounded-md cursor-pointer border border-dashed border-gray-300"
        :class="modelValue == period.value ? 'bg-green-200 border-green-500': ''"
         @click="$emit('update:modelValue', period.value)">
        <h3 class="text-black" :class="modelValue == period.value ? 'text-green-500' : 'text-black'">{{ period.title }}</h3>
        <p class="text-gray text-sm">{{ period.price }}đ</p>
      </div>
    </div>
  </template>
  <script setup>
  defineProps(['periods', 'modelValue'])
  defineEmits(['update:modelValue'])
  </script>