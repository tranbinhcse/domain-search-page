<template>
    <div class="mb-8 ">
        <TabGroup>
            <TabList class="-mb-px flex space-x-8 pb-4">
              <Tab  v-slot="{ selected }" class="focus-visible:outline-none mb-4" v-if="options.register == '1'">
                  <span :class="[
                'w-full py-2.5 text-sm font-medium leading-5 px-8 py-4 focus-visible:outline-none',
                'ring-white/60  focus:outline-none hover:border-gray-300 hover:text-green-500',
                selected
                  ? ' text-green-500 border-b-2 border-green-500'
                  : 'text-black hover:bg-white/[0.12]  border-b-2 border-gray-50',
              ]">Đăng ký tên miền</span>
              </Tab>

              <Tab  v-slot="{ selected }" class="focus-visible:outline-none mb-4"  v-if="options.register == '1'">
                  <span :class="[
                'w-full py-2.5 text-sm font-medium leading-5 px-8 py-4 focus-visible:outline-none',
                'ring-white/60  focus:outline-none hover:border-gray-300 hover:text-green-500',
                selected
                  ? ' text-green-500 border-b-2 border-green-500'
                  : 'text-black hover:bg-white/[0.12]  border-b-2 border-gray-50',
              ]">Chuyển tên miền</span>
              </Tab>

              <Tab  v-slot="{ selected }" class="focus-visible:outline-none mb-4" v-if="options.owndomain">
                  <span :class="[
                'w-full py-2.5 text-sm font-medium leading-5 px-8 py-4 focus-visible:outline-none',
                'ring-white/60  focus:outline-none hover:border-gray-300 hover:text-green-500',
                selected
                  ? ' text-green-500 border-b-2 border-green-500'
                  : 'text-black hover:bg-white/[0.12]  border-b-2 border-gray-50',
              ]">Sủ dụng tên miền đã có</span>
              </Tab>
            
            </TabList>
            <TabPanels>
              <TabPanel v-if="options.owndomain">
                  <div class="search-form-wrapper w-full bg-gradient-to-r from-green-500 from-10% via-green-600 to-green-300 rounded-t-md p-6">
                    <form @submit.prevent="handleSearchSubmit" action="/" method="get" class=" relative  focus-visible:outline-none focus:outline-none focus:outline-none" >
                      <Input type="text" append="heroicons-outline:search" v-model="searchKey" name="domain" placeholder="Nhập tên thương hiệu" size="leading-[32px]" class="bg-white rounded-md text-black w-full forcus-visible:outline-none focus:outline-none" />
                      <Button :isLoading="searching" type="submit" text="Tìm kiếm" icon="heroicons-outline:search" class="flex-auto absolute right-0 top-[50%] h-[50px] -translate-y-[50%] rounded-tr-md rounded-br-md focus:outline-none" />
                    </form>
                    <div class="spotlight-list flex flex-[2_2_0%]">
                      <div class="spotlight-col" v-for="tld in tldsSpotlight">
                        <div class="spotlight">
                            <span class="spotlight-label">{{ tld.tld }}</span> 
                            <span><span class="spotlight-old-price" v-if="tld.periods[0].before > tld.periods[0].register">{{ tld.periods[0].before }} /yr</span> 
                            <span class="spotlight-value">{{ tld.periods[0].register }}đ</span>
                          </span>
                        </div>
                      </div> 
                    
                    </div>
                  </div>
              </TabPanel>
              <TabPanel  v-if="options.register == '1'">
                <div class="search-form-wrapper w-full bg-gradient-to-r from-green-500 from-10% via-green-600 to-green-300 rounded-t-md p-6">
                  <form @submit.prevent="handleSearchSubmit" action="/" method="get" class=" relative  focus-visible:outline-none focus:outline-none focus:outline-none" >
                    <Input type="text" append="heroicons-outline:search" v-model="searchKey" name="domain" placeholder="Nhập tên miền của bạn" size="leading-[32px]" class="bg-white rounded-md text-black w-full forcus-visible:outline-none focus:outline-none" />
                    <Button :isLoading="searching" type="submit" text="Kiểm tra" icon="heroicons-outline:search" class="flex-auto absolute right-0 top-[50%] h-[50px] -translate-y-[50%] rounded-tr-md rounded-br-md focus:outline-none" />
                  </form>
                </div>
              </TabPanel>
              <TabPanel v-if="options.register == '1'">
                <div class="search-form-wrapper w-full bg-gradient-to-r from-green-500 from-10% via-green-600 to-green-300 rounded-t-md p-6">
                  <form @submit.prevent="handleSearchSubmit" action="/" method="get" class=" relative  focus-visible:outline-none focus:outline-none focus:outline-none" >
                    <Input type="text" append="heroicons-outline:search" v-model="searchKey" name="domain" placeholder="Nhập tên miền của bạn" size="leading-[32px]" class="bg-white rounded-md text-black w-full forcus-visible:outline-none focus:outline-none" />
                    <Button :isLoading="searching" type="submit" text="Kiểm tra" icon="heroicons-outline:search" class="flex-auto absolute right-0 top-[50%] h-[50px] -translate-y-[50%] rounded-tr-md rounded-br-md focus:outline-none" />
                  </form>
                </div>
              </TabPanel>
            </TabPanels>
        </TabGroup>


        <div v-if="options.hostname" class="search-form-wrapper w-full bg-gradient-to-r from-green-500 from-10% via-green-600 to-green-300 rounded-t-md p-6">
          <form @submit.prevent="handleSearchSubmit" action="/" method="get" class=" relative  focus-visible:outline-none focus:outline-none focus:outline-none" >
            <Input type="text" append="heroicons-outline:search" v-model="searchKey" name="domain" placeholder="Nhập tên miền của bạn" size="leading-[32px]" class="bg-white rounded-md text-black w-full forcus-visible:outline-none focus:outline-none" />
            <Button :isLoading="searching" type="submit" text="Xác nhận" icon="heroicons-outline:check" class="flex-auto absolute right-0 top-[50%] h-[50px] -translate-y-[50%] rounded-tr-md rounded-br-md focus:outline-none" />
          </form>
        </div>

          

        <div v-for="domain in domains" :key="domain.id" >
          <div v-if="!domain.error" class=" px-6 bg-white divider-y flex flex-col" :class="[domain.isFeatured ? 'featured py-10 bg-green-50  py-6  shadow' : '',  domain.status == 'inCheck' ? 'check-domain' : domain.status == 'ok' ? 'found-domain' : 'not-found-domain']" >
            <div  class="flex items-center flex-wrap py-2" >
              <div class="name flex-1 flex items-center">
                <span class="icon text-gray-300 bg-white rounded p-2 mr-2">
                  <Icon icon="heroicons-outline:face-smile" v-if="domain.avaliable" fontSize="40px" />
                  <Icon icon="heroicons-outline:face-frown" v-else fontSize="40px" />
                </span>
                <div class=""> 
                  <span class="domain font-bold w-full text-lg" v-if="domain.domain">{{ domain.domain }}</span>
                  <span class="domain font-bold w-full text-lg" v-else>{{ domain.sld }}{{ domain.tld }}</span>
                  <span class="rounded-md px-2 py-1 text-[12px] bg-black text-white ml-2" v-if="domain.premium">Premium</span>
                  <p class="domain font-bold w-full text-sm" v-if="domain.idnName">IDN: {{ domain.idnName }}</p>
                  <div class="description w-full flex-1 text-sm text-gray-300" v-if="domain.description">{{ domain.description }}</div>
                  <div class="description w-full flex-1 text-sm text-gray-500" v-if="!domain.avaliable & domain.status != 'inCheck'">
                    <span v-if="domain.status == ''">Rất tiết, tên miền đã có người mua</span>
                    <span v-else>Không thể đăng ký tên miền này.</span>
                  </div>
                  <div class="description w-full flex-1 text-sm text-gray-300" v-else-if="domain.inCart">Tên miền đã thêm vào giỏ hàng.</div>            
                </div>
              </div> 
              <div class="pricing  flex items-center">
                  <div class="sales sr-only">
                    <!-- TODO: check save -->
                    <Badge class="badge" variant="Active">SAVE 97%</Badge>
                    <div class="text-sm text-gray font-light italic">Khi đăng ký 2 năm</div>
                  </div>
                  <div class="price ml-5  text-right" v-if="domain.avaliable">
                    <div class="h-found-domain-cards-item__old-price text-sm text-gray line-through" v-if="domain.before > 1">{{ domain.before }}đ</div>
                    <div class="h-found-domain-cards-item__discount mob-tab font-bold text-2xl text-red-500">{{ domain.register }}đ</div>
                    <div class="h-found-domain-cards-item__cycle font-light text-gray text-sm flex justify-end text-left">
                      {{ domain.period }} năm
                      <Tooltip bg="light" size="lg" position="bottom" class="cursor-pointer">
                        <template v-slot:button>
                          <Icon icon="heroicons-outline:information-circle" fontSize="20px" color="gray"/>
                        </template>
                      <template v-slot:content>
                          <p v-if="domain.feeRegOrigin">Lệ phí đăng ký: {{ domain.feeRegOrigin }}đ</p>  
                          <p v-if="domain.feeRenOrigin">Phí duy trì: {{ domain.feeRenOrigin }}đ</p>  
                          <p v-if="domain.feeManOrigin">Phí dịch vụ quản trị: {{ domain.feeManOrigin }}đ</p>  
                          <p v-if="domain.vatFee">Thuế VAT: {{ domain.vatFee }}đ</p>  
                          <div class="flex items-center" aria-hidden="true">
                            <div class="w-full border-t border-gray-300" />
                          </div>
                        <p class="font-bold"> Gia hạn mỗi năm: {{ domain.renew }}đ</p>
                      </template>
                      </Tooltip> 
                    </div>
                  </div>
                </div>
                <div class="actions min-w-[200px] text-right">
                  <div v-if="domain.status == 'inCheck'"><Button btnClass="bg-white text-gray" icon="heroicons-outline:search" isLoading textLoading="Đang kiểm tra..." ></Button></div>
                  <div v-else-if="domain.avaliable === false"><Button btnClass="bg-gray-50 text-gray" icon="heroicons-outline:user" :link="`/whois/${ domain.domain }`" text="Xem whois" /></div>
                  <div v-else-if="domain.inCart"><Button  btnClass="bg-red-50 text-red-500" icon="heroicons-outline:credit-card" link="/cart" text="Thanh toán" /></div>
                  <div v-else><Button btnClass="text-green-500 border border-green-500 px-3 py-2" icon="heroicons-outline:shopping-cart" text="Chọn"   /></div>
                </div>
            </div>
          </div>
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
  import { useDomainSearchStore } from "@/stores/domain/domainSearchStore";
  const domainSearchStore = useDomainSearchStore()
  const { searchDomains, getDomainTlds } = domainSearchStore
  const { domains, searchKey, tldsLoaded, searching, tlds } = storeToRefs(domainSearchStore)
  const searchResultsRef = ref(null);

  const props = defineProps({
    options: Object
  })

  const tldsSpotlight = ref([]);

  onMounted(() => {
    getDomainTlds()
    tldsSpotlight.value = tlds.value.slice(0,5);
  })

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