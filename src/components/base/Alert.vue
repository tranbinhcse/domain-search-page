<template>
  <div
    class="border-l-4 p-4"
    :class="{
      'bg-orange-100 border-orange-500 text-orange-700': variant == 'warning',
      'bg-green-200 text-green-500': variant == 'active',
      'bg-purple-200 text-purple-500': variant == 'processing',
    }"
  >
    <p v-if="title" class="font-bold">{{ title }}</p>
    <p v-if="content">{{ content }}.</p>
  </div>
</template>

<script setup>
defineProps(['variant', 'title', 'content'])

</script>

<style></style>