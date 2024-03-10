<template>
  <span
    class="inline-block w-11 p-2 aspect-square rounded-md align-middle"
    :class="{
        'bg-red-200 text-red-500': variant == 'Inactive',
        'bg-green-200 text-green-500': variant == 'Active',
        'bg-purple-200 text-purple-500': variant == 'Pending',
    }"
  >
    <slot></slot>
  </span>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps(['variant'])
</script>

<style>

</style>