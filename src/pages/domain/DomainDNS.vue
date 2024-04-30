<template>
 
    <div v-if="domain" class="max-w-7xl mx-auto mt-5">
      <Box>
        <div class="md:flex md:items-center md:justify-between md:space-x-5">
          <div class="flex items-start space-x-5">
            <div class="flex-shrink-0">
              <div class="relative">
                <img
                  class="h-16 w-16 rounded-full"
                  src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                  alt=""
                />
                <span class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
              </div>
            </div>
            <!--
              Use vertical padding to simulate center alignment when both lines of text are one line,
              but preserve the same layout if the text wraps without making the image jump around.
          -->
            <div class="pt-1.5">
              <h1 class="text-2xl font-bold text-gray-900">{{ domain }}</h1>
              
            </div>
          </div>
          <div
            class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3 divide-x divide-gray-50"
          >
             
          </div>
        </div>
      </Box>
      <Box>
        <Heading
          text="Cấu hình DNS"
          class="text-primary uppercase text-lg border-b-2 border-gray-50 pb-2 mb-2"
        />
        
        <a-table :columns="columns" :data="records" style="margin-top: 20px"> 
            <template #content="{ record }">
                 {{ record.prio }} {{ record.content }}
            </template>
            <template #optional="{ record }">
                <a-button type="outline" status="success" size="mini" class="mr-2"> <template #icon><IconPen /></template> </a-button>
                <a-button type="outline" status="danger" size="mini" > <template #icon><IconEraser /></template> </a-button>
            </template>
        </a-table>
       
      
      </Box>    
    </div>
  </template>
  
  <script setup>
  import Box from '@/components/base/Box.vue' 
  import Heading from '@/components/base/Heading.vue'
  import { onMounted, reactive } from 'vue'
  
  
  import { useDomainDetailStore } from '@/stores/domain/domainDetailStore'
  import { useDomainDNSStore } from '@/stores/domain/domainDNSStore'
  import { useRoute } from 'vue-router'
  import { storeToRefs } from 'pinia'
  const domainDetailStore = useDomainDetailStore()
  const domainDNSStore = useDomainDNSStore()
  const { getDNS } = domainDNSStore
  const { getDomain } = domainDetailStore
//   const { loaded, domain } = storeToRefs(domainDetailStore)
  const {  records, loading, domain } = storeToRefs(domainDNSStore)
  
  const route = useRoute()
  
//   onMounted(() => getDomain(route.params.id))
  onMounted(() => getDNS(route.params.id))


  const options = {
      Beijing: ['Haidian', 'Chaoyang', 'Changping'],
      Sichuan: ['Chengdu', 'Mianyang', 'Aba'],
      Guangdong: ['Guangzhou', 'Shenzhen', 'Shantou']
    }
  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      slotName: 'name'
    }, {
      title: 'Ưu tiên',
      dataIndex: 'priority',
    },
    {
      title: 'TTL',
      dataIndex: 'ttl',
      slotName: 'ttl'
    }, {
      title: 'Loại',
      dataIndex: 'type',
      slotName: 'type'
    }, 
    {
      title: 'Dữ liệu',
      dataIndex: 'content',
      slotName: 'content',
    },
    {
      title: 'Thao tác',
      slotName: 'optional',
    }


  ];

    
    const handleChange = (rowIndex) => {
      data[rowIndex].city = ''
    }
  </script>
  
  <style scoped></style>
  