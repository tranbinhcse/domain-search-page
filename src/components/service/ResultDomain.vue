<template>
    <div v-for="domain in domains" :key="domain.id" >
          <div v-if="!domain.error && domain.isFeatured" class=" px-6 bg-white divider-y flex flex-col" :class="[domain.isFeatured ? 'featured py-10 bg-primary/30  py-6  shadow' : '',  domain.status == 'inCheck' ? 'check-domain' : domain.status == 'ok' ? 'found-domain' : 'not-found-domain']" >
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
              <div class="pricing flex items-center justify-between">
                  <div class="sales sr-only">
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
                <div class="actions pl-5 flex justify-end text-right">
            <div v-if="domain.status == 'inCheck'"><a-button type="primary" icon="heroicons-outline:search" loading textLoading="Đang kiểm tra..." ></a-button></div>
            <div v-else-if="domain.avaliable === false"><a-button type="secondary" icon="heroicons-outline:user" @click.stop="getWhoisInfo(domain)" text="Xem whois">Xem whois</a-button>  </div>
            <div v-else-if="domain.inCart">
              <a-button type="outline" status="danger" @click="handlePayCart()"  size="mini">
                Thanh toán
                <template #icon>
                  <Icon icon="heroicons-outline:credit-card" />
                </template>
              </a-button>
            </div>
            <div v-else>
              <a-button @click="HandleAddToCart(domain)" type="primary"  size="mini">
                Đăng ký
                <template #icon>
                    <Icon icon="heroicons-outline:shopping-cart" />
                </template>
              </a-button>
            </div>
            <div v-if="domain.inCart" class="text-right">
              <a-button @click="removeInCart(domain)" type="text"  size="mini">
                  <template #icon>
                      <Icon icon="mdi:times" />
                  </template>
              </a-button>
            </div>
          </div>
            </div>
          </div>
          </div>
          <div v-for="domain in domains" :key="domain.id" >
          <div v-if="!domain.error && !domain.isFeatured" class=" px-6 bg-white divider-y flex flex-col" :class="['border-b border-gray-200',domain.isFeatured ? 'featured py-10 bg-primary/10  py-6  shadow' : '',  domain.status == 'inCheck' ? 'check-domain' : domain.status == 'ok' ? 'found-domain' : 'not-found-domain']" >
            <div  class="flex items-center flex-wrap py-2" >
              <div class="name flex-1 flex items-center ">
                <span class="icon text-gray-300 bg-white rounded p-2 mr-2 sr-only :md:block">
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
              <div class="pricing  flex items-center ">
                  <div class="sales sr-only">
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
                <div class="actions pl-5 flex justify-end flex-auto">
            <div v-if="domain.status == 'inCheck'"><a-button type="primary" icon="heroicons-outline:search" loading textLoading="Đang kiểm tra..." ></a-button></div>
            <div v-else-if="domain.avaliable === false"><a-button type="secondary" icon="heroicons-outline:user" @click.stop="getWhoisInfo(domain)" text="Xem whois">Xem whois</a-button>  </div>
            <div v-else-if="domain.inCart">
              <a-button type="outline" status="danger" @click="handlePayCart()"  size="mini">
                Thanh toán
                <template #icon>
                  <Icon icon="heroicons-outline:credit-card" />
                </template>
              </a-button>
            </div>
            <div v-else>
              <a-button @click="HandleAddToCart(domain)" type="primary" size="mini">
                Đăng ký
                <template #icon>
                    <Icon icon="heroicons-outline:shopping-cart" />
                </template>
              </a-button>
            </div>
            <div v-if="domain.inCart" class="text-right">
              <a-button @click="removeInCart(domain)" type="text"  size="mini">
                  <template #icon>
                      <Icon icon="mdi:times" />
                  </template>
              </a-button>
            </div>
          </div>
            </div>
          </div>
          </div>
    
</template>



<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue';  
import Tooltip from '@/components/base/Tooltip.vue'
import Badge from '@/components/base/Badge.vue'
import Icon from '@/components/base/Icon.vue' 
import { useDomainSearchStore } from "@/stores/domain/domainSearchStore";
import { useCartStore } from "@/stores/cartStore";
const domainSearchStore = useDomainSearchStore()
const cartStore = useCartStore()
const { searchDomains, getDomainTlds } = domainSearchStore
const { domains,tlds } = storeToRefs(domainSearchStore)
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
