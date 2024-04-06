<template>
    <div class="max-w-7xl m-auto mt-5">
     
      <a-table :loading="loading" :columns="columns" :data="invoices" size="large" :pagination="false">
        <template #name="{ record, rowIndex }">
           <b> {{ record.name}}</b>
        </template>
        <template #status="{ record, rowIndex }">
            <Status :variant="record.status"/>
        </template>
        <template #paybefore="{ record, rowIndex }">
            {{ $dayjs(record.paybefore)}}
        </template>  
        <template #total="{ record, rowIndex }">
            {{ $currency(record.total) }}
        </template>
  
        <template #actions="{ record, rowIndex }">
            <a-button @click="router.push({name: 'invoiceDetails', params: { id: record.id , invoice: record.name }})">Chi tiết</a-button>
        </template>
          
          
      </a-table>
     <div class="flex justify-end p-4 my-4 rounded-md">
      <a-pagination :total="records" v-model="page" @change="changePage" @page-size-change="changePerPage" show-page-size show-total/>
     </div>
  
    </div>
  </template>
  <script setup>
  import { storeToRefs } from 'pinia'
   
  import { useInvoiceStore } from "@/stores/invoice/invoiceStore";
   
  import Status from '@/components/base/Status.vue';
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  const invoiceStore = useInvoiceStore()
  const { getInvoices } = invoiceStore
  const { invoices, page, totalPages, perpage, records, filter, loading } = storeToRefs(invoiceStore)
  const router = useRouter()
  
  onMounted(getInvoices)
  
  const changePerPage = (value) => {
    perpage.value = value
  }
  
  const changePage = (currentpage) => {
    page.value = currentpage - 1
  }
  
  
  
  
  const columns = [
        {
          title: 'Mã hoá đơn',
          dataIndex: 'number',
          slotName: 'number'
        },
        {
          title: 'Ngày hết hạn',
          dataIndex: 'paybefore',
          slotName: 'paybefore',
        },
        {
          title: 'Số tiền',
          dataIndex: 'total',
          slotName: 'total',
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
  
  
  // const totalRecord = invoices.value.length
  
  </script>