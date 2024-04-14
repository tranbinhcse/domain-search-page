<template>
  <div class="h-full">
    <div class="bg-black text-white     py-10">
      <div class="max-w-7xl m-auto">
        <div class="box-search-domain text-center ">
            <div class="form-search-domain">
              <div class="find-domain-header">
                <p class="text-white font-bold text-3xl">Tìm kiếm tên miền thương hiệu của bạn</p>
                <p class="p-2">Nhập từ khoá của bạn để đăng ký và bảo vệ thương hiệu của bạn trên internet!</p>
              </div>

              <div class="search-form-wrapper relative" >
                <a-input type="text" allow-clear required v-model="searchKey" name="domain" placeholder="Nhập tên thương hiệu" class="w-full text-3xl h-[65px]" />
                <a-button type="primary" :loading="searching" @click="handleSearchSubmit" class="absolute top-1/2 -translate-y-1/2 right-[10px]"  >
                 
                  <template #icon>
                    <IconSearch />
                  </template>
                  Tìm kiếm
                </a-button>
 
              </div>
 
 
            </div>
  
            <div class="domain-checker__tlds-list sr-only">
                <div class="domain-checker__tld ">
                  <b>.com</b>
                  <p>250.000đ</p>
                </div>
                <div class="domain-checker__tld ">
                  <b>.com</b>
                  <p>250.000đ</p>
                </div>
                <div class="domain-checker__tld ">
                  <b>.com</b>
                  <p>250.000đ</p>
                </div>
                <div class="domain-checker__tld ">
                  <b>.com</b>
                  <p>250.000đ</p>
                </div>
                <div class="domain-checker__tld ">
                  <b>.com</b>
                  <p>250.000đ</p>
                </div>
                <div class="domain-checker__tld ">
                  <b>.com</b>
                  <p>250.000đ</p>
                </div>
                <div class="domain-checker__tld ">
                  <b>.com</b>
                  <p>250.000đ</p>
                </div>
                <div class="domain-checker__tld ">
                  <b>.com</b>
                  <p>250.000đ</p>
                </div>

            </div>
            <div>
              <p class="text-gray font-italic text-sm p-4">* Bảo vệ quyền riêng tư WHOIS miễn phí được bao gồm trong mọi tên miền nếu đuôi tên miền được phép ẩn thông tin.</p>
            </div>
        </div>
      </div> 
    </div> 
    <div> 

    </div>
    <div class="max-w-7xl m-auto" id="searchResults" ref="searchResultsRef">
        <DomainSearchResult v-if="domains.length > 0" :domains="domains" :topDomains="topDomains"/>       
        <Button v-if="searching" btnClass="bg-white text-gray w-full h-20 flex  items-center justify-center" isLoading textLoading="Chúng tôi đang tìm kiếm tên miền phù hợp với bạn..." />
          <div class="mt-10 m-auto text-center" v-if="!searching & domains.length > 0" >
            <Button @click="searchDomains(true)" iconPosition="right" btnClass="bg-gray-50 text-gray" icon="heroicons-outline:arrow-down" text="Xem thêm"></Button>
        </div>

      
    </div>

    <div> 
    </div>


    <!-- Domain Page Info -->
 <div  v-if="domains.length < 1" >
    <div class="domain-page-info max-w-7xl m-auto mt-5 mb-5"  >
      <div class="section-popular-domain">
        <h2 class="font-bold text-3xl text-center py-10">Tên miền nổi bật được lựa chọn</h2>
        <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <li v-for="tld in PopularTlds" :key="tld.email" class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-left border">
            <div class="flex flex-1 flex-col p-8">
              <img class="h-20 w-32 flex-shrink-0 " :src="tld.imageUrl" alt="" />
              <dl class="mt-1 flex flex-grow flex-col justify-between">
                <dt class="sr-only">description</dt>
                <dd class="text-sm text-gray-500">{{ tld.title }}</dd>
                <dt class="sr-only">price</dt>
                <dd class="mt-3">
                  <span class="text-sm font-medium line-through text-gray-400">{{  tld.before }}</span>
                  <span class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-sm font-bold text-green-700 ring-1 ring-inset ring-green-600/20 ml-3">{{ tld.save }}</span>
                </dd>
                <div class="mt-4">
                  <span class="font-bold text-3xl text-red-500">{{ tld.price }}</span><span>đ/năm</span>
                </div>
              </dl>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div  class="max-w-7xl m-auto" >
          <DomainPricing />  
        </div>
     
  
  </div>
    <!-- Domain Page Info -->
  </div>
  <div class="h-[100px]"></div>
  
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useDomainSearchStore } from "@/stores/domain/domainSearchStore";
import { useDomainRegisterStore } from "@/stores/domain/domainRegisterStore";
 
import Button from '@/components/base/Button.vue';
import Input from '@/components/base/Input.vue';
import Icon from '@/components/base/Icon.vue';
import DomainSearchResult from '@/components/general/DomainSearchResult.vue' 
import DomainPricing from '@/components/general/DomainPricing.vue' 
import { EnvelopeIcon, PhoneIcon } from '@heroicons/vue/20/solid'
import { InboxIcon, TrashIcon, UsersIcon } from '@heroicons/vue/24/outline'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/vue/24/outline'
import { IconSearch } from '@arco-design/web-vue/es/icon';

