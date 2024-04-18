<template>
  <a-spin class="w-full" :loading="loading">
  <div class="rounded-md py-4 px-6 bg-white mb-10 dark:bg-gray-800">
    <slot></slot>
  </div></a-spin>
</template>

<script setup>
 defineProps(['loading'])
</script>

<style>

</style>