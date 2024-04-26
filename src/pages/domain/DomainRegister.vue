<template>
  <h1>Domain register</h1>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useDomainSearchStore } from '@/stores/domain/domainSearchStore'
const domainSearchStore = useDomainSearchStore()
const { loaded } = storeToRefs(domainSearchStore)
</script>
