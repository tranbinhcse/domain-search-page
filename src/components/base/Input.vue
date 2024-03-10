<template>
  <input
    type="text"
    class="py-2 px-4 bg-green-100 text-gray w-full text-sm border rounded-md border-gray-100 outline-none"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  >
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'
defineProps(['modelValue'])
defineEmits(['update:modelValue'])

</script>

<style>

</style>