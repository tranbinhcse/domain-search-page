<template>
  <a-menu mode="horizontal">
    <a-menu-item
      v-for="category in subCategories"
      :key="category.slug"
      @click="router.push({ path: `/clientarea/services/${category.slug}` })"
      >{{ category.name }}</a-menu-item
    >
  </a-menu>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useServiceStore } from '@/stores/service/serviceStore'
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const serviceStore = useServiceStore()
const { getSubCategories } = serviceStore
const { subCategories } = storeToRefs(serviceStore)
const router = useRouter()
const route = useRoute()
onMounted(async () => {
  await getSubCategories(route.params.slug)
})
</script>
