<template>
    <section v-show="quoteLoading === false" aria-labelledby="summary-heading" class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8" v-if="cartQuote">
  


        <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Tổng quan</h2>

                    <div class="flex justify-between text-base font-medium text-gray-900">
                    <p>Tạm tính</p>
                    <p>{{ $currency(cartQuote.summary.subtotal) }}</p>
                    </div>

                    <div class="flex justify-between text-base font-medium text-gray-900">
                    <p>Thuế</p>
                    <p>
                        <p v-for="tax in cartQuote.summary.tax" :key="tax.name"class="text-gray-500">
                        <small>{{ tax.name }}: </small>
                        <small>{{ $currency(tax.tax) }}</small>
                        </p>
                    </p>
                    </div>

                    <div class="flex justify-between text-base font-medium text-gray-900">
                    <p>Giảm giá</p>
                    <p>{{ $currency(cartQuote.summary.discount) }}</p>
                    </div>
                    <div class="flex justify-between text-base font-medium text-gray-900">
                    <p>Tín dụng</p>
                    <p>{{ $currency(cartQuote.summary.credit) }}</p>
                    </div>

                    <div class="flex justify-between text-base font-medium text-gray-900">
                    <p>Tổng thanh toán</p>
                    <p>{{ $currency(cartQuote.summary.total) }}</p>
                    </div>

                    <div class="">
                    <p>Thanh toán định kỳ</p>
                        <ul>
                            <li class="flex justify-between gap-4" v-for="recurring in cartQuote.summary.recurring">
                                <p>{{ recurring.title }}</p>
                                <p>{{ recurring.price }}</p>
                            </li>
                        </ul>
                    </div>

                    <div class="mt-6">
                    <a-button  @click="createOrder()" type="primary" class="w-full">Tiếp tục</a-button>
                    </div>
                   
            

        </section>
</template>


<script setup>
    import { onMounted, watch } from 'vue'
 
    import { Notification } from '@arco-design/web-vue';
    
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
     const { contacts, domainFree, isPromocode, freeVN, confirmContact, errorPromo } = storeToRefs(domainRegisterStore)
     const { isFree } = storeToRefs(ekycStore)

     const router = useRouter() 
   
    //  onMounted(async() => {
    //   await listDomainFree();
    //   await getQuote(); 
    //    if(!confirmContact.value && hasDomain.value){
    //     router.push({path: '/cart/shopping-cart'})
    //    }
    //    await getPaymentMethods()
    //  })
     const createOrder = async() => {
       await order(router)
     }
    //  const nextStep = () => {
    //    router.push({path: '/ekyc'})
    //  }

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
   