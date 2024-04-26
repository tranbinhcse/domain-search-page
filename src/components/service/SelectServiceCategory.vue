<template>
  <a-radio-group
    v-model="internalValue"
    class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-4"
  >
    <template v-for="category in categories" :key="category.id">
      <a-radio :value="category.id" class="w-full p-0 m-0">
        <template #radio="{ checked }">
          <a-space
            align="start"
            class="custom-radio-card w-full"
            :class="{ 'custom-radio-card-checked ': checked }"
          >
            <div>
              <div className="custom-radio-card-title">
                {{ category.name }}
              </div>
              <div type="secondary" v-html="category.description"></div>
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
import { onMounted, ref, watch, watchEffect } from 'vue'
const props = defineProps({
  categories: Array,
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

// Xác định hàm chọn phần tử đầu tiên nếu modelValue không khớp với bất kỳ item nào trong categories
const selectFirstItemIfNotMatched = () => {
  const matchedItem = props.categories.find((category) => category.id === internalValue.value)
  if (!matchedItem) {
    if (props.categories.length > 0) {
      internalValue.value = props.categories[0].id
    }
  }
}

// Theo dõi sự thay đổi trong internalValue và update modelValue
watch(
  internalValue,
  (newValue) => {
    emit('update:modelValue', newValue)
  },
  { deep: true }
)

// Theo dõi sự thay đổi trong modelValue và update internalValue
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== internalValue.value) {
      internalValue.value = newValue
      selectFirstItemIfNotMatched() // Kiểm tra và chọn phần tử đầu tiên nếu cần
    }
  },
  { deep: true }
)

onMounted(() => {
  selectFirstItemIfNotMatched()
})

watchEffect(() => {
  selectFirstItemIfNotMatched()
})
// Khi component được tạo, kiểm tra và chọn phần tử đầu tiên nếu cần
selectFirstItemIfNotMatched()
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
