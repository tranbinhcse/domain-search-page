<template>
  <div class="max-w-7xl m-auto mt-5">
    <a-row>
    <a-col> <Summary :totalDomains="totalDomains" /></a-col>
    <a-col> 
      <Box class="col-span-3">
        <heading text="Quản lý tên miền" />
        <sub-heading text="Có 10 tên miền sắp hết hạn" />
        <domain-list :domains="domains" />
      </Box>
    </a-col>
    <a-col>
      <Box class="col-span-3">
        <heading text="Sản phẩm/Dịch vụ" />
        <sub-heading text="Có 77 dịch vụ sắp hết hạn" />
        <service-list />
      </Box>
    </a-col>
    <a-col>
      <Box class="col-span-3">
        <heading text="Yêu cầu hỗ trợ" />
        <sub-heading text="Có 9 yêu cầu đang xử lý" />
        <ticket-list />
      </Box>
    </a-col>
  </a-row>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue';
import Box from '@/components/base/Box.vue'
import Summary from '@/components/dashboard/Summary.vue'
import DomainList from '@/components/general/DomainList.vue'
import ServiceList from '@/components/general/ServiceList.vue'
import TicketList from '@/components/general/TicketList.vue'
import Heading from '@/components/base/Heading.vue'
import SubHeading from '@/components/base/SubHeading.vue'
import { useDashboardStore } from '@/stores/dashBoardStore'

const dashboardStore = useDashboardStore()
const { getDashboard } = dashboardStore
const { loading, domains, totalDomains } = storeToRefs(dashboardStore)

onMounted(getDashboard)

</script>

<style scoped></style>