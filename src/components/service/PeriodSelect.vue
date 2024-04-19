<template>
  <a-radio-group v-model="internalValue"
    class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-4">
    <template v-for="cycle in periods" :key="cycle.value">
      <a-radio :value="cycle.value" class="w-full p-0 m-0 ">
        <template #radio="{ checked }">
          <a-space class="custom-radio-card w-full " :class="{ 'custom-radio-card-checked ': checked }">

            <div>
              <div className="custom-radio-card-title">
                {{ cycle.title }}
              </div>
              <a-typography-text type="secondary">{{ cycle.formatted }}</a-typography-text>
              <div class="text-2xl font-medium text-gray-900">{{ $currency(cycle.price) }}</div>
            </div>
            <div className="custom-radio-card-mask">
              <div className="custom-radio-card-mask-dot" />
            </div>
          </a-space>
        </template>
      </a-radio>
    </template>
  </a-radio-group>
</template>
<script setup>
import { ref, watch } from 'vue'
 

const props = defineProps({
  periods: Array,
  modelValue: Object
})

const emit = defineEmits(['update:modelValue'])


const internalValue = ref(props.modelValue)
watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue)
}, { deep: true })

watch(() => props.modelValue, (newValue) => {
  if (newValue !== internalValue.value) {
    internalValue.value = newValue
  }
}, { deep: true })


</script>


<style scoped>
</style>