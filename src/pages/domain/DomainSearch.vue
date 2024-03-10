<template>
  <div class="h-full">
    <div class="bg-green-500 text-white  -mt-10 sm:-mx-6 lg:-mx-8 py-10">
      <div class="max-w-7xl m-auto">
        <div class="box-search-domain text-center ">
            <div class="form-search-domain">
              <div class="find-domain-header">
                <p class="text-white font-bold text-3xl">Tìm kiếm tên miền thương hiệu của bạn</p>
                <p class="p-2">Nhập từ khoá của bạn để đăng ký và bảo vệ thương hiệu của bạn trên internet!</p>
              </div>
              <form class="search-form-wrapper relative" @submit.prevent="handleSearchSubmit" action="/" method="get">
                <Input type="text" required v-model="searchKey" name="domain" placeholder="Nhập tên thương hiệu" class="bg-white text-black border-2 border-green-500 text-xl leading-5 h-[65px]" />
                <Button :isLoading="searching" type="submit" text="Tìm kiếm" icon="heroicons-outline:search" class="flex-auto absolute right-3 top-[50%] -translate-y-[50%]" />
              </form>
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
    <div class="max-w-7xl m-auto" id="searchResults" ref="searchResultsRef">
        <DomainSearchResult v-if="domains.length > 0" :domains="domains" />       
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
    <div  v-if="domains.length < 1" class="max-w-7xl m-auto" >
          <DomainPricing />  
        </div>
    <div>
      <div class="bg-white py-24 sm:py-32 mt-10 lg:-mx-8 sm:-mx-6">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-2xl lg:mx-0">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Vì sao nên đăng ký tên miền tại TinoHost</h2>
            <p class="mt-6 text-lg leading-8 text-gray-600">Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.</p>
          </div>
          <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div v-for="feature in features" :key="feature.name" class="flex flex-col">
                <dt class="text-base font-semibold leading-7 text-gray-900">
                  <div class="mb-6 flex h-20 w-20 items-center justify-center rounded-lg bg-green-500">
                    <component :is="feature.icon" class="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {{ feature.name }}
                </dt>
                <dd class="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p class="flex-auto">{{ feature.description }}</p>
                  <p class="mt-6">
                    <a :href="feature.href" class="text-sm font-semibold leading-6 text-green-500">Learn more <span aria-hidden="true">→</span></a>
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="bg-gray-900 py-24 sm:py-32 lg:-mx-8 sm:-mx-6">
        <div class="mx-auto max-w-7xl">
          <div class="mx-auto  divide-y divide-white/10">
            <h2 class="text-2xl font-bold leading-10 tracking-tight text-white">Câu hỏi thường gặp</h2>
            <dl class="mt-10 space-y-6 divide-y divide-white/10">
              <Disclosure as="div" v-for="faq in faqs" :key="faq.question" class="pt-6" v-slot="{ open }">
                <dt>
                  <DisclosureButton class="flex w-full items-start justify-between text-left text-white">
                    <span class="text-base font-semibold leading-7">{{ faq.question }}</span>
                    <span class="ml-6 flex h-7 items-center">
                      <PlusSmallIcon v-if="!open" class="h-6 w-6" aria-hidden="true" />
                      <MinusSmallIcon v-else class="h-6 w-6" aria-hidden="true" />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as="dd" class="mt-2 pr-12">
                  <p class="text-base leading-7 text-gray-300">{{ faq.answer }}</p>
                </DisclosurePanel>
              </Disclosure>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
    <!-- Domain Page Info -->
  </div>
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

import { onMounted, ref } from 'vue';
const domainSearchStore = useDomainSearchStore()
const { searchDomains, getDomainTlds } = domainSearchStore
const { domains, searchKey, tldsLoaded, searching } = storeToRefs(domainSearchStore)
const searchResultsRef = ref(null);

const domainRegisterStore = useDomainRegisterStore()
const { addToCart } = domainRegisterStore
const { cartDomains } = storeToRefs(domainRegisterStore)



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