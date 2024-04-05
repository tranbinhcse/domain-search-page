<template>
  <div v-if="domain" class="max-w-7xl mx-auto mt-5">
    <Box>
      <div class="md:flex md:items-center md:justify-between md:space-x-5">
        <div class="flex items-start space-x-5">
        <div class="flex-shrink-0">
            <div class="relative">
            <img class="h-16 w-16 rounded-full" src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="" />
            <span class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
            </div>
        </div>
        <!--
            Use vertical padding to simulate center alignment when both lines of text are one line,
            but preserve the same layout if the text wraps without making the image jump around.
        -->
        <div class="pt-1.5">
            <h1 class="text-2xl font-bold text-gray-900">{{ domain.name }}</h1>
            <p class="text-sm text-gray-500">Ngày hết hạn <time class="font-medium">{{ domain.expires }}</time></p>
        </div>
        </div>
        <div class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3 divide-x divide-gray-50">
            <div class=" px-4 py-6 sm:px-6 lg:px-8">
                <p class="text-sm font-medium leading-6 text-gray-400">Khoá tên miền</p>
                <p class="mt-2 flex items-baseline gap-x-2">
                    <Switch v-model="domain.reglog" />
                </p>
            </div>
            <div class=" px-4 py-6 sm:px-6 lg:px-8">
                <p class="text-sm font-medium leading-6 text-gray-400">Tự động gia hạn</p>
                <p class="mt-2 flex items-baseline gap-x-2">
                    <Switch v-model="domain.autorenew" />
                </p>
            </div>
            <div class=" px-4 py-6 sm:px-6 lg:px-8">
                <p class="text-sm font-medium leading-6 text-gray-400">Ẩn thông tin whois</p>
                <p class="mt-2 flex items-baseline gap-x-2">
                    <Switch v-model="domain.idProtection" />
                </p>
            </div>
            <div class=" px-4 py-6 sm:px-6 lg:px-8">
                <p class="text-sm font-medium leading-6 text-gray-400">{{ domain.recurring_amount }}đ</p>
                <p class="mt-2 flex items-baseline gap-x-2">
                    <Button>Gia hạn</Button>
                </p>
            </div>
        </div>
    </div>
    </Box>
    <Box>
      <Heading text="Cấu hình tên miền" class="text-green-500 uppercase text-lg border-b-2 border-gray-50 pb-2 mb-2" />
      <dl
        class="mx-auto grid grid-cols-1 gap-px /5 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-gray-50 mb-[40px] mt-5">
        <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
          <dt class="text-sm font-medium leading-6 text-gray-300 uppercase">Bảo mật thông tin</dt>
          <dd class="w-full flex text-sm  text-gray-900 cursor-pointer">
            <ArrowLongRightIcon class="mr-3 h-5 w-5 text-gray-300" aria-hidden="true" />
            Quản lý bảo mật thông tin
          </dd>
        </div>
        <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
          <dt class="text-sm font-medium leading-6 text-gray-300 uppercase">Hồ sơ tên miền</dt>
          <dd class="w-full flex text-sm  text-gray-900 cursor-pointer">
            <ArrowLongRightIcon class="mr-3 h-5 w-5 text-gray-300" aria-hidden="true" />
            Quản lý hồ sơ
          </dd>
        </div>
        <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
          <dt class="text-sm font-medium leading-6 text-gray-300 uppercase">Mở khoá/EPP</dt>
          <dd class="w-full flex text-sm  text-gray-900 cursor-pointer">
            <ArrowLongRightIcon class="mr-3 h-5 w-5 text-gray-300" aria-hidden="true" />
            Quản lý khoá epp
          </dd>
        </div>
      </dl>
      <Heading text="Thông tin tên miền" class="text-green-500 uppercase text-lg border-b-2 border-gray-50 pb-2 mb-2" />
      <dl class="mx-auto flex divide-x divide-gray-50 mb-[40px] mt-5">
        <div class="flex flex-col gap-x-4 gap-y-2 bg-white pr-4 py-10 sm:pr-6 xl:r-8 flex-auto">
          <dt class="text-sm font-medium leading-6 text-gray-500 uppercase">Thông tin liên hệ</dt>
          <dd v-if="contact" class="w-full flex text-sm  text-gray-900 cursor-pointer">
            <dl>
              <div class="px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm eading-6 text-gray-900">Chủ thể</dt>
                <dd class="mt-1 text-sm font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ contact.name }}</dd>
              </div>
              <div class="px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm  leading-6 text-gray-900">Email</dt>
                <dd class="mt-1 text-sm font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ contact.email }}</dd>
              </div>
              <div class="px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm  leading-6 text-gray-900">Số điện thoại</dt>
                <dd class="mt-1 text-sm font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ contact.phonenumber }}</dd>
              </div>
              <div class="px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm  leading-6 text-gray-900">Địa chỉ</dt>
                <dd class="mt-1 text-sm font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ contact.address1 }} - {{ contact.city }} - {{ contact.state }}</dd>
                <dd v-if="contact.address2" class="mt-1 text-sm font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ contact.address2 }}</dd>
              </div>
              <div class="w-full flex text-sm  text-gray-900 cursor-pointer mt-4">
                <ArrowLongRightIcon class="mr-3 h-5 w-5 text-gray-300" aria-hidden="true" />
                Quản lý thông tin chủ thể
              </div>
            </dl>
          </dd>
        </div>
        <div class="flex flex-col items-baseline  gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
          <dt class="text-sm font-medium leading-6 text-gray-500 uppercase">Nameservers</dt>
          <dd class="w-full flex text-sm  text-gray-900 cursor-pointer">
            <dl>
              <div
                v-for="(nameserver, index) in domain.nameservers.filter(n => n != '')"
                :key="index"
                class="px-1 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dd class="mt-1 text-sm font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ nameserver }}</dd>
              </div>
              
              <div class="w-full flex text-sm  text-gray-900 cursor-pointer mt-4">
                <ArrowLongRightIcon class="mr-3 h-5 w-5 text-gray-300" aria-hidden="true" />
                Quản lý Nameserver
              </div>
            </dl>
          </dd>
        </div>
        <div class="flex flex-col items-baseline  gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8 ">
          <dt class="text-sm font-medium leading-6 text-gray-500 uppercase">DNS</dt>
          <dd class="w-full flex text-sm  text-gray-900 cursor-pointer">
            <div class="w-full flex text-sm  text-gray-900 cursor-pointer mt-4">
              <ArrowLongRightIcon class="mr-3 h-5 w-5 text-gray-300" aria-hidden="true" />
              Quản lý bảng ghi DNS
            </div>
          </dd>
        </div>
        <div class="flex flex-col items-baseline  gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
          <dt class="text-sm font-medium leading-6 text-gray-500 uppercase">Hồ sơ tên miền</dt>
          <dd class="w-full flex text-sm  text-gray-900 cursor-pointer">
            <div class="w-full flex text-sm  text-gray-900 cursor-pointer mt-4">
              <ArrowLongRightIcon class="mr-3 h-5 w-5 text-gray-300" aria-hidden="true" />
              Quản lý hồ sơ
            </div>
          </dd>
        </div>
      </dl>
      <Heading text="Dịch vụ liên quan" class="text-green-500 uppercase text-lg border-b-2 border-gray-50 pb-2 mb-2" />
      <div class="mx-auto mt-12 grid max-w-sm grid-cols-1 gap-x-8 gap-y-10 sm:max-w-none  sm:grid-cols-4 lg:grid-cols-7 ">
        <div v-for="incentive in incentives" :key="incentive.name"
          class="text-center sm:flex sm:text-left lg:block lg:text-center">
          <div class="sm:flex-shrink-0">
            <div class="flow-root">
              <img class="mx-auto h-16 w-16 green-500" :src="incentive.imageSrc" alt="" />
            </div>
          </div>
          <div class="mt-3 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
            <h3 class="text-sm font-medium text-gray-900">{{ incentive.name }}</h3>
            <p class="mt-2 text-sm text-gray-500">{{ incentive.description }}</p>
          </div>
        </div>
      </div>
    </Box>
  </div>
