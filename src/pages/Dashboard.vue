<template>
  <div class="grid grid-cols-4 gap-x-8 mb-10">
    <Summary :totalDomains="totalDomains" />
    <Box>
      <heading text="Quản lý tên miền" />
      <sub-heading text="Có 10 tên miền sắp hết hạn" />
      <domain-list :domains="domains" />
    </Box>
    <Box>
      <heading text="Sản phẩm/Dịch vụ" />
      <sub-heading text="Có 77 dịch vụ sắp hết hạn" />
      <service-list />
    </Box>
    <Box>
      <heading text="Yêu cầu hỗ trợ" />
      <sub-heading text="Có 9 yêu cầu đang xử lý" />
      <ticket-list />
    </Box>
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