<template>
  <div
    class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
  >
    <ul class="flex flex-wrap -mb-px">
      <li class="me-2" v-for="tab in tabs" :key="tab.ref">
        <a
          href="#"
          class="inline-block p-4 text-sm font-semibold"
          :class="{
            'text-primary border-primary border-b-2': modelValue == tab.ref,
            'hover:text-gray-400': modelValue !== tab.ref
          }"
          @click.prevent="$emit('update:modelValue', tab.ref)"
          >{{ tab.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps(['tabs', 'modelValue'])
</script>
