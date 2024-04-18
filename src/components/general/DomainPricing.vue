<template>
    <div class="px-4 sm:px-6 lg:px-8">
     
      <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">

         
            <table class="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Tên miền</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Đăng ký</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Gia hạn</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Chuyển về</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
            
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="tld in tlds" :key="tld.tld"  >
                  <!-- <template v-if="tld.domain_type == 'vn'"> -->
                    
                  <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div class="flex items-center">
                    
                      <div class="ml-4">
                        <div class="font-bold text-lg text-gray-900">{{ tld.tld }}</div>
                        <div class="mt-1 text-gray-500" v-html="tld.description"></div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <div class="text-primary flex">
                      <span class=" font-bold text-lg">{{ $currency(tld.periods[0].register) }} </span>
                      <Tooltip bg="light" size="lg" position="bottom" class="cursor-pointer">
                        <template v-slot:button>
                          <Icon icon="heroicons-outline:information-circle" fontSize="20px" color="gray"/>
                        </template>
                      <template v-slot:content>
                          <p v-if="tld.periods[0].feeRegOrigin">Lệ phí đăng ký: {{ $currency(tld.periods[0].feeRegOrigin) }}</p>  
                          <p v-if="tld.periods[0].feeRenOrigin">Phí duy trì: {{ $currency(tld.periods[0].feeRenOrigin) }}</p>  
                          <p v-if="tld.periods[0].feeManOrigin">Phí dịch vụ quản trị: {{ $currency(tld.periods[0].feeManOrigin) }}</p>  
                          <p v-if="tld.periods[0].vatFee">Thuế VAT: {{ $currency(tld.periods[0].vatFee) }}</p>  
                         
                      </template>
                      </Tooltip> 
                    </div>
                    <div class="mt-1 text-gray-500 line-through" v-if="tld.periods[0].before > 0">{{ $currency(tld.periods[0].before)  }}</div>
                    
                  </td> 
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <div class="text-primary flex">
                      <span class=" font-bold text-lg">{{ $currency(tld.periods[0].renew) }} </span>
                    </div>
                  </td>

                
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{{ $currency(tld.periods[0].transfer)  }}</td>
                  
                <!-- </template> -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>

import { storeToRefs } from 'pinia'
import { useDomainSearchStore } from "@/stores/domain/domainSearchStore";
import { onMounted, ref } from 'vue';
import Tooltip from '@/components/base/Tooltip.vue';
import Icon from '@/components/base/Icon.vue'
const domainSearchStore = useDomainSearchStore()

const { tlds } = storeToRefs(domainSearchStore)
const {   getDomainTlds } = domainSearchStore
onMounted(async () => {
  await getDomainTlds(); // Ensure getDomainTlds is called before accessing tlds
 
});



  </script>