</template>

<script setup>
import Box from '@/components/base/Box.vue'
import Switch from '@/components/base/Switch.vue'
import Button from '@/components/base/Button.vue'
import { ArrowLongRightIcon } from '@heroicons/vue/20/solid'
import Heading from '@/components/base/Heading.vue'
import { onMounted } from 'vue'
const incentives = [
  {
    name: 'Free shipping',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg',
    description: "It's not actually free we just price it into the products. Someone's paying for it, and it's not us."
  },
  {
    name: '10-year warranty',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg',
    description: "If it breaks in the first 10 years we'll replace it. After that you're on your own though."
  },
  {
    name: 'Free shipping',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg',
    description: "It's not actually free we just price it into the products. Someone's paying for it, and it's not us."
  },
  {
    name: '10-year warranty',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg',
    description: "If it breaks in the first 10 years we'll replace it. After that you're on your own though."
  },
  {
    name: 'Free shipping',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg',
    description: "It's not actually free we just price it into the products. Someone's paying for it, and it's not us."
  },
  {
    name: '10-year warranty',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg',
    description: "If it breaks in the first 10 years we'll replace it. After that you're on your own though."
  },
  {
    name: 'Exchanges',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-exchange-simple.svg',
    description:
      "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though."
  }
]

import { useDomainDetailStore } from '@/stores/domain/domainDetailStore'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
const domainDetailStore = useDomainDetailStore()
const { getDomain } = domainDetailStore
const { loaded, domain, regLog, autoRenew, contact } = storeToRefs(domainDetailStore)

const route = useRoute()

onMounted(() => getDomain(route.params.id))

</script>

<style scoped></style>