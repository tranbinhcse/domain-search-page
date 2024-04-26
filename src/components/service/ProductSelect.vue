<template>
  <!-- <div class="grid md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
    <div v-for="product in products" :key="product.id"
      class="border p-6 rounded-md cursor-pointer border-dashed border-gray-300"
      :class="modelValue == product ? 'bg-green-200 border-primary': ''"
      @click="$emit('update:modelValue', product.id)"
    >
      <h3 class="text-sm font-bold mb-3" :class="modelValue == product.id ? 'text-primary' : 'text-black'">{{ product.name }}</h3>
      <div class="text-sm text-gray" v-html="product.description"></div>
    </div>
  </div> -->

  <a-radio-group
    v-model="internalValue"
    class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-4"
  >
    <template v-for="product in products" :key="product.id">
      <a-radio :value="product.id" class="w-full p-0 m-0">
        <template #radio="{ checked }">
          <a-space
            align="start"
            class="custom-radio-card w-full"
            :class="{ 'custom-radio-card-checked ': checked }"
          >
            <div>
              <div className="custom-radio-card-title">
                {{ product.name }}
              </div>
              <div type="secondary" v-html="product.description"></div>
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
  products: Array,
  modelValue: Object
})

const emit = defineEmits(['update:modelValue'])

const internalValue = ref(props.modelValue)
watch(
  internalValue,
  (newValue) => {
    emit('update:modelValue', newValue)
  },
  { deep: true }
)

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== internalValue.value) {
      internalValue.value = newValue
    }
  },
  { deep: true }
)
</script>

<style scoped>
.custom-radio-card {
  padding: 10px 16px;
  border: 1px solid var(--color-border-2);
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.custom-radio-card-mask {
  height: 14px;
  width: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: 1px solid var(--color-border-2);
  box-sizing: border-box;
  position: absolute;
  top: 10px;
  right: 10px;
}

.custom-radio-card-mask-dot {
  width: 8px;
  height: 8px;
  border-radius: 100%;
}

.custom-radio-card-title {
  color: var(--color-text-1);
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
}

.custom-radio-card:hover,
.custom-radio-card-checked,
.custom-radio-card:hover .custom-radio-card-mask,
.custom-radio-card-checked .custom-radio-card-mask {
  border-color: rgb(var(--primary-6));
  margin: 0;
}

.custom-radio-card-checked {
  background-color: var(--color-primary-light-1);
}

.custom-radio-card:hover .custom-radio-card-title,
.custom-radio-card-checked .custom-radio-card-title {
  color: rgb(var(--primary-6));
}

.custom-radio-card-checked .custom-radio-card-mask-dot {
  background-color: rgb(var(--primary-6));
}
</style>
