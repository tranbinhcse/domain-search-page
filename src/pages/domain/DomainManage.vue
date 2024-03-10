<template>
  <div>
    <div class="flex justify-end pb-4 gap-x-3">
      <dropdown-menu v-model="filter.status"
        :menus="{
          Active: 'Hoạt động',
          Pending: 'Đang xử lý',
          Inactive: 'Đã hết hạn',
        }"
        >
      </dropdown-menu>
      <Button @click="router.push({name: 'domainRegister'})">Đăng ký mới</Button>
    </div>
    <Box>
      <DomainList :domains="domains" />
    </Box>
    <Pagination :totalPages="totalPages" v-model="page" />
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import DomainList from "@/components/general/DomainList.vue";
import { useDomainStore } from "@/stores/domain/domainStore";
import Box from "@/components/base/Box.vue";
import Pagination from "@/components/base/Pagination.vue";
import DropdownMenu from "@/components/base/DropdownMenu.vue";
import Button from '@/components/base/Button.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const domainStore = useDomainStore()
const { getDomains } = domainStore
const { domains, page, totalPages, filter } = storeToRefs(domainStore)
const router = useRouter()

onMounted(getDomains)

</script>