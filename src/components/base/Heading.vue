<template>
  <div class="flex flex-row justify-between">
    <p class="text-black text-lg">{{ text }}</p>
    <a-button @click="$emit('onClick')" type="primary" :style="{ height: '100%' }"
      ><template #icon><icon-plus></icon-plus></template>Tạo mới</a-button
    >
  </div>
</template>
<script setup>
defineProps(['text'])
const emits = defineEmits(['onClick'])
</script>
