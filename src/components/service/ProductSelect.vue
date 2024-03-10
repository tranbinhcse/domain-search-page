<template>
  <div class="grid md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
    <div v-for="product in products" :key="product.id"
      class="border p-6 rounded-md cursor-pointer border-dashed border-gray-300"
      :class="modelValue == product ? 'bg-green-200 border-green-500': ''"
      @click="$emit('update:modelValue', product.id)"
    >
      <h3 class="text-sm font-bold mb-3" :class="modelValue == product.id ? 'text-green-500' : 'text-black'">{{ product.name }}</h3>
      <div class="text-sm text-gray" v-html="product.description"></div>
    </div>
  </div>
</template>
<script setup>
defineProps(['products', 'modelValue'])
defineEmits(['update:modelValue'])
</script>