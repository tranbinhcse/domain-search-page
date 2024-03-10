<template>
  <span class="flex w-full gap-5">
    <input type="range" @input="event => $emit('update:modelValue', event.target.value)" class="grow bg-transparent cursor-pointer appearance-none disabled:opacity-50 disabled:pointer-events-none focus:outline-none
    [&::-webkit-slider-thumb]:w-5
    [&::-webkit-slider-thumb]:h-5
    [&::-webkit-slider-thumb]:-mt-1
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:bg-green-500
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:transition-all
    [&::-webkit-slider-thumb]:duration-150
    [&::-webkit-slider-thumb]:ease-in-out

    [&::-moz-range-thumb]:w-5
    [&::-moz-range-thumb]:h-5
    [&::-moz-range-thumb]:appearance-none
    [&::-moz-range-thumb]:bg-white
    [&::-moz-range-thumb]:border-4
    [&::-moz-range-thumb]:border-green-500
    [&::-moz-range-thumb]:rounded-full
    [&::-moz-range-thumb]:transition-all
    [&::-moz-range-thumb]:duration-150
    [&::-moz-range-thumb]:ease-in-out

    [&::-webkit-slider-runnable-track]:w-full
    [&::-webkit-slider-runnable-track]:h-3
    [&::-webkit-slider-runnable-track]:border
    [&::-webkit-slider-runnable-track]:border-black
    [&::-webkit-slider-runnable-track]:bg-green-200
    [&::-webkit-slider-runnable-track]:rounded-full

    [&::-moz-range-track]:w-full
    [&::-moz-range-track]:h-3
    [&::-moz-range-track]:bg-gray-300
    [&::-moz-range-track]:rounded-full" id="min-and-max-range-slider-usage"
    :value="modelValue"
    :min="min"
    :max="max"
    :step="step">
    <span>{{ modelValue }}</span>
  </span>
</template>
<script setup>
import { ref } from 'vue'
defineProps({
  modelValue: { type: Number, default: 1 },
  max: { type: Number, default: 100 },
  min: { type: Number, default: 1 },
  step: { type: Number, default: 1 },
})
defineEmits(['update:modelValue'])
</script>