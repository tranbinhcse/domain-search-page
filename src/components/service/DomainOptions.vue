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
                      <a-input type="text" allow-clear required v-model="searchKey" name="domain" placeholder="Nhập tên thương hiệu" class="w-full text-3xl h-[65px]" />
                      <a-button type="primary" :loading="searching" @click="handleSearchSubmit" class="absolute top-1/2 -translate-y-1/2 right-[10px] h-[45px]"  >
                        Tìm kiếm
                        <template #icon>
                          <IconSearch />
                        </template>
                      </a-button>
                    </div>

                </div>
                <ResultDomain  @update:modelValue="HandleAddToCart"/>

                <Button v-if="searching" btnClass="bg-white text-gray w-full h-20 flex  items-center justify-center" isLoading textLoading="Chúng tôi đang tìm kiếm tên miền phù hợp với bạn..." />
          <div class="mt-10 m-auto text-center" v-if="!searching & domains.length > 0" >
            <Button @click="searchDomains(true)" iconPosition="right" btnClass="bg-gray-50 text-gray" icon="heroicons-outline:arrow-down" text="Xem thêm"></Button>
          </div>

          
          </div>
        </a-tab-pane>
        <a-tab-pane key="transfer" v-if="options.register == '1'">
          <template #title>
            Chuyển tên miền
          </template>
          <div>
            fjdksu1
          </div>
        </a-tab-pane>
        <a-tab-pane key="owndomain" v-if="options.owndomain">
          <template #title>
            Đã có tên miền
          </template>
          <div>
            <div class="search-form-wrapper w-full bg-gradient-to-r from-primary from-10% via-green-600 to-green-300 rounded-t-md p-6">
              <div class="search-form-wrapper relative" >
                  <a-input type="text" allow-clear required v-model="searchKey" name="domain" placeholder="Nhập tên thương hiệu" class="w-full text-3xl h-[65px]" />
                  <a-button type="primary" :loading="searching" @click="handleSearchSubmit" class="absolute top-1/2 -translate-y-1/2 right-[10px] h-[45px]"  >
                    Kiểm tra
                    <template #icon>
                      <IconCheck />
                    </template>
                    {{options.subdomain}}
                  </a-button>
                </div>

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
            <Input type="text" append="heroicons-outline:search" v-model="searchKey" name="domain" placeholder="Nhập tên miền của bạn" size="leading-[32px]" class="bg-white rounded-md text-black w-full forcus-visible:outline-none focus:outline-none" />
            <Button :isLoading="searching" type="submit" text="Xác nhận" icon="heroicons-outline:check" class="flex-auto absolute right-0 top-[50%] h-[50px] -translate-y-[50%] rounded-tr-md rounded-br-md focus:outline-none" />
          </form>
        </div>

          

         
    </div>
  </template>
  
  <script setup>
  import { storeToRefs } from 'pinia'
  import { onMounted, ref, watch } from 'vue';
  import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
  import Button from '@/components/base/Button.vue'
  import Tooltip from '@/components/base/Tooltip.vue'
  import Badge from '@/components/base/Badge.vue'
  import Icon from '@/components/base/Icon.vue'
  import Input from '@/components/base/Input.vue'
  import ResultDomain from './ResultDomain.vue'
  import { useDomainSearchStore } from "@/stores/domain/domainSearchStore";
  import { useCartStore } from "@/stores/cartStore";
  const domainSearchStore = useDomainSearchStore()
  const cartStore = useCartStore()
  const { searchDomains, getDomainTlds } = domainSearchStore
  const { domains, searchKey, tldsLoaded, searching, tlds } = storeToRefs(domainSearchStore)
  const { addToCart, removeInCart } = cartStore
  const searchResultsRef = ref(null);

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