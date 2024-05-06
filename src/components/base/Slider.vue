<template>
  <span class="flex w-full gap-5">
    <a-slider
      v-model="internalValue"
      :min="min"
      :max="max"
      :step="step"
      show-ticks show-tooltip />
      {{ internalValue }}
      <a-input-number 
      size="mini"
      :model-value="internalValue" 
      :default-value="internalValue" 
      :min="min":max="max"  :step="step" 
      mode="button"
      :style="{'max-width':'120px'}" 
      @input="(value) => updateValue(value)">
        
        </a-input-number>

     
  </span>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 1 },
  max: { type: Number, default: 100 },
  min: { type: Number, default: 1 },
  step: { type: Number, default: 1 },
  unit : { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue'])
const internalValue = ref(props.modelValue)
const updateValue = (value) => {
  emit('update:modelValue', value)
  internalValue.value = value
}
</script>
