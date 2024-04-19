<template>
    <div class="mb-8 ">


      <a-tabs>
        <a-tab-pane key="register" v-if="options.register == '1'">
          <template #title>
            Đăng ký tên miền
          </template>
          <div>
            <div class="search-form-wrapper w-full bg-gradient-to-r from-primary from-10% via-green-600 to-green-300 rounded-t-md p-6">
                  
                  <div class="search-form-wrapper relative" >
                      <a-input type="text" allow-clear required v-model="searchKey" name="domain" placeholder="Nhập từ khoá muốn tìm" class="w-full text-3xl h-[45px]" />
                      <a-button type="primary" :loading="searching" @click="handleSearchSubmit" class="absolute top-1/2 -translate-y-1/2 right-0 h-[45px]"  >
                        <span class="sr-only md:invisible">Tìm kiếm</span>
                        <template #icon>
                          <IconSearch />
                        </template>
                      </a-button>
                    </div>

                </div>
                <ResultDomain @update:modelValue="HandleAddToCart"></ResultDomain>
                <a-button v-if="searching" class="w-full" @click="searchDomains(true)" >
                    Chúng tôi đang tìm kiếm tên miền phù hợp với bạn... 
                    <template #icon>
                      <IconLoading />
                    </template>
                  </a-button>
                <div class="mt-10 m-auto text-center" v-if="!searching & domains.length > 0" >
                  <a-button type="primary" @click="searchDomains(true)" >
                    Xem thêm
                    <template #icon>
                      <IconArrowDown />
                    </template>
                  </a-button>
                </div>

          
          </div>
        </a-tab-pane>
       
        <a-tab-pane key="owndomain" v-if="options.owndomain">
          <template #title>
            Đã có tên miền
          </template>
          <div>
            <div class="search-form-wrapper w-full bg-gradient-to-r from-primary from-10% via-green-600 to-green-300 rounded-t-md p-6">
              <div class="search-form-wrapper relative" >
                  <a-input type="text" allow-clear required v-model="searchKey" name="domain" placeholder="Nhập tên miền của bạn" class="w-full text-3xl h-[45px]" />
                  <a-button type="primary" :loading="searching" @click="handleCheckDomain" class="absolute top-1/2 -translate-y-1/2 right-0 h-[45px]"  >
                    Kiểm tra
                    <template #icon>
                      <IconCheck />
                    </template>
                    {{options.subdomain}}
                  </a-button>
                </div>
                <a-alert type="error" v-if=errorDomain>{{ errorDomain }}</a-alert>
              </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="m" v-if="options.subdomain">
          <template #title>
            Tên miền phụ
          </template>
          <div>
            <div class="search-form-wrapper w-full bg-gradient-to-r from-primary from-10% via-green-600 to-green-300 rounded-t-md p-6">
              <div class="search-form-wrapper relative" >
                  <a-input type="text" allow-clear required v-model="searchKey" name="domain" placeholder="Nhập tên thương hiệu" class="w-full text-3xl h-[65px]" />
                  <a-button type="primary" :loading="searching" @click="handleSearchSubmit" class="absolute top-1/2 -translate-y-1/2 right-[10px] h-[45px]"  >
                    Tìm kiếm
                    <template #icon>
                      <IconSearch />
                    </template>
                    {{options.subdomain}}
                  </a-button>
                </div>

              </div>
            </div>
        </a-tab-pane>
      </a-tabs>




         

        <div v-if="options.hostname" class="search-form-wrapper w-full bg-gradient-to-r from-primary from-10% via-green-600 to-green-300 rounded-t-md p-6">
          <form @submit.prevent="handleSearchSubmit" action="/" method="get" class=" relative  focus-visible:outline-none focus:outline-none focus:outline-none" >
            <a-input type="text" append="heroicons-outline:search" v-model="searchKey" name="domain" placeholder="Nhập tên miền của bạn" size="leading-[32px]" class="bg-white rounded-md text-black w-full forcus-visible:outline-none focus:outline-none" />
            <Button :isLoading="searching" type="submit" text="Xác nhận" icon="heroicons-outline:check" class="flex-auto absolute right-0 top-[50%] h-[50px] -translate-y-[50%] rounded-tr-md rounded-br-md focus:outline-none" />
          </form>
        </div>

          

         
    </div>
  </template>
  
  <script setup>
  import { storeToRefs } from 'pinia'
  import { onMounted, ref, watch } from 'vue'; 
  import { isValidDomain } from '@/utility/utility'
  import Button from '@/components/base/Button.vue' 
  import Input from '@/components/base/Input.vue'
  import ResultDomain from './ResultDomain.vue'
  import { useDomainSearchStore } from "@/stores/domain/domainSearchStore";
  import { useCartStore } from "@/stores/cartStore";
  const domainSearchStore = useDomainSearchStore()
  const cartStore = useCartStore()
  const { searchDomains, getDomainTlds } = domainSearchStore
  const { domains, searchKey, searching, tlds } = storeToRefs(domainSearchStore)
  const { addToCart } = cartStore
  const errorDomain = ref();
  const props = defineProps({
    options: Object
  })

  const emits = defineEmits(['update:modelValue'])

  const tldsSpotlight = ref([]);

  onMounted(() => {
    getDomainTlds()
    tldsSpotlight.value = tlds.value.slice(0,5);
  })

  const HandleAddToCart = (domain) => {
    emits('update:modelValue', domain)
    addToCart(domain)
  }

  const handleSearchSubmit = () => {
    searchDomains(false, 1);
  }
  const handleCheckDomain = () => {
    domains.value = []
    if(isValidDomain(searchKey.value)){
      emits('update:modelValue', {domain: searchKey.value})
    } else {
      errorDomain.value = 'Tên miền bạn nhập vào không hợp lệ.'
    }
  }

  watch(tlds, (newTlds) => {
    tldsSpotlight.value = newTlds.slice(0,5);
  })

  </script>

  <style>

 
  .spotlight-list{
    .spotlight-col{
      @apply px-2 w-[20%] mt-5;
      .spotlight{
        @apply flex justify-between flex justify-between items-center border  border-slate-300/30 px-4 py-2 rounded-lg my-2 text-white ;
        .spotlight-label{
          @apply text-sm font-bold;
        }
        .spotlight-old-price{
          @apply text-xs line-through mr-2;
        }
        .spotlight-value{
          @apply text-sm;
        }
      }
    }
  }
</style>