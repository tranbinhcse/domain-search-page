<template>
  <div>
    <p class="text-black text-lg" v-if="route.meta.breadcrumb">
      {{ route.meta.breadcrumb[route.meta.breadcrumb.length - 1] }}
    </p>
    <p class="text-sm text-gray">
      <span> Trang chủ <span v-if="route.meta.breadcrumb">/ </span> </span>
      <span v-for="(link, index) in route.meta.breadcrumb" :key="index">
        {{ link }} <span v-if="index !== route.meta.breadcrumb.length - 1">/ </span>
      </span>
    </p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style></style>
