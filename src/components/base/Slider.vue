<template>
  <span class="flex w-full gap-5">
    <a-slider
      v-model="internalValue"
      :min="min"
      :max="max"
      :step="step"
      @change="(value) => updateValue(value)"
      show-ticks show-tooltip show-input /> 

     
  </span>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 1 },
  max: { type: Number, default: 100 },
  min: { type: Number, default: 1 },
  step: { type: Number, default: 1 },
  unit : { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue'])
const updateValue = (value) => {
  console.log(value);
  emit('update:modelValue', value)
  internalValue.value = value
}

onMounted(() => {
  internalValue.value = props.modelValue
})  

</script>
