<template>
  <Table
    :headings="['', 'Tên miền', 'Ngày hết hạn', 'Gia hạn', 'Trạng thái', 'Thao tác']"
    :headerClasses="['w-16', null, null, null, null, 'w-20']"
  >
    <table-row v-for="domain in domains" :key="domain.id">
      <table-col>
        <product-icon :variant="domain.status">
          <GlobeAltIcon />
        </product-icon>
      </table-col>
      <table-col>
        <p class="text-black text-md">{{ domain.name }}</p>
        <p class="text-sm text-gray">Còn {{ domain.daytoexpire }} ngày sẽ hết hạn</p>
      </table-col>
      <table-col>
        <p class="text-sm text-gray">{{ domain.expires }}</p>
      </table-col>
      <table-col>
        <p class="text-md text-black">{{ domain.recurring_amount }}đ</p>
        <p class="text-sm text-gray">{{ domain.period }} năm</p>
      </table-col>
      <table-col>
        <badge
          :variant="domain.status"
          :labels="{ Active: 'Hoạt động', inactive: 'Đã huỷ', Pending: 'Đang xử lý' }"
        />
      </table-col>
      <table-col>
        <action-button
          @click="
            router.push({
              name: 'domainDetail',
              params: { domainId: domain.id, domain: domain.name }
            })
          "
          class="bg-gray-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </action-button>
      </table-col>
    </table-row>
  </Table>
</template>

<script setup>
import { defineProps } from 'vue'
import Table from '@/components/base/table/Table.vue'
import TableRow from '@/components/base/table/TableRow.vue'
import TableCol from '@/components/base/table/TableCol.vue'
import Badge from '@/components/base/Badge.vue'
import PercentBar from '@/components/base/PercentBar.vue'
import ProductIcon from '@/components/general/ProductIcon.vue'
import ActionButton from './ActionButton.vue'
import { GlobeAltIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps(['domains'])
</script>

<style></style>
