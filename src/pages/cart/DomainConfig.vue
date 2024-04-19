<template>
     <div class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ $t('Shopping Cart') }}</h1>
      <h2 id="cart-heading">Gần xong rồi, chỉ còn một bức nữa thôi.</h2>

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
          <ul role="list" class="bg-white p-4 rounded" v-if="quoteLoading">
              <a-skeleton :animation="true" v-for="i in 3" :key="i">
                <a-space direction="vertical" :style="{width:'100%'}" size="large" class="border-b mb-4"> 
                  <a-row gutter="8" class="mb-5 bg-white">
                    <a-col :span="4"> <a-skeleton-shape shape="circle" size="large" /></a-col>
                    <a-col :span="16"> 
                      <a-skeleton-line :rows="3" :widths="['100%', '30%','70%']" :line-height="15" />
                    </a-col>
                    <a-col :span="4">
                      <a-skeleton-line :rows="2" :widths="['100%', '30%','70%']" />
                    </a-col>
                  </a-row>
                </a-space>
              </a-skeleton>
          </ul>
          <ul role="list" class="bg-white p-4 rounded" v-else>
            <li v-for="(product, productIdx) in cartItems" :key="product.tld" class="p-2  mb-2 border-b">
                <div class="flex pb-3 sm:pb-6" v-if="product.error ==  false">
                  <template v-if="product.type == 'domain'">
                     
                    <div class="flex-shrink-0">
                        <img src="@/assets/products/img_cart-domains-default.svg" class="h-14 w-14 rounded-md object-cover object-center sm:h-38 sm:w-38" />
                    </div>
                    
                    <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div class="relative pr-9 ">
                          <div class="w-full">
                              <div class="flex justify-between">
                              <h3 class="text-xl">
                                  <a class="font-medium text-gray-700 hover:text-gray-800">{{ product.name }}</a>
                              </h3>
                              </div>
                            
                              <p class="mt-1 mb-2 text-sm text-gray-500"><span class="uppercase">{{ product.tld }} </span>  {{ $t(`Domain ${product.action}`) }}</p>
                              <select class="border-gray-300 border p-2 rounded" @change="handleChangePeriod(product, $event)"  :name="`quantity-${productIdx}`" v-model="product.years">
                                <option :value="cycles.value" v-for="cycles in product?.cycles?.items" :key="cycles.value">{{ cycles.formatted }}</option>
                              </select>
                          </div>
                          <div class="mt-4 sm:mt-0 sm:pr-9">
                              <div class="absolute right-0 top-0 text-right leading-10">
                                  <p class="text-md font-medium text-gray-900">{{ $currency(product.price) }}</p>
                                  <p class="text-gray-500 text-sm line-through"  v-if="product.before">{{ $currency(product.before) }}</p>
                              <button type="button" @click="handleRemoveInCart(product)" class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                  <span class="sr-only">Remove</span>
                                  <Icon icon="heroicons-outline:trash" class="h-5 w-5" aria-hidden="true" />
                              </button>
                              </div>
                          </div>
                        </div>
                    </div>
                  
                  </template>
                  <template v-if="product.type == 'product'">
                 
                    <div class="flex-shrink-0">
                        <img src="@/assets/products/img_cart-domains-default.svg" class="h-14 w-14 rounded-md object-cover object-center sm:h-38 sm:w-38" />
                    </div>
                    <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div class="relative pr-9">
                        <div class="w-full">
                            <div class="flex justify-between">
                            <h3 class="text-xl">
                                <a class="font-medium text-gray-700 hover:text-gray-800">{{ product.category_name }} - {{ product.name }}</a>
                            </h3>
                            </div>
                            <p class="mt-1 mb-2 text-sm text-gray-500"><span class="uppercase">{{ product.domain }} </span></p>
                            <p>Chu kỳ thanh toán: {{ $t(product.cycle) }}</p>

                        </div>
                        <div class="mt-4 sm:mt-0 sm:pr-9">
                            <div class="absolute right-0 top-0 text-right leading-10">
                                <p class="text-md font-medium text-gray-900">{{ $currency(product.price) }}</p>
                                <p class="text-gray-500 text-sm line-through" v-if="product.before">{{ $currency(product.before) }}</p>
                            <button type="button" @click="handleRemoveInCart(product)" class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                <span class="sr-only">Remove</span>
                                <Icon icon="heroicons-outline:trash" class="h-5 w-5" aria-hidden="true" />
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                  </template>
                </div>
                <div v-else  class="flex pb-3 sm:pb-6">
                  <div class="flex-shrink-0">
                        <img src="@/assets/products/img_cart-domains-default.svg" class="h-24 w-24 rounded-md object-cover object-center sm:h-38 sm:w-38" />
                    </div>
                    <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <h3 class="text-xl">
                                <a class="font-medium text-gray-700 hover:text-gray-800">{{ product.name }}</a>
                            </h3>
                  <div><p v-for="error in product.error" :key="error" class="text-red-500">{{ error.code }}</p>  </div>
                  </div>

                  <button type="button" @click="handleRemoveInCart(product)" class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                <span class="sr-only">Remove</span>
                                <Icon icon="heroicons-outline:trash" class="h-5 w-5" aria-hidden="true" />
                            </button>

                </div>
              
              
            </li>
          </ul>
         
          <div>
            <a-button @click="clearCart()">{{ $t('Clear cart') }}</a-button>
          </div>
          <div class="mt-8 bg-white p-4 rounded"  v-if="hasDomain">
            <Heading text="Thông tin chủ thể" class="text-primary uppercase text-lg border-b-2 border-gray-50 pb-2 mb-2" />
            <template v-if="requestEkyc">
              <DomainContactEkyc />
            </template>
            <template v-else>
              <DomainContactForm  />
            </template>
           
           
          </div>
          <div v-else class="mt-8">
            <a-button v-if="!quoteLoading" type="primary" @click="goCheckout()" class="w-full">Tiếp tục</a-button>
          </div>
        </section>

        <!-- Order summary -->
        <section aria-labelledby="summary-heading" class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
          <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Tổng quan</h2>
              <template v-if="quoteLoading" >
                <a-skeleton :animation="true">
                  <a-space direction="vertical" :style="{width:'100%'}" size="large">
                    <a-skeleton-line :rows="3" />
                    <a-skeleton-shape />
                  </a-space>
                </a-skeleton>
              </template>

              <template v-else >
                <div v-if="cartQuote">
                     <div class="flex justify-between text-base font-medium text-gray-900">
                      <p>Tạm tính</p>
                      <p>{{ $currency(cartQuote.summary.subtotal) }}</p>
                    </div>

                    <div class="flex justify-between text-base font-medium text-gray-900" v-if="cartQuote.summary.tax">
                      <p>Thuế</p>
                      <p>{{ $currency(cartQuote.summary.tax) }}</p>
                    </div>

                    <div class="flex justify-between text-base font-medium text-gray-900" v-if="cartQuote.summary.discount">
                      <p>Giảm giá</p>
                      <p>{{ $currency(cartQuote.summary.discount) }}</p>
                    </div>
                    <div class="flex justify-between text-base font-medium text-gray-900" v-if="cartQuote.summary.credit">
                      <p>Tín dụng</p>
                      <p>{{ $currency(cartQuote.summary.credit) }}</p>
                    </div>

                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <p>Tổng thanh toán</p>
                      <p>{{ $currency(cartQuote.summary.total) }}</p>
                    </div>

                    <div class="mt-5">
                      <p>Thanh toán định kỳ</p>
                        <ul>
                            <li class="flex justify-between gap-4" v-for="recurring in cartQuote.summary.recurring" :key="recurring.title">
                                <p>{{ recurring.title }}</p>
                                <p>{{ $currency(recurring.price) }}</p>
                            </li>
                        </ul>
                    </div>


                    <a-button type="text" class="w-full mt-5">Kéo xuống để tiếp tục</a-button>
                  
                    
                  </div>
                  </template>
       
        </section>
      </form>
    </div>
   

    
