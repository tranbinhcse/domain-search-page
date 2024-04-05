<template>
    <div class="max-w-7xl m-auto mt-5">
      <div class="flex justify-end pb-4 gap-x-3">
        <a-button type="primary" @click="router.push({name: 'domainRegister'})">Đăng ký mới</a-button>
      </div> 
  
      <a-table :loading="loading" :columns="columns" :data="services" size="large" :pagination="false">
        <template #name="{ record, rowIndex }">
           <b> {{ record.catname}} - {{ record.name}}</b>
           <p> {{ record.domain}} </p>
        </template>
        <template #status="{ record, rowIndex }">
            <Status :variant="record.status"/>
        </template>
        <template #expires="{ record, rowIndex }">
            {{ $dayjs(record.expires)}}
            <p>{{record.billingcycle}}</p>
        </template>  
        <template #recurring_amount="{ record, rowIndex }">
            {{ $currency(record.total) }}
        </template>
  
        <template #actions="{ record, rowIndex }">
            <a-button @click="router.push({name: 'serviceDetails', params: { id: record.id }})">Chi tiết</a-button>
        </template>
          
          
      </a-table>
     
     <div class="flex justify-end p-4 my-4 rounded-md">
      <a-pagination :total="records" v-model="page" @change="changePage" @page-size-change="changePerPage" show-page-size show-total/>
     </div>
  
    </div>
  </template>
  <script setup>
  import { storeToRefs } from 'pinia'
   
  import { useServiceStore } from "@/stores/service/serviceStore";
 
  import Status from '@/components/base/Status.vue';
  import { onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  const serviceStore = useServiceStore()
  const { getServices } = serviceStore
  const { services, page, perpage, records, loading, slug } = storeToRefs(serviceStore)
  const router = useRouter()
  const route = useRoute()
  if (route.params.slug) {
    slug.value = route.params.slug
  }
 
   const changePerPage = (value) => {
    perpage.value = value
  }
  
  const changePage = (currentpage) => {
    page.value = currentpage - 1
  }

  
  const columns = [
        {
          title: 'Tên miền',
          dataIndex: 'name',
          slotName: 'name'
        },
        {
          title: 'Ngày hết hạn',
          dataIndex: 'expires',
          slotName: 'expires',
        },
        {
          title: 'Giá gia hạn',
          dataIndex: 'recurring_amount',
          slotName: 'recurring_amount',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          slotName: 'status',
        },
        {
          title: 'Tuỳ chọn',
          dataIndex: 'actions',
          slotName: 'actions',
        }
      ];
      onMounted(getServices)

   
  
  </script>