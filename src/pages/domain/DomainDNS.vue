<template>
  <div v-if="domain" class="max-w-7xl mx-auto mt-5">
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
            <h1 class="text-2xl font-bold text-gray-900">{{ domain }}</h1>
          </div>
        </div>
        <div
          class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3 divide-x divide-gray-50"
        ></div>
      </div>
    </Box>
    <Box>
      <Heading
        text="Cấu hình DNS"
        class="text-primary uppercase text-lg border-b-2 border-gray-50 pb-2 mb-2"
        @on-click="handleOpenModal"
      />

      <a-table :columns="columns" :data="records" style="margin-top: 20px">
        <template #content="{ record }"> {{ record.prio }} {{ record.content }} </template>
        <template #optional="{ record }">
          <a-button
            type="outline"
            status="success"
            size="mini"
            class="mr-2"
            @click="() => handleOpenModal(record)"
          >
            <template #icon><IconPen /></template>
          </a-button>
          <a-button type="outline" status="danger" size="mini" @click="() => handleOpenModalDelete(record)">
            <template #icon><IconEraser /></template>
          </a-button>
        </template>
      </a-table>
    </Box>
  </div>
  <a-alert />
  <a-modal
    :visible="isShowModal"
    ok-text="Tạo"
    @ok="handleOpenModal"
    @cancel="handleCloseModal"
    :footer="false"
  >
    <template #title>{{
      isEditRecord ? 'Chỉnh sửa thông tin Record' : 'Nhập các thông tin sau để tạo Record'
    }}</template>
    <div class="flex items-center justify-center">
      <a-form
        ref="formRef"
        :model="domainDNSForm"
        layout="vertical"
        :rules="rules"
        @submit="({values, errors}) => isEditRecord ? handleEditRecord(values, errors) : handleCreateRecord(values, errors)"
      >
        <a-form-item field="type" label="Loại" required>
          <!-- <a-input v-model="domainDNSForm.type" placeholder="Vui lòng nhập Loại" /> -->
          <a-select
            v-model="domainDNSForm.type"
            :style="{ width: '100%' }"
            placeholder="Vui lòng chọn Loại"
            :disabled="isEditRecord"
          >
            <a-option v-for="item of listType" :value="item" :label="item" />
          </a-select>
        </a-form-item>
        <a-form-item field="name" label="Tên" required>
          <a-input v-model="domainDNSForm.name" placeholder="Vui lòng nhập tên" />
        </a-form-item>
        <a-form-item field="ttl" label="TTL">
          <a-input v-model="domainDNSForm.ttl" placeholder="Vui lòng nhập TTL" />
        </a-form-item>
        <a-form-item field="priority" label="Ưu tiên" required>
          <a-input v-model="domainDNSForm.priority" placeholder="Vui lòng nhập Ưu tiên" />
        </a-form-item>
        <a-form-item field="content" label="Dữ liệu" required>
          <a-input v-model="domainDNSForm.content" placeholder="Vui lòng nhập Dữ liệu" />
        </a-form-item>
        <a-form-item style="display: flex; justify-content: flex-end">
          <a-button type="primary" html-type="submit">{{
            isEditRecord ? 'Sửa record' : 'Tạo record'
          }}</a-button>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
  <a-modal
    :visible="isShowModalDelete"
    ok-text="Xoá"
    @ok="handleDelete"
    @cancel="handleCloseModal"
    title="Xoá record"
  >
    <div class="flex justify-center">
      <span class="text-center w-full">Bạn có muốn xoá record này không?</span>
    </div>
  </a-modal>
</template>

<script setup>
import Box from '@/components/base/Box.vue'
import Heading from '@/components/base/Heading.vue'
import { onMounted, ref, reactive } from 'vue'

import { useDomainDetailStore } from '@/stores/domain/domainDetailStore'
import { useDomainDNSStore } from '@/stores/domain/domainDNSStore'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Notification } from '@arco-design/web-vue'

