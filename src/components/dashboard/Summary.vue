<template>
  <div class="grid grid-cols-4 gap-x-8 mb-10 justify-between">
    <div class="px-6 py-10  rounded-md bg-green-300">
        <img src="@/assets/icons/summary/service.svg" />
        <p class="font-bold text-white py-4 text-xl">30</p>
        <p class="text-white text-sm">Dịch vụ</p>
    </div>
    <div class="px-6 py-10  rounded-md bg-blue-500">
        <img src="@/assets/icons/summary/domain.svg" />
        <p class="font-bold text-white py-4 text-xl">{{ totalDomains }}</p>
        <p class="text-white text-sm">Tên miền</p>
    </div>
    <div class="px-6 py-10  rounded-md bg-red-500">
        <img src="@/assets/icons/summary/invoice.svg" />
        <p class="font-bold text-white py-4 text-xl">30</p>
        <p class="text-white text-sm">Hoá đơn</p>
    </div>
    <div class="px-6 py-10  rounded-md bg-purple-500">
        <img src="@/assets/icons/summary/call.svg" />
        <p class="font-bold text-white py-4 text-xl">30</p>
        <p class="text-white text-sm">Hỗ trợ</p>
    </div>
    <div></div>
  </div>
</template>

<script setup>
defineProps(['totalServices', 'totalDomains'])
</script>

<style>

</style>