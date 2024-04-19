<template>
  <a-spin class="w-full" :loading="loading" tip="This may take a while...">
    <div class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Xác nhận thông tin đơn hàng</h1>

      <div v-if="cartItems.length == 0">
        <a-result status="404" subtitle="Giỏ hàng của bạn đang trống">
          <template #extra>
            <a-space>
              <a-button type="primary" @click="router.push({name:'DomainSearch'})">Tìm kiếm tên miền</a-button>
            </a-space>
          </template>
        </a-result>
      </div>

      <form v-else class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section aria-labelledby="cart-heading" class="lg:col-span-7">
          <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

          <ul role="list" class="  bg-white p-4 mb-6 rounded">
            <li v-for="(product, productIdx) in cartItems" :key="product.tld" class="p-2 mb-2 border-b">
              <div class="flex pb-3 sm:pb-6" v-if="product.error == false">
                <template v-if="product.type == 'domain'">

                  <div class="flex-shrink-0">
                    <img src="@/assets/products/img_cart-domains-default.svg"
                      class="h-14 w-14 rounded-md object-cover object-center sm:h-38 sm:w-38" />
                  </div>

                  <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div class="w-full">
                        <div class="flex justify-between">
                          <h3 class="text-xl">
                            <a class="font-medium text-gray-700 hover:text-gray-800">{{ product.name }}</a>
                          </h3>
                        </div>
                        <p class="mt-1 mb-2 text-sm text-gray-500"><span class="uppercase">{{ product.tld }} </span> {{
                          $t(`Domain ${product.action}`) }}</p>
                        <p>Chu kỳ thanh toán: {{ product.years }} {{ $t('years') }}</p>

                      </div>
                      <div class="mt-4 sm:mt-0 sm:pr-9">
                        <div class="absolute right-0 top-0 text-right leading-10">
                          <p class="text-md font-medium text-gray-900">{{ $currency(product.price) }}</p>
                          <p class="text-gray-500 text-sm line-through" v-if="product.before">{{
                            $currency(product.before) }}</p>
                          <p class="text-gray-500 text-sm" v-if="product.data?.promocode">Miễn phí *</p>
                        </div>
                      </div>
                    </div>
                    <p class="text-gray-500" v-if="product.data?.promocode">Đơn hàng sẽ tự động điều chỉnh giá 0đ khi
                      phát hành hoá đơn.</p>
                  </div>

                </template>


                <template v-if="product.type == 'product'">

                  <div class="flex-shrink-0">
                    <img src="@/assets/products/img_cart-domains-default.svg"
                      class="h-14 w-14 rounded-md object-cover object-center sm:h-38 sm:w-38" />
                  </div>
                  <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div class="w-full">
                        <div class="flex justify-between">
                          <h3 class="text-xl">
                            <a class="font-medium text-gray-700 hover:text-gray-800">{{ product.category_name }} - {{
                              product.name }}</a>
                          </h3>
                        </div>
                        <p class="mt-1 mb-2 text-sm text-gray-500"><span class="uppercase">{{ product.domain }} </span>
                        </p>
                        <p>Chu kỳ thanh toán: {{ $t(product.cycle) }}</p>

                      </div>
                      <div class="mt-4 sm:mt-0 sm:pr-9">
                        <div class="absolute right-0 top-0 text-right leading-10">
                          <p class="text-md font-medium text-gray-900">{{ $currency(product.price) }}</p>
                          <p class="text-gray-500 text-sm line-through" v-if="product.before">{{
                            $currency(product.before) }}</p>

                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
              <div v-else class="flex pb-3 sm:pb-6">
                <div class="flex-shrink-0">
                  <img src="@/assets/products/img_cart-domains-default.svg"
                    class="h-14 w-14 rounded-md object-cover object-center sm:h-38 sm:w-38" />
                </div>
                <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <h3 class="text-xl">
                    <a class="font-medium text-gray-700 hover:text-gray-800">{{ product.name }}</a>
                  </h3>


                  <div>
                    <p v-for="error in product.error" :key="error" class="text-red-500">{{ error.message }}</p>
                  </div>
                </div>

                <button type="button" @click="handleRemoveInCart(product)"
                  class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Remove</span>
                  <Icon icon="heroicons-outline:trash" class="h-5 w-5" aria-hidden="true" />
                </button>

              </div>


            </li>
            <li v-if="freeVN.data?.promotionCode">
              <p>Tên miền <b>{{ freeVN.data?.domainName }}</b> sẽ tự động đặt giá 0đ khi bạn hoàn tất đơn hàng.</p>
            </li>
          </ul>
          <div>

            <Box v-if="!isPromocode && isFree">
              <a-form ref="formRef" layout="horizontal"
                @submit="getFreePromoVN({ domain: domainRequestPromo, idnumber: contacts.registrant.nationalid })">
                <a-row :gutter="8">
                  
                  <a-col :span="16">
                    <a-form-item no-style>
                      <a-select v-model="domainRequestPromo" default-active-first-option
                        placeholder="Chọn tên miền bạn muốn miễn phí">
                        <a-option v-for="domain in domainFree" :key="domain.name" :value="domain.name">{{ domain.name }}</a-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item>
                      <a-button :loading="loadingGetPromoVN" type="primary" htmlType="submit">Lấy mã miễn phí</a-button>
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-form>
              <a-alert type="error" v-if="errorPromo ">
                {{ errorPromo }}
              </a-alert>
              <a-col :span="24" v-if="!errorPromo">
                    <a-alert class="mt-2">Tên miền trong giỏ hàng của bạn áp dụng chính sách miễn phí trong 2 năm. Bạn vui lòng chọn tên miền và thực hiện lấy mã để áp dụng  chính sách.</a-alert>
                  </a-col>
            </Box>
           
            <Box v-if="hasDomain">


              <div class="flex justify-between items-center mb-5">
                <Heading text="Thông tin chủ thể tên miền" />
                <a-button @click="router.push({ name: 'DomainConfig' })">Chỉnh sửa</a-button>
              </div>

              <a-descriptions column="1" bordered>
                <descriptions-item span="2" label="Tên chủ thể"
                  v-if="contacts.registrant.type == 'org' || contacts.registrant.company"> {{
                    contacts.registrant.companyname
                  }}</descriptions-item>
                <descriptions-item span="2" label="Mã số thuế"
                  v-if="contacts.registrant.type == 'org' || contacts.registrant.company"> {{ contacts.registrant.taxid
                  }}</descriptions-item>
                <descriptions-item span="2" label="Họ và tên">

                  {{ contacts.registrant.lastname }} {{ contacts.registrant.firstname }}
                </descriptions-item>

                <descriptions-item span="2" label="Mã định danh"> {{ contacts.registrant.nationalid
                  }}</descriptions-item>
                <descriptions-item span="2" label="Số điện thoại"> {{ contacts.registrant.phonenumber
                  }}</descriptions-item>
                <descriptions-item span="2" label="Email"> {{ contacts.registrant.email }}</descriptions-item>
                <descriptions-item span="2" label="Giới tính"> {{ contacts.registrant.gender }}</descriptions-item>
                <descriptions-item span="2" label="Ngày sinh"> {{ contacts.registrant.birthday }}</descriptions-item>
                <descriptions-item span="2" label="Địa chỉ">
                  {{ contacts.registrant.address1 }},
                  {{ contacts.registrant.ward }},
                  {{ contacts.registrant.city }},
                  {{ contacts.registrant.state }},
                  {{ contacts.registrant.country }}
                </descriptions-item>

              </a-descriptions>

            </Box>
          </div>

          <Heading text="Phương thức thanh toán"
            class="text-primary uppercase text-3xl font-bold border-b-2 border-gray-50 pb-2 mb-2" />
          <PaymentMethod v-model="paymentMethod" :methods="paymentMethods" />

        </section>

        <!-- Order summary -->
        <OrderSummary />
      </form>
    </div>
  </a-spin>

