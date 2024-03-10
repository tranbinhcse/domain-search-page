<template>
  <table class="w-full mx-2 table-hover">
    <thead>
      <tr class="border-b border-dashed border-gray-300">
        <th
          class="text-gray text-sm text-left font-normal py-4 px-2"
          v-for="(heading, index) in headings" :key="index"
          :class="[ headerClasses && headerClasses[index] != null ? headerClasses[index] : '' ]"
        >
          {{ heading }}
        </th>
      </tr>
    </thead>
    <tbody>
      <slot></slot>
    </tbody>
  </table>
</template>

<script setup>
defineProps(['headings', 'headerClasses'])
</script>

<style></style>