<template>

  <div v-for="domain in domains" :key="domain.id" >
    <div v-if="!domain.error && domain.isFeatured" class="rounded-md  px-6 bg-white mt-8 " :class="[domain.isFeatured ? 'featured py-10 bg-green-50  py-6  shadow' : '',  domain.status == 'inCheck' ? 'check-domain' : domain.status == 'ok' ? 'found-domain' : 'not-found-domain']" >
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
            <div class="description w-full flex-1 text-sm text-gray-500" v-if="!domain.avaliable & domain.status != 'inCheck'">Rất tiết, tên miền đã có người mua</div>
            <div class="description w-full flex-1 text-sm text-gray-300" v-else-if="domain.inCart">Tên miền đã thêm vào giỏ hàng.</div>            
          </div>
        </div> 
        <div class="pricing  flex items-center">
            <div class="sales ">
              <!-- TODO: check save -->
              <Badge class="badge" variant="Active">SAVE 97%</Badge>
              <div class="text-sm text-gray font-light italic">Khi đăng ký 2 năm</div>
            </div>
            <div class="price ml-5  text-right" v-if="domain.avaliable">
              <div class="h-found-domain-cards-item__old-price text-sm text-gray line-through" v-if="domain.before > 1">{{ $currency(domain.before) }}</div>
              <div class="h-found-domain-cards-item__discount mob-tab font-bold text-2xl text-red-500">{{ $currency(domain.register) }}</div>
              <div class="h-found-domain-cards-item__cycle font-light text-gray text-sm flex justify-end text-left">
                {{ domain.period }} năm
                <Tooltip bg="light" size="lg" position="bottom" class="cursor-pointer">
                  <template v-slot:button>
                    <Icon icon="heroicons-outline:information-circle" fontSize="20px" color="gray"/>
                  </template>
                 <template v-slot:content>
                    <p v-if="domain.feeRegOrigin">Lệ phí đăng ký: {{ $currency(domain.feeRegOrigin) }}</p>  
                    <p v-if="domain.feeRenOrigin">Phí duy trì: {{ $currency(domain.feeRenOrigin) }}</p>  
                    <p v-if="domain.feeManOrigin">Phí dịch vụ quản trị: {{ $currency(domain.feeManOrigin) }}</p>  
                    <p v-if="domain.vatFee">Thuế VAT: {{ $currency(domain.vatFee) }}</p>  
                    <div class="flex items-center" aria-hidden="true">
                      <div class="w-full border-t border-gray-300" />
                    </div>
                   <p class="font-bold"> Gia hạn mỗi năm: {{ $currency(domain.renew) }}</p>
                 </template>
                </Tooltip> 
              </div>
            </div>
          </div>
          <div class="actions min-w-[300px] flex justify-end">
            <div v-if="domain.status == 'inCheck'"><a-button type="primary" icon="heroicons-outline:search" loading textLoading="Đang kiểm tra..." ></a-button></div>
            <div v-else-if="domain.avaliable === false"><a-button type="secondary" icon="heroicons-outline:user" @click.stop="getWhoisInfo(domain)" text="Xem whois">Xem whois</a-button>  </div>
            <div v-else-if="domain.inCart">
              <a-button type="outline" status="danger" @click="handlePayCart()">
                Thanh toán
                <template #icon>
                  <Icon icon="heroicons-outline:credit-card" />
                </template>
              </a-button>
            </div>
            <div v-else>
              <a-button @click="addToCart(domain)" type="primary">
                Đăng ký
                <template #icon>
                    <Icon icon="heroicons-outline:shopping-cart" />
                </template>
              </a-button>
            </div>
            <div v-if="domain.inCart" class="text-right">
              <a-button @click="removeInCart(domain)" type="text" >
                  <template #icon>
                      <Icon icon="mdi:times" />
                  </template>
              </a-button>
            </div>
          </div>
      </div>
      <div class="rounded-md bg-gray-50 p-4"  v-if="!domain.avaliable">
        <div class="flex">
          <div class="flex-shrink-0">
            <CheckCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-gray-800">Bạn đừng lo, hãy xem các tên miền mà chúng tôi tìm thấy cho bạn bên dưới</h3>
          </div>
        </div>
      </div>
      <div class="rounded-md bg-blue-50 p-4"  v-if="domain.avaliable & !domain.inCart">
        <div class="flex">
          <div class="flex-shrink-0">
            <CheckCircleIcon class="h-5 w-5 text-blue-500" aria-hidden="true" />
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-gray-800">Xin chúc mừng, chúng tôi đã tìm thấy tên miền phù hợp nhu cầu của bạn.</h3>
          </div>
        </div>
      </div>
      
    </div>
  </div>
 
  <div class="domain-page-info max-w-7xl m-auto mt-5 mb-5"  v-if="topDomains.length > 0">
      <div class="section-popular-domain">
        
        <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <li v-for="domain in topDomains" :key="domain.domain" class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-left border">
            <div class="flex flex-1 flex-col p-8">
              <!-- <img class="h-20 w-32 flex-shrink-0 " src="@/assets/tlds/com.svg" alt="" /> -->
              <dl class="mt-1 flex flex-grow flex-col justify-between">
                <dt class="sr-only">description</dt>
                <dd class="text-lg text-gray-500">{{ domain.domain }}</dd>
                <dt class="sr-only">price</dt>
                <dd class="mt-3">
                  <!-- <span class="text-sm font-medium line-through text-gray-400" v-if="domain.before > 0">{{  $currency(domain.before) }}</span> -->
                  <span class="font-bold text-3xl text-red-500">{{ $currency(domain.register) }}</span><span>đ/năm</span>
                </dd>
                <div class="mt-4">
               
                </div>
                <div class="actions flex">
                  <div v-if="domain.status == 'inCheck'"><a-button type="primary" icon="heroicons-outline:search" loading textLoading="Đang kiểm tra..." ></a-button></div>
                  <div v-else-if="domain.avaliable === false"><a-button type="secondary" icon="heroicons-outline:user" @click.stop="getWhoisInfo(domain)" text="Xem whois">Xem whois</a-button>  </div>
                  <div v-else-if="domain.inCart" class="flex-auto">
                    <a-button type="outline" status="danger" @click="handlePayCart()" long>
                      Thanh toán
                      <template #icon>
                        <Icon icon="heroicons-outline:credit-card" />
                      </template>
                    </a-button>
                  </div>
                  <div v-else class="flex-auto">
                    <a-button @click="addToCart(domain)" type="primary" long>
                      Đăng ký
                      <template #icon>
                          <Icon icon="heroicons-outline:shopping-cart" />
                      </template>
                    </a-button>
                  </div>
                  <div v-if="domain.inCart" class="text-right">
                    <a-button @click="removeInCart(domain)" type="text" >
                        <template #icon>
                            <Icon icon="mdi:times" />
                        </template>
                    </a-button>
                  </div>
                </div>
              </dl>
            </div>
          </li>
        </ul>
      </div>
    </div>

   
  <div v-for="domain in domains.slice(4)" :key="domain.id" >
    <div v-if="!domain.error && !domain.isFeatured" class="rounded-md  px-6 bg-white mb-2  py-4" :class="[domain.status == 'inCheck' ? 'check-domain' : domain.status == 'ok' ? 'found-domain' : 'not-found-domain']" >
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
            <div class="description w-full flex-1 text-sm text-gray-500" v-if="!domain.avaliable & domain.status != 'inCheck'">Rất tiết, tên miền đã có người mua</div>
            <div class="description w-full flex-1 text-sm text-gray-500" v-else-if="domain.avaliable & !domain.inCart">Chúc mừng, bạn có thể đăng ký tên miền này.</div>
            <div class="description w-full flex-1 text-sm text-gray-500" v-else-if="domain.inCart">Tên miền đã thêm vào giỏ hàng.</div>
          </div>
        </div> 
        <div class="pricing  flex items-center">
            <div class="sales sr-only">
              <!-- TODO: check save -->
              <Badge class="badge" variant="Active">SAVE 97%</Badge>
              <div class="text-sm text-gray font-light italic">Khi đăng ký 2 năm</div>
            </div>
            <div class="price ml-5  text-right">
              <div class="h-found-domain-cards-item__old-price text-sm text-gray line-through" v-if="domain.before > 1">{{ $currency(domain.before) }}</div>
              <div class="h-found-domain-cards-item__discount mob-tab font-bold text-2xl text-red-500">{{ $currency(domain.register) }}</div>
              <div class="h-found-domain-cards-item__cycle font-light text-gray text-sm flex justify-end text-left">
                {{ domain.period }} năm
                <Tooltip bg="light" size="lg" position="bottom" class="cursor-pointer">
                  <template v-slot:button>
                    <Icon icon="heroicons-outline:information-circle" fontSize="20px" color="gray"/>
                  </template>
                 <template v-slot:content>
                    <p v-if="domain.feeRegOrigin">Lệ phí đăng ký: {{ $currency(domain.feeRegOrigin) }}</p>  
                    <p v-if="domain.feeRenOrigin">Phí duy trì: {{ $currency(domain.feeRenOrigin) }}</p>  
                    <p v-if="domain.feeManOrigin">Phí dịch vụ quản trị: {{ $currency(domain.feeManOrigin) }}</p>  
                    <p v-if="domain.vatFee">Thuế VAT: {{ $currency(domain.vatFee) }}</p>  
                    <div class="flex items-center" aria-hidden="true">
                      <div class="w-full border-t border-gray-300" />
                    </div>
                   <p class="font-bold"> Gia hạn mỗi năm: {{ $currency(domain.renew) }}</p>
                 </template>
                </Tooltip> 
              </div>
            </div>
          </div>
         
          <div class="actions min-w-[300px] flex justify-end">
            <div v-if="domain.status == 'inCheck'"><a-button type="primary" icon="heroicons-outline:search" loading textLoading="Đang kiểm tra..." ></a-button></div>
            <div v-else-if="domain.avaliable === false"><a-button type="secondary" icon="heroicons-outline:user" @click.stop="getWhoisInfo(domain)" text="Xem whois">Xem whois</a-button>  </div>
            <div v-else-if="domain.inCart">
              <a-button type="outline" status="danger" @click="handlePayCart()">
                Thanh toán
                <template #icon>
                  <Icon icon="heroicons-outline:credit-card" />
                </template>
              </a-button>
            </div>
            <div v-else>
              <a-button @click="addToCart(domain)" type="primary">
                Đăng ký
                <template #icon>
                    <Icon icon="heroicons-outline:shopping-cart" />
                </template>
              </a-button>
            </div>
            <div v-if="domain.inCart" class="text-right">
              <a-button @click="removeInCart(domain)" type="text" >
                  <template #icon>
                      <Icon icon="mdi:times" />
                  </template>
              </a-button>
            </div>
          </div>
         
      </div>
    </div>
  </div>
  

  <!-- Whois Modal -->
  <Modal id="danger-modal" :modalOpen="viewWhoisDomain"  @close-modal="viewWhoisDomain = false">
    <div class="p-5 flex space-x-4 relative">
      <!-- Content -->
      <div class="" >
        <div v-if="loadingWhois" class="w-full flex justify-center bg-white p-5">
          <svg class="animate-spin -ml-1 mr-3 h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg> 
          đang tải dữ liệu...
        </div>
         
          <div class="text-sm mb-10" v-if="whoisInfo.whois && loadingWhois == false">
            <div class="space-y-2">
             
              <ul class="leading-7">
                <li class="uppercase"><b>Tên miền: {{ whoisInfo?.domain }}</b></li>
                <li><b>Nhà đăng ký: </b>{{ whoisInfo?.whois.registrar }}</li>
                <li><b>Ngày đăng ký: </b>{{ whoisInfo?.whois.createDate }}</li>
                <li><b>Ngày hết hạn: </b>{{ whoisInfo?.whois.expiredDate }}</li>
                <li><b>Chủ thể đăng ký: </b>{{ whoisInfo?.whois.registrantName }}</li>
                <li><b>Nameservers: </b>
                  <p v-for="(nameserver, index) in whoisInfo?.whois.nameservers" :key="index">{{ nameserver }}</p>
                </li>
                <li><b>Trạng thái: </b>
                  <p v-for="(status, index) in whoisInfo?.whois.status" :key="index">{{ status }}</p>
                </li>
               
              </ul>
            </div>
            <div class="mt-5 p-5 bg-gray-50 rounded-lg snap-proximity snap-y overflow-auto h-[400px]">
             <p> Thông tin chi tiết: </p>
              <p v-html="whoisInfo.raw" class="snap-center"></p>
            </div>
          </div>
      </div>
    </div>
  </Modal>
  <!-- Whois Modal -->
   

  </template>
