<template>
  <div class="grid md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
    <div
      v-for="category in categories"
      :key="category.id"
      class="border border-dashed border-gray-300 p-6 rounded-md cursor-pointer"
      :class="modelValue == category.id ? 'bg-green-200 border-green-500': ''"
      @click="$emit('update:modelValue', category.id)"
    >
      <h3 class="mb-2 text-sm font-bold" :class="modelValue == category.id ? 'text-green-500' : 'text-black'">{{ category.name }}</h3>
      <p class="text-gray text-sm">{{ category.description }}</p>
    </div>
  </div>
</template>
<script setup>
defineProps(['categories', 'modelValue'])
defineEmits(['update:modelValue'])
</script>