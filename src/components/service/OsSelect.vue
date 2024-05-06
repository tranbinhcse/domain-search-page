<template>

<a-radio-group
    v-model="distros"
    class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 sm:gap-x-4"
  >
    <template v-for="(group, groupName) in items" :key="groupName">
      <a-radio :value="groupName" class="w-full p-0 m-0">
        <template #radio="{ checked }">
          <a-space
            class="custom-radio-card w-full flex flex-col items-center"
            :class="{ 'custom-radio-card-checked ': checked }"
          >
          <img :src="`/images/distros/${groupName}.svg`" alt="" class="w-12 h-12">
            <div>
              <div className="custom-radio-card-title">
                {{ groupName }}
              </div>
               
            </div> 
            
          </a-space>
          
        </template>
       
      </a-radio>
    </template>
  </a-radio-group>
  <h4 class="mt-4">Phiên bản</h4>
    <a-select style="max-width: 300px;" v-model="internalValue"  placeholder="Please select ..." >
        <template  v-for="(group, groupName) in items" :key="groupName">
          <template v-if="groupName === distros">
            <a-option v-for="groupItem in group" :key="groupItem.id" :value="groupItem.id">
                {{ groupItem.title }} 
               <span v-if="groupItem.price > 0">- {{ $currency(groupItem.price) }}</span>
            </a-option>
          </template>
        </template>
    </a-select>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps(['modelValue', 'items']);

  const emit = defineEmits(['update:modelValue']);
  const internalValue = ref(props.modelValue)

  const selected = ref({});
  
  const distros = ref('AlmaLinux');

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


watch(
    distros,
    (newValue) => {
      for (const groupName in props.items) {
        if (groupName === newValue) {
          internalValue.value = props.items[groupName][0].id;
          break;
        }
      }
    }
  );




// Initialize selected object with default values
// for (const groupName in props.items) {
//   selected.value[groupName] = props.items[groupName][0].value;
// }
  </script>
  
  <style scoped>
  .radio-label {
    display: flex;
    align-items: center;
  }
  
  .radio-label input[type="radio"] {
    margin-right: 10px;
  }
  
  .radio-content {
    display: flex;
    flex-direction: column;
  }
  </style>
  