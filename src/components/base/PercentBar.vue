<template>
    <span class="inline-block w-36 h-2 bg-gray-50 aspect-square rounded-md align-middle">
        <span class="block h-2 w-3 rounded-md" :class="{
            'bg-red-500': variant == 'inactive',
            'bg-primary': variant == 'Active',
            'bg-purple-500': variant == 'Pending',
        }" :style="'width: '+percent+'%'"></span>
    </span>
</template>
<script setup>
import { defineProps } from 'vue'
defineProps(['variant', 'percent'])
</script>