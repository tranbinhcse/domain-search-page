<template>
      <Table
        :headings="['', 'Yêu cầu', 'Trạng thái', 'Thao tác']"
        :headerClasses="['w-16', null, null, null, 'w-20']"
      >
        <table-row>
          <table-col>
            <product-icon  :variant="'inactive'" icon="ticket" />
          </table-col>
          <table-col>
            <p class="text-black text-md">#52468 - Thông báo lịch bảo trì hệ thống</p>
            <p class="text-sm text-gray">Phòng kỹ thuật</p>
          </table-col>
          <table-col>
            <badge :variant="'inactive'" :labels="{ active: 'Hoạt động', inactive: 'Đã huỷ', processing: 'Đang xử lý' }" />
          </table-col>
          <table-col>
            <action-button icon="arrow-right" class="bg-gray-50" />
          </table-col>
        </table-row>
        <table-row>
          <table-col>
            <product-icon  :variant="'active'" icon="ticket" />
          </table-col>
          <table-col>
            <p class="text-black text-md">#52468 - Thông báo lịch bảo trì hệ thống cụm máy chủ tại VNPT Tân Thuận</p>
            <p class="text-sm text-gray">Phòng kỹ thuật</p>
          </table-col>
          <table-col>
            <badge :variant="'active'" :labels="{ active: 'Hoạt động', inactive: 'Đã huỷ', processing: 'Đang xử lý' }" />
          </table-col>
          <table-col>
            <action-button icon="arrow-right" class="bg-gray-50" />
          </table-col>
        </table-row>
        <table-row>
          <table-col>
            <product-icon  :variant="'processing'" icon="ticket" />
          </table-col>
          <table-col>
            <p class="text-black text-md">#52468 - Thông báo lịch bảo trì hệ thống cụm máy chủ tại VNPT Tân Thuận</p>
            <p class="text-sm text-gray">Phòng kỹ thuật</p>
          </table-col>
          <table-col>
            <badge :variant="'processing'" :labels="{ active: 'Hoạt động', inactive: 'Đã huỷ', processing: 'Đang xử lý' }" />
          </table-col>
          <table-col>
            <action-button icon="arrow-right" class="bg-gray-50" />
          </table-col>
        </table-row>
        <table-row>
          <table-col>
            <product-icon  :variant="'active'" icon="ticket" />
          </table-col>
          <table-col>
            <p class="text-black text-md">#52468 - Thông báo lịch bảo trì hệ thống</p>
            <p class="text-sm text-gray">Phòng kỹ thuật</p>
          </table-col>
          <table-col>
            <badge :variant="'active'" :labels="{ active: 'Hoạt động', inactive: 'Đã huỷ', processing: 'Đang xử lý' }" />
          </table-col>
          <table-col>
            <action-button icon="arrow-right" class="bg-gray-50" />
          </table-col>
        </table-row>
        <table-row>
          <table-col>
            <product-icon  :variant="'active'" icon="ticket" />
          </table-col>
          <table-col>
            <p class="text-black text-md">#52468 - Thông báo lịch bảo trì hệ thống</p>
            <p class="text-sm text-gray">Phòng kỹ thuật</p>
          </table-col>
          <table-col>
            <badge :variant="'active'" :labels="{ active: 'Hoạt động', inactive: 'Đã huỷ', processing: 'Đang xử lý' }" />
          </table-col>
          <table-col>
            <action-button icon="arrow-right" class="bg-gray-50" />
          </table-col>
        </table-row>
      </Table>
</template>

<script setup>
import Table from '@/components/base/table/Table.vue'
import TableRow from '@/components/base/table/TableRow.vue'
import TableCol from '@/components/base/table/TableCol.vue'
import Badge from '@/components/base/Badge.vue'
import ProductIcon from '@/components/general/ProductIcon.vue'
import ActionButton from './ActionButton.vue'

</script>

<style>

</style>