</template>
  
  <script setup>
    import { onMounted, ref, watch } from 'vue' 
    import { XMarkIcon } from '@heroicons/vue/24/outline'
    import Icon from '@/components/base/Icon.vue'
    import Heading from '@/components/base/Heading.vue'
    import Switch from '@/components/base/Switch.vue';
    import DomainContactForm from '@/pages/cart/DomainContactForm.vue';
    import DomainContactEkyc from '@/pages/cart/DomainContactEkyc.vue';
    import { storeToRefs } from 'pinia'

    import { useCartStore } from "@/stores/cartStore";
    import { useDomainRegisterStore } from "@/stores/domain/domainRegisterStore";
    import { useRouter } from 'vue-router'
    // const domainRegisterStore = useDomainRegisterStore()
    const cartStore = useCartStore()
   
    const { updateItem, removeInCart, clearCart, getQuote} = cartStore

  

    const { cartQuote, quoteLoading, hasDomain, requestEkyc, loading } = storeToRefs(cartStore)
    const { cartItems } = storeToRefs(cartStore)

    const router = useRouter()
    const open = ref(false)

  const handleRemoveInCart = async (item) => {
    await removeInCart(item)
    await getQuote();
  }
    
  const goCheckout = () => {
    router.push({path: '/cart/checkout'})
  }
    const handleChangePeriod = async(product, e) => {
        product.years = e.target.value;
        // await updateItem(product)
        await getQuote();
     
    }
    onMounted(async () => {

      if(cartItems.value.length == 0) {
        return
      }

      await getQuote();
      console.log(hasDomain.value);
    })

    

    
  </script>
  