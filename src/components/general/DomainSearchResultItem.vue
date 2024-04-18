<template>
    <div class="rounded-md  px-6 bg-white mb-2" :class="isFeatured ? 'featured py-10 bg-green-50 shadow-md' : 'py-4'">
      <div class="flex items-center flex-wrap " :class="isCheck ? 'check-domain' : isTaken ? 'not-found-domain' : 'found-domain'">
        <div class="name flex-1 flex items-center">
          <span class="icon text-gray-300 bg-white rounded p-2 mr-2"><Icon icon="heroicons-outline:globe" fontSize="30px" /></span>
          <div class=""> 
            <span class="domain font-bold text-lg">{{ domain }}</span>
            <div class="description w-full flex-1 text-sm text-gray-300" v-if="isTaken">Rất tiết, tên miền đã có người mua</div>
            <div class="description w-full flex-1 text-sm text-gray-300" v-else-if="!isCheck & !inCart">Chúc mừng, bạn có thể đăng ký tên miền này.</div>
            <div class="description w-full flex-1 text-sm text-gray-300" v-else-if="inCart">Tên miền đã thêm vào giỏ hàng.</div>
          </div>
        
        </div> 
       
         dsd
        <div class="pricing  flex items-center">
            <div class="sales">
              <Badge class="badge" variant="Active">SAVE 97%</Badge>
              <div class="text-sm text-gray font-light italic">Khi đăng ký 2 năm</div>
            </div>
            <div class="price ml-5">
              <div class="h-found-domain-cards-item__old-price text-sm text-gray line-through">310.000đ</div>
              <div class="h-found-domain-cards-item__discount mob-tab font-bold text-2xl text-red-500">259.000đ</div>
              <div class="h-found-domain-cards-item__cycle font-light text-gray text-sm flex">
                năm đầu 
                <Tooltip bg="light" size="md" position="bottom">
                  <template v-slot:button>
                    <Icon icon="heroicons-outline:information-circle" fontSize="20px" color="gray"/>
                  </template>
                 <template v-slot:content>
                  Gia gia hạn mỗi năm: 120.000đ
                 </template>
                </Tooltip> 
              </div>
            </div>
          </div>
          <div class="actions min-w-[200px] text-right">
            <div v-if="isCheck"><Button btnClass="bg-white text-gray" icon="heroicons-outline:search" isLoading textLoading="Đang kiểm tra..." ></Button></div>
            <div v-else-if="isTaken"><Button btnClass="bg-gray-50 text-gray" icon="heroicons-outline:user" :link="`/whois/${ domain }`" text="Xem whois" /></div>
            <div v-else-if="inCart"><Button  btnClass="bg-red-50 text-red-500" icon="heroicons-outline:credit-card" link="/cart" text="Thanh toán" /></div>
            <div v-else><Button :btnClass="isFeatured ? 'bg-primary text-white' : 'text-primary border-2 border-primary'" icon="heroicons-outline:shopping-cart" text="Đăng ký"   /></div>
          </div>
      </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
import Badge from '@/components/base/Badge.vue'
import Icon from '@/components/base/Icon.vue'
import Button from '@/components/base/Button.vue';
import Tooltip from '@/components/base/Tooltip.vue';

import { useRouter } from 'vue-router'
const router = useRouter()
defineProps(
{
  domain: {
    type: String,
    default: ''
  },
  isTaken: {
    type: Boolean,
    default: false
  },
  isCheck:  {
    type: Boolean,
    default: false
  }, 
  isAddToCart:  {
    type: Boolean,
    default: false
  }, 
  inCart:  {
    type: Boolean,
    default: false
  }, 
  isFeatured:  {
    type: Boolean,
    default: false
  },
}
)

</script>

<style>
.found-domain {
.name{
  .icon {
    @apply text-primary bg-green-100 rounded p-2 mr-2
  }
}
}
.not-found-domain {
.name{
  .icon {
    @apply text-gray-300 bg-gray-50 rounded p-2 mr-2
  }
  .domain{
    @apply line-through text-gray-300
  }
}
}
</style>