const domainDetailStore = useDomainDetailStore()
const domainDNSStore = useDomainDNSStore()
const { getDNS, createDNS, editDNS, deleteDNS } = domainDNSStore
// const { getDomain } = domainDetailStore
//   const { loaded, domain } = storeToRefs(domainDetailStore)
const { records, domain, serviceId, zoneId, listType, maxTTL } = storeToRefs(domainDNSStore)

const route = useRoute()
//   onMounted(() => getDomain(route.params.id))
onMounted(() => getDNS(route.params.id))

const isShowModal = ref(false)
const isShowModalDelete = ref(false)
const isEditRecord = ref(false)
const formRef = ref(null)
const recordId = ref('')

const domainDNSForm = reactive({
  name: '',
  ttl: 3600,
  priority: 0,
  type: '',
  content: ''
})

// const options = {
//   Beijing: ['Haidian', 'Chaoyang', 'Changping'],
//   Sichuan: ['Chengdu', 'Mianyang', 'Aba'],
//   Guangdong: ['Guangzhou', 'Shenzhen', 'Shantou']
// }
const columns = [
  {
    title: 'Tên',
    dataIndex: 'name',
    slotName: 'name'
  },
  {
    title: 'Ưu tiên',
    dataIndex: 'priority'
  },
  {
    title: 'TTL',
    dataIndex: 'ttl',
    slotName: 'ttl'
  },
  {
    title: 'Loại',
    dataIndex: 'type',
    slotName: 'type'
  },
  {
    title: 'Dữ liệu',
    dataIndex: 'content',
    slotName: 'content'
  },
  {
    title: 'Thao tác',
    slotName: 'optional'
  }
]

const rules = {
  name: [
    { required: true, message: 'Yêu cầu nhập Tên' },
    {
      validator: (value, cb) => {
        if (!value.includes(domain.value)) {
          cb('Tên bạn nhập không hợp lệ')
        } else {
          cb()
        }
      }
    }
  ],
  type: [{ required: true, message: 'Yêu cầu chọn Loại' }],
  ttl: [
    {
      validator: (value, cb) => {
        if (value > maxTTL.value) {
          cb(`TTL không được lớn hơn ${maxTTL.value}`)
        } else if (!value) {
          cb('Yêu cầu nhập TTL')
        } else {
          cb()
        }
      }
    }
  ],
  priority: [{ required: true, message: 'Yêu cầu nhập Ưu tiên' }],
  content: [{ required: true, message: 'Yêu cầu nhập Dữ liệu' }]
}

// const handleChange = (rowIndex) => {
//   data[rowIndex].city = ''
// }

const handleOpenModal = (record) => {
  isShowModal.value = true
  if (record?.name) {
    Object.assign(domainDNSForm, record)
    recordId.value = record.id
    isEditRecord.value = true
  }
}

const handleOpenModalDelete = (record) => {
  isShowModalDelete.value = true
  recordId.value = record.id
}

const handleCloseModal = () => {
  if (isShowModalDelete.value) {
    isShowModalDelete.value = false
  }
  handleResetForm()
}

const handleCreateRecord = async (values, errors) => {
  if (errors) return
  const result = await createDNS(serviceId.value, zoneId.value, domainDNSForm)
  handleResetForm()
  if (result?.record.name) {
    Notification.success({
      message: 'Success',
      title: 'Tạo record thành công'
    })
  }
}

const handleEditRecord = async () => {
  const result = await editDNS(recordId.value, serviceId.value, zoneId.value, domainDNSForm)
  handleResetForm()
  if (result?.record.id) {
    Notification.success({
      message: 'Success',
      title: 'Sửa record thành công'
    })
  }
}

const handleResetForm = () => {
  isShowModal.value = false
  isEditRecord.value = false
  isShowModalDelete.value = false
  formRef.value.resetFields()
}

const handleDelete = async () => {
  const result = await deleteDNS(recordId.value, serviceId.value, zoneId.value)
  if (result) {
    Notification.success({
      message: 'Success',
      title: 'Xoá record thành công'
    })
  }
  handleResetForm()
}
</script>

<style scoped></style>
