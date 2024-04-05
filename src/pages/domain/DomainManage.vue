<template>
  <div class="max-w-7xl m-auto mt-5">
    <div class="flex justify-end pb-4 gap-x-3">
      
      <a-button @click="router.push({name: 'domainRegister'})">Đăng ký mới</a-button>
    </div> 

    <a-table :loading="loading" :columns="columns" :data="domains" size="large" :pagination="false">
      <template #name="{ record, rowIndex }">
         <b> {{ record.name}}</b>
      </template>
      <template #status="{ record, rowIndex }">
          <Status :variant="record.status"/>
      </template>
      <template #expires="{ record, rowIndex }">
          {{ $dayjs(record.expires)}}
          <p v-if="record.daytoexpire > 0">Còn {{ record.daytoexpire }} sẽ hết hạn.</p>
      </template>  
      <template #recurring_amount="{ record, rowIndex }">
          {{ $currency(record.recurring_amount) }}
      </template>

      <template #actions="{ record, rowIndex }">
          <a-button @click="router.push({name: 'domainDetails', params: { id: record.id , domain: record.name }})">Chi tiết</a-button>
      </template>
        
        
    </a-table>
   <div class="flex justify-end p-4 my-4 rounded-md">
    <a-pagination :total="records" v-model="page" @change="changePage" @page-size-change="changePerPage" show-page-size show-total/>
   </div>

  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
 
import { useDomainStore } from "@/stores/domain/domainStore";
 
import Status from '@/components/base/Status.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const domainStore = useDomainStore()
const { getDomains } = domainStore
const { domains, page, totalPages, perpage, records, filter, loading } = storeToRefs(domainStore)
const router = useRouter()

onMounted(getDomains)

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


// const totalRecord = domains.value.length

</script>