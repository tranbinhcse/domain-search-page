<template>
    <div class="max-w-7xl mx-auto mt-5">

<div class="flex pb-4 gap-x-3">
    <div class="main-service bg-white flex-1 p-6">
        
        <h3 class="text-xl font-bold">Thông tin website</h3>
        <a-divider></a-divider>
        <p>Tên miền: {{service.domain}}</p>
        <p>Trạng thái: {{service.status}} </p>
        <p>Ngày tạo: {{service.date_created}} </p>
        <p>Ngày hết hạn: {{service.expires}} </p>
    
    </div>
    <div class="sidebar-service bg-white max-w-2xl flex-1 p-6">fsdfs</div>
</div>

</div>
</template>



<script setup>

import { onMounted, ref } from 'vue'


import { useServiceDetailStore } from '@/stores/service/serviceDetailStore'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
const serviceDetailStore = useServiceDetailStore()
const { getService } = serviceDetailStore
const { loading, service } = storeToRefs(serviceDetailStore)

const route = useRoute()
const currentModule = ref(null)

onMounted(async () => {
    await getService(route.params.id) 
    // Dynamic import based on moduleName
    
})

</script>

<style scoped></style>

