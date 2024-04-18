<template>
  <span
    class="rounded-md px-3 py-1 text-sm"
    :class="{
        'bg-red-200 text-red-500': variant == 'Inactive',
        'bg-green-200 text-primary': variant == 'Active',
        'bg-purple-200 text-purple-500': variant == 'Pending',
    }"
  ><slot></slot></span>
</template>

<script setup>
defineProps(['variant'])

</script>

<style>

</style>