</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import Box from '@/components/base/Box.vue'
import Heading from '@/components/base/Heading.vue'
import { Notification } from '@arco-design/web-vue';
import PaymentMethod from '@/components/general/PaymentMethod.vue'
import OrderSummary from './OrderSummary.vue'
import Icon from '@/components/base/Icon.vue'

import { storeToRefs } from 'pinia'

import { useCartStore } from "@/stores/cartStore";
import { useEkycStore } from "@/stores/ekycStore";
import { useDomainRegisterStore } from "@/stores/domain/domainRegisterStore";
import { useRouter } from 'vue-router'
const domainRegisterStore = useDomainRegisterStore()
const cartStore = useCartStore()
const ekycStore = useEkycStore()
const { updateItem, getQuote, order, removeInCart, getFreePromocode, getPaymentMethods } = cartStore

const { cartQuote, cartItems, quoteLoading, error, hasDomain, requestEkyc, loading, paymentMethods, paymentMethod } = storeToRefs(cartStore)
const { listDomainFree, getFreePromoVN } = domainRegisterStore
const { contacts, domainFree, isPromocode, freeVN, confirmContact, errorPromo, loadingGetPromoVN } = storeToRefs(domainRegisterStore)
const { isFree } = storeToRefs(ekycStore)

const router = useRouter()
const open = ref(false)

const handleRemoveInCart = async (item) => {
  await removeInCart(item)
  await getQuote();
}
 

onMounted(async () => {
  if(cartItems.value.length == 0) {
    return
  }
  await listDomainFree();
  await getQuote();
  if (!confirmContact.value && hasDomain.value) {
    router.push({ path: '/cart/shopping-cart' })
  }
  await getPaymentMethods()
})
 
const domainRequestPromo = ref(domainFree.value[0]?.name)

watch(() => error.value, (newErrors) => {

  if (Array.isArray(newErrors) && newErrors.length === 1 && typeof newErrors[0] === 'string') {
    // Nếu `newErrors` là một mảng chứa một chuỗi lỗi
    Notification.error({
      title: 'Đã có lỗi xảy ra',
      content: newErrors[0]
    });
  } else if (Array.isArray(newErrors) && newErrors.length > 0) {
    // Nếu `newErrors` là một mảng chứa các cặp key-value
    newErrors.forEach((errorArray) => {
      const [key, errorItem] = errorArray;
      Notification.error({
        title: errorItem.code,
        content: errorItem.message
      });
    });
  }

})

</script>