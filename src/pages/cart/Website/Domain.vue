<template>

<a-spin class="w-full" :loading="loading" tip="Đang tải dữ liệu...">
    <div class="h-full">
      
        <div class="bg-primary text-white     py-10">
          <div class="max-w-7xl m-auto">
            <div class="box-search-domain text-center ">
                <div class="form-search-domain">
                  <div class="find-domain-header">
                    <p class="text-white font-bold text-3xl">Tìm kiếm tên miền thương hiệu của bạn</p>
                    <p class="p-2">Nhập từ khoá của bạn để đăng ký và bảo vệ thương hiệu của bạn trên internet!</p>
                  </div>
  
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
      
                
                <div>
                  <p class="text-gray font-italic text-sm p-4">* Bảo vệ quyền riêng tư WHOIS miễn phí được bao gồm trong mọi tên miền nếu đuôi tên miền được phép ẩn thông tin.</p>
                </div>
            </div>
          </div> 
      
        </div> 
     
        <div> 
      
  
      </div>
      <div class="max-w-7xl m-auto" id="searchResults" ref="searchResultsRef">
        
          <DomainSearch v-if="domains.length > 0" :domains="domains" :topDomains="topDomains"/>       
          <Button v-if="searching" btnClass="bg-white text-gray w-full h-20 flex  items-center justify-center" isLoading textLoading="Chúng tôi đang tìm kiếm tên miền phù hợp với bạn..." />
            <div class="mt-10 m-auto text-center" v-if="!searching & domains.length > 0" >
              <Button @click="searchDomains(true)" iconPosition="right" btnClass="bg-gray-50 text-gray" icon="heroicons-outline:arrow-down" text="Xem thêm"></Button>
          </div>
  
        
      </div>
  
      <div> 
      </div>
    
      <!-- Domain Page Info -->
    </div>
    <div class="h-[100px]"></div>
  </a-spin>
  </template>
  <script setup>
  import { storeToRefs } from 'pinia'
  import { useDomainSearchStore } from "@/stores/domain/domainSearchStore";
  // import { useDomainRegisterStore } from "@/stores/domain/domainRegisterStore";
   
  import Button from '@/components/base/Button.vue'; 
  import DomainSearch from './DomainSearch.vue'  
  
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const domainSearchStore = useDomainSearchStore()
  const { searchDomains, getDomainTlds } = domainSearchStore
  const { domains, topDomains,  searchKey, tldsLoaded, searching } = storeToRefs(domainSearchStore)
  const searchResultsRef = ref(null);
  

  import { useWebStore } from "@/stores/website/webStore";
 
  const webStore = useWebStore()
  const { createWebsite } = webStore 
  const {   themeSelected, domain , loading} = storeToRefs(webStore)

 

  
  const scrollTosearchResults = () => {
    if (searchResultsRef.value) {
      const topPosition = searchResultsRef.value.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: topPosition, behavior: 'smooth' });
    }
  }
  // Gọi hàm scrollTosearchResults khi form được submit
  const handleSearchSubmit = () => {
    searchDomains();
    setTimeout(() => {
        scrollTosearchResults();
    }, 1000); // 5000 milliseconds = 5 seconds
  
  }
  onMounted(() => {
    getDomainTlds()
    if(domain.value){
      searchKey.value = domain.value
      searchDomains(true);
    } else {
      router.push({ path: '/cart/website' });
    }
    
  })
  
   
  </script>
  
  <style>
  .box-search-domain{
    @apply p-5 px-10 rounded max-w-7xl m-auto;
    .form-search-domain{
      .find-domain-header{
        @apply pb-5;
        h1{
          @apply text-2xl font-bold text-gray-800
        }
      }
    }
    .domain-checker__tlds-list{
      @apply flex items-center justify-between divide-x divide-gray-200 py-4;
      .domain-checker__tld{
        @apply  px-4;
        b {
          @apply font-bold text-white
        }
        p{
          @apply text-sm text-gray-300
        }
      }
    }
  
  }
  </style>