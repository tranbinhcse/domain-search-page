<template>
  <a-spin class="w-full" :loading="loading" tip="This may take a while...">
    <div v-if="invoice" class="max-w-7xl mx-auto mt-5">
      <Box>
        <div class="md:flex md:items-center md:justify-between md:space-x-5">
          <div class="flex items-start space-x-5">
            <div class="flex-shrink-0">
              <div class="relative">
                <img
                  class="h-16 w-16 rounded-full"
                  src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                  alt=""
                />
                <span class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
              </div>
            </div>
            <!--
              Use vertical padding to simulate center alignment when both lines of text are one line,
              but preserve the same layout if the text wraps without making the image jump around.
          -->
            <div class="pt-1.5">
              <h1 class="text-2xl font-bold text-gray-900">{{ invoice.number }}</h1>
              <p class="text-sm text-gray-500">
                Hạn thanh toán <time class="font-medium">{{ invoice.paybefore }}</time>
              </p>
            </div>
          </div>
          <div
            class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3 divide-x divide-gray-50"
          >
            <div class="px-4 py-6 sm:px-6 lg:px-8">
              <p class="text-sm font-medium leading-6 text-gray-400">Tổng tiền</p>
              <p class="mt-2 flex items-baseline gap-x-2">
                {{ $currency(invoice.total) }}
              </p>
            </div>
            <div class="px-4 py-6 sm:px-6 lg:px-8">
              <p class="text-sm font-medium leading-6 text-gray-400">Trạng thái</p>
              <p class="mt-2 flex items-baseline gap-x-2">
                <Status :variant="invoice.status" />
              </p>
            </div>
          </div>
        </div>
      </Box>
      <div class="flex gap-4">
        <Box class="flex-auto">
          <Heading
            text="Chi tiết hoá đơn"
            class="text-primary uppercase text-lg border-b-2 border-gray-50 pb-2 mb-2"
          />

          <div v-html="invoiceBody"></div>
        </Box>
        <Box v-if="invoice.status == 'Unpaid'" class="flex-auto max-w-[400px]">
          <div class="px-4 py-6 sm:px-6 lg:px-8" v-if="invoice.status == 'Unpaid'">
            <p class="text-sm font-medium leading-6 text-gray-400">Hình thức thanh toán</p>
            <p class="mt-2 flex items-baseline gap-x-2">
              <a-select
                :style="{ 'min-width': '220px' }"
                placeholder="Please select ..."
                v-model="paymentMethod"
                @change="changePaymentMethod"
              >
                <a-option
                  v-for="(name, id) in paymentMethods"
                  :value="id"
                  :key="id"
                  :label="name"
                />
              </a-select>
            </p>
          </div>
          <div class="px-4 py-6 sm:px-6 lg:px-8">
            <div v-html="paymentLink"></div>
          </div>
        </Box>
      </div>
    </div>
  </a-spin>
</template>

<script setup>
import Box from '@/components/base/Box.vue'
import Switch from '@/components/base/Switch.vue'
import Button from '@/components/base/Button.vue'
import Heading from '@/components/base/Heading.vue'
import Status from '@/components/base/Status.vue'

import { onMounted, ref } from 'vue'

import { useInvoiceDetailStore } from '@/stores/invoice/invoiceDetailStore'
import { usePaymentStore } from '@/stores/invoice/paymentStore'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
const invoiceDetailStore = useInvoiceDetailStore()
const paymentStore = usePaymentStore()

const { getInvoice } = invoiceDetailStore
const { getPaymentMethods, getPaymentLink } = paymentStore
const { invoice, transactions, invoiceBody, loading, paymentMethod } =
  storeToRefs(invoiceDetailStore)
const { paymentMethods, paymentLink } = storeToRefs(paymentStore)

const route = useRoute()

onMounted(async () => {
  await getInvoice(route.params.id)
  await getPaymentMethods()

  await getPaymentLink(invoice.value.id, paymentMethod.value)
})

const changePaymentMethod = async () => {
  await getPaymentLink(invoice.value.id, paymentMethod.value)
}
</script>

<style scoped></style>