<script setup>
import { defineProps, onMounted, ref } from 'vue'
import Badge from '@/components/base/Badge.vue'
import Button from '@/components/base/Button.vue'
import Heading from '@/components/base/Heading.vue'

import Icon from '@/components/base/Icon.vue'
import Tooltip from '@/components/base/Tooltip.vue';
import Modal from '@/components/base/Modal.vue'
import { useDomainSearchStore } from "@/stores/domain/domainSearchStore";
import { useDomainRegisterStore } from "@/stores/domain/domainRegisterStore";
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps(['domains', 'topDomains'])

const domainSearchStore = useDomainSearchStore()
const domainRegisterStore = useDomainRegisterStore()
const { getWhoisDomain } = domainSearchStore
const { addToCart, removeInCart } = domainRegisterStore
const { loading, cartItems } = storeToRefs(domainRegisterStore)


const viewWhoisDomain = ref(false)
const whoisInfo = ref([])
const loadingWhois = ref(false)

 
 
const getWhoisInfo = async (domain) => {
  loadingWhois.value = true
  viewWhoisDomain.value = true
  const whois = await getWhoisDomain(domain.domain);
  whoisInfo.value = whois
  loadingWhois.value = false
}
 
const handlePayCart = () => {
  //https://my.tino.org/cart.php?domain[]=tino.vn&domain[]=nhanhoa.vn&aff=1&action=transfer

  if (cartItems.value.length > 0) {
    // Extract the 'name' property from each domain in cartItems
    router.push({ path: '/config-domain' });
  } else {
    // Handle the case when cartItems is empty
    console.warn('Cart is empty. Add domains to the cart before proceeding.');
  }


}


// Function to get the value of a cookie by name
const  getCookie = (name) => {
  const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
  return cookieValue ? cookieValue.pop() : null;
}

</script>


<style>
.found-domain {
.name{
  .icon {
    @apply text-green-500 bg-green-100 rounded p-2 mr-2
  }
}
}
.not-found-domain {
.name{
  .icon {
    @apply text-gray-300 bg-gray-50 rounded p-2 mr-2
  }
  .domain{
    @apply line-through text-gray-500
  }
}
}
</style>