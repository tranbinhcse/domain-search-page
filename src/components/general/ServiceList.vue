<template>
  <Table :headings="['', 'Dịch vụ', 'Trạng thái', 'Chu kỳ thanh toán', 'Thao tác']"
    :headerClasses="['w-16', null, null, null, 'w-20']">
    <table-row>
      <table-col>
        <product-icon :variant="'inactive'" icon="cloud-hosting" />
      </table-col>
      <table-col>
        <p class="text-black text-md">Cloud Hosting - CH SSD 4G</p>
        <p class="text-sm text-gray">14/12/2023</p>
      </table-col>
      <table-col>
        <badge :variant="'inactive'" :labels="{ active: 'Hoạt động', inactive: 'Đã huỷ', processing: 'Đang xử lý' }" />
      </table-col>
      <table-col>
        <percent-bar :variant="'inactive'" :percent="40" />
      </table-col>
      <table-col>
        <action-button class="bg-gray-50" icon="more" />
      </table-col>
    </table-row>
    <table-row>
      <table-col>
        <product-icon :variant="'active'" icon="business-hosting" />
      </table-col>
      <table-col>
        <p class="text-black text-md">Business Hosting - BH SSD 100G</p>
        <p class="text-sm text-gray">14/12/2023</p>
      </table-col>
      <table-col>
        <badge :variant="'active'" :labels="{ active: 'Hoạt động', inactive: 'Đã huỷ', processing: 'Đang xử lý' }" />
      </table-col>
      <table-col>
        <percent-bar :variant="'active'" :percent="60" />
      </table-col>
      <table-col>
        <action-button class="bg-gray-50" icon="more" />
      </table-col>
    </table-row>
    <table-row>
      <table-col>
        <product-icon :variant="'processing'" icon="dns" />
      </table-col>
      <table-col>
        <p class="text-black text-md">VPS Pro - Pro SSD 30G</p>
        <p class="text-sm text-gray">14/12/2023</p>
      </table-col>
      <table-col>
        <badge :variant="'processing'" :labels="{ active: 'Hoạt động', inactive: 'Đã huỷ', processing: 'Đang xử lý' }" />
      </table-col>
      <table-col>
        <percent-bar :variant="'processing'" :percent="60" />
      </table-col>
      <table-col>
        <action-button class="bg-gray-50" icon="more" />
      </table-col>
    </table-row>
    <table-row>
      <table-col>
        <product-icon :variant="'inactive'" icon="os" />
      </table-col>
      <table-col>
        <p class="text-black text-md">Cloud Hosting - CH SSD 4G</p>
        <p class="text-sm text-gray">14/12/2023</p>
      </table-col>
      <table-col>
        <badge :variant="'inactive'" :labels="{ active: 'Hoạt động', inactive: 'Đã huỷ', processing: 'Đang xử lý' }" />
      </table-col>
      <table-col>
        <percent-bar :variant="'inactive'" :percent="60" />
      </table-col>
      <table-col>
        <action-button class="bg-gray-50" icon="more" />
      </table-col>
    </table-row>
    <table-row>
      <table-col>
        <product-icon :variant="'active'" icon="domain" />
      </table-col>
      <table-col>
        <p class="text-black text-md">Cloud Hosting - CH SSD 4G</p>
        <p class="text-sm text-gray">14/12/2023</p>
      </table-col>
      <table-col>
        <badge :variant="'active'" :labels="{ active: 'Hoạt động', inactive: 'Đã huỷ', processing: 'Đang xử lý' }" />
      </table-col>
      <table-col>
        <percent-bar :variant="'active'" :percent="60" />
      </table-col>
      <table-col>
        <action-button class="bg-gray-50" icon="more" />
      </table-col>
    </table-row>
  </Table>
</template>

<script setup>
import Table from '@/components/base/table/Table.vue'
import TableRow from '@/components/base/table/TableRow.vue'
import TableCol from '@/components/base/table/TableCol.vue'
import Badge from '@/components/base/Badge.vue'
import PercentBar from '@/components/base/PercentBar.vue'
import ProductIcon from '@/components/general/ProductIcon.vue'
import ActionButton from './ActionButton.vue'

</script>

<style></style>