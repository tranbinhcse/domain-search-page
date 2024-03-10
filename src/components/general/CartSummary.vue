<template>
    <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 ">
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl relative">
                  <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button type="button" class="relative -m-2 p-2 text-gray-400 hover:text-gray-500" @click="open = false">
                          <span class="absolute -inset-0.5" />
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div class="mt-8">
                      <div class="flow-root ">
                        <div class=" text-center absolute top-0 bottom-0 left-0 right-0 bg-white/40 flex justify-center items-center" v-if="quoteLoading">
                            <div role="status" class="">
                                <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>

                        <ul role="list" class=" divide-y divide-gray-200" v-if="cartQuote">
                          <template v-for="(product, key) in cartQuote?.items" :key="key" class="flex py-6"> 
                            <li v-for="(domain, k) in  product.domains" :key="k" class="flex py-6"> 
                              <div class="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div class="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a  >{{ domain.name }}</a>
                                    </h3>
                                    <p class="ml-4">{{ $currency(domain.price) }}</p> 
                                  </div>
                                  <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
                                </div>
                                <div class="flex flex-1 items-end justify-between text-sm">
                                  <p class="text-gray-500"> {{ domain.period }} năm</p>

                                  <div class="flex">

 



                                    <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500" @click="handleRemoveInCart({  type: 'domain', years: domain.period, action: domain.type,'name': domain.name, 'tld': domain.tld})">Remove</button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </template>
                        </ul>
                      </div>
                    </div>
                  </div>
 
                  <div class="border-t border-gray-200 px-4 py-6 sm:px-6" v-if="cartQuote">
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{{ $currency(cartQuote.summary.subtotal) }}</p>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div class="mt-6">
                      <a href="#" class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</a>
                    </div>
                    <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{{ ' ' }}
                        <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500" @click="open = false">
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
 
    <div v-if="cartItems.length > 0" class="fixed inset-x-0 bottom-0 bg-white px-4 py-4 sm:px-6">
      <div class="max-w-7xl mx-auto flex justify-between">
        <div>
          <template  v-if="cartQuote">
           
            <p>Items in Cart: {{ cartItems.length }}</p> 
          </template>
        </div>
       <div> 
        <a href="#" @click.stop="handleSummaryCart()"  class="flex items-center justify-center rounded-md border border-transparent bg-green-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 min-w-80 pointer">Checkout</a>
       </div>
      </div>
    </div>
  </template>
  
  <script setup>
    import { onMounted, ref } from 'vue'
    import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
    import { XMarkIcon } from '@heroicons/vue/24/outline'
    import Icon from '@/components/base/Icon.vue'
    import Button from '@/components/base/Button.vue';

    import { storeToRefs } from 'pinia'
    import { useDomainSearchStore } from "@/stores/domain/domainSearchStore";
    import { useCartStore } from "@/stores/cartStore";
    import { useDomainRegisterStore } from "@/stores/domain/domainRegisterStore";

    const domainRegisterStore = useDomainRegisterStore()
    const cartStore = useCartStore()
    const { getQuote } = cartStore
    const { removeInCart, } = domainRegisterStore
    const { cartQuote, quoteLoading } = storeToRefs(cartStore)
    const { cartItems } = storeToRefs(domainRegisterStore)


    const open = ref(false)

  const handleRemoveInCart = async (item) => {
    await removeInCart(item)
    await getQuote();
  }
    const handleSummaryCart = async() => {
      open.value = true
      await getQuote();
     
    }


    onMounted(() => {
      getQuote();
    })
  </script>
  