import { onMounted, ref } from 'vue';
const domainSearchStore = useDomainSearchStore()
const { searchDomains, getDomainTlds } = domainSearchStore
const { domains,topDomains,  searchKey, tldsLoaded, searching } = storeToRefs(domainSearchStore)
const searchResultsRef = ref(null);

const domainRegisterStore = useDomainRegisterStore()
const { addToCart } = domainRegisterStore
const { cartItems } = storeToRefs(domainRegisterStore)
  


const scrollTosearchResults = () => {
  if (searchResultsRef.value) {
    const topPosition = searchResultsRef.value.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scrollTo({ top: topPosition, behavior: 'smooth' });
  }
}
// Gọi hàm scrollTosearchResults khi form được submit
const handleSearchSubmit = () => {
  searchDomains();
  setTimeout(() => {
      scrollTosearchResults();
  }, 1000); // 5000 milliseconds = 5 seconds

}
onMounted(() => {
  getDomainTlds()
})



const PopularTlds = [
  {
    name: '.com',
    title: 'Build trust with the best-known domain names.',
    before: '399.000',
    save: 'SAVE 95%',
    price: '100.000',
    imageUrl:
      'https://assets.hostinger.com/images/domain-checker-2020/tlds-all/icon-com-f0ce55a39c.svg',
  },  {
    name: '.com',
    title: 'Build trust with the best-known domain names.',
    before: '399.000',
    save: 'SAVE 95%',
    price: '10.000đ',
    imageUrl:
      'https://assets.hostinger.com/images/domain-checker-2020/tlds-all/icon-cloud-54f394268c.svg',
  },  {
    name: '.com',
    title: 'Build trust with the best-known domain names.',
    before: '399.000',
    save: 'SAVE 95%',
    price: '239.000',
    imageUrl:
      'https://assets.hostinger.com/images/domain-checker-2020/tlds-all/icon-shop-9c845d872c.svg',
  },  {
    name: '.com',
    title: 'Build trust with the best-known domain names.',
    before: '399.000',
    save: 'SAVE 95%',
    price: '199.000',
    imageUrl:
      'https://assets.hostinger.com/images/domain-checker-2020/tlds-all/icon-icu-b7151fba15.svg',
  },  {
    name: '.com',
    title: 'Build trust with the best-known domain names.',
    before: '399.000',
    save: 'SAVE 95%',
    price: '300.000',
    imageUrl:
      'https://assets.hostinger.com/images/domain-checker-2020/tlds-all/icon-com-f0ce55a39c.svg',
  },  {
    name: '.com',
    title: 'Build trust with the best-known domain names.',
    before: '399.000',
    save: 'SAVE 95%',
    price: '300.000',
    imageUrl:
      'https://assets.hostinger.com/images/domain-checker-2020/tlds-all/icon-com-f0ce55a39c.svg',
  }, 
  {
    name: '.com',
    title: 'Build trust with the best-known domain names.',
    before: '399.000',
    save: 'SAVE 95%',
    price: '300.000',
    imageUrl:
      'https://assets.hostinger.com/images/domain-checker-2020/tlds-all/icon-com-f0ce55a39c.svg',
  }, 
  {
    name: '.com',
    title: 'Build trust with the best-known domain names.',
    before: '399.000',
    save: 'SAVE 95%',
    price: '300.000',
    imageUrl:
      'https://assets.hostinger.com/images/domain-checker-2020/tlds-all/icon-com-f0ce55a39c.svg',
  }, 
]




const features = [
  {
    name: 'Unlimited inboxes',
    description:
      'Non quo aperiam repellendus quas est est. Eos aut dolore aut ut sit nesciunt. Ex tempora quia. Sit nobis consequatur dolores incidunt.',
    href: '#',
    icon: InboxIcon,
  },
  {
    name: 'Manage team members',
    description:
      'Vero eum voluptatem aliquid nostrum voluptatem. Vitae esse natus. Earum nihil deserunt eos quasi cupiditate. A inventore et molestiae natus.',
    href: '#',
    icon: UsersIcon,
  },
  {
    name: 'Spam report',
    description:
      'Et quod quaerat dolorem quaerat architecto aliquam accusantium. Ex adipisci et doloremque autem quia quam. Quis eos molestiae at iure impedit.',
    href: '#',
    icon: TrashIcon,
  },
]


const faqs = [
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  }, 
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  }, 
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  }, 
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  }, 
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  }, 

  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  }, 
]

</script>

<style>
.box-search-domain{
  @apply p-5 px-10 rounded max-w-7xl m-auto;
  .form-search-domain{
    .find-domain-header{
      @apply pb-5;
      h1{
        @apply text-2xl font-bold text-gray-800
      }
    }
  }
  .domain-checker__tlds-list{
    @apply flex items-center justify-between divide-x divide-gray-200 py-4;
    .domain-checker__tld{
      @apply  px-4;
      b {
        @apply font-bold text-white
      }
      p{
        @apply text-sm text-gray-300
      }
    }
  }

}
</style>