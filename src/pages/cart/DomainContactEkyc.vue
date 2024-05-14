<template>
  <a-form :model="contacts" ref="formRef" scrollToField="registrant.nationalid">
    <a-form-item field="registrant.nationalid" label="Số căn cước">
      <a-input v-model="contacts.registrant.nationalid" placeholder="please enter your post..." />
      <a-button
        type="primary"
        @click="CheckNationalId(contacts.registrant.nationalid)"
        :style="{ marginLeft: '10px' }"
        >Kiểm tra</a-button
      >
    </a-form-item>
  </a-form>
 

  <a-form
    ref="formRef"
    :model="contacts"
    layout="vertical"
    class="mt-5"
    @submit="handleSubmit"
    v-if="ekyc != 'check'"
    :scrollToFirstError="true"
  >
    <a-row :gutter="8" v-if="!ocrOK && !ekyc" class="mb-5">
      <a-col :span="24">
        <a-alert type="error">
          Chủ thể chưa xác thực EKYC. Bạn cần xác thực EKYC để đăng ký tên miền trong giỏ hàng.
        </a-alert>
      </a-col>
      <a-col :span="24">
        <a-modal v-model:visible="visibleQrCodeModel" :footer="false" class="text-center" @cancel="handleCloseQrCode">
          <template #title>
            Quét mã QrCode bằng thiết bị di động có camera để thực hiện eKYC thông tin chủ thể tên miền nhanh chóng.
          </template>
          <div class="flex items-center justify-center" >
            <QRCodeVue3 :dotsOptions="{color: '#16a984'}" :width="300":height="300" :value="`https://kyc.info.vn/ekyc.php?token=${ekycToken}&desktop=true&request_id=${request_id}`" />
          </div>
        </a-modal>
      </a-col>
    </a-row>
    <a-row v-else>
      <a-col :span="24">
        <a-alert type="success" class="mb-4" title="Chúc mừng" >
          
          Chủ thể của bạn đã được xác thực eKYC hoàn tất, vui lòng kiểm tra địa chỉ và thông tin liên hệ bên dưới và tiếp tục quá trình đăng ký tên miền.
        </a-alert>
      </a-col>
    </a-row>
    <a-input v-model="contacts.registrant.type" type="hidden" class="sr-only" />
    <a-form-item label="Họ và tên" :content-flex="false" :merge-props="false">
      <a-row :gutter="8">
        <a-col :span="12">
          <a-form-item
            field="registrant.lastname"
            validate-trigger="input"
            :rules="[{ required: true, message: 'firstname is required' }]"
            no-style
          >
            <a-input
              html-readonly="readonly"
              disabled
              readonly
              v-model="contacts.registrant.lastname"
              placeholder="Vui lòng nhập họ và tên lót..."
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            field="registrant.firstname"
            validate-trigger="input"
            :rules="[{ required: true, message: 'lastname is required' }]"
            no-style
          >
            <a-input
              readonly
              disabled
              v-model="contacts.registrant.firstname"
              placeholder="Vui lòng nhập tên..."
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form-item>

    <a-row :gutter="8">
      <a-col :span="10">
        <a-form-item
          field="registrant.nationalid"
          label="Số căn cước "
          :rules="[
            { required: true, message: 'nationalid is required' },
            { minLength: 12, message: 'must be greater than 12 characters' },
            { maxLength: 15, message: 'must be greater than 15 characters' },
            { type: 'number', message: 'Please enter number' }
          ]"
          :validate-trigger="['change', 'input']"
        >
          <a-input
            readonly
            disabled
            v-model="contacts.registrant.nationalid"
            placeholder="Vui lòng nhập số cần cước..."
          />
        </a-form-item>
      </a-col>

      <a-col :span="10">
        <a-form-item
          field="registrant.birthday"
          label="Ngày sinh"
          :rules="[{ required: true, message: 'age is required' }]"
        >
          <a-input
            readonly
            disabled
            v-model="contacts.registrant.birthday"
            locale="vi"
            placeholder="Vui lòng chọn ngày sinh..."
          />
        </a-form-item>
      </a-col>
      <a-col :span="4">
        <a-form-item
          field="registrant.gender"
          label="Giới tính"
          :rules="[{ required: true, message: 'age is required' }]"
        >
          <a-radio-group v-model="contacts.registrant.gender">
            <a-radio :value="contacts.registrant.gender">{{
              $t(contacts.registrant.gender)
            }}</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-input v-model="contacts.registrant.gender" type="hidden" class="sr-only" />
      </a-col>
    </a-row>

    <a-row :gutter="8">
      <a-col :span="12"> </a-col>
    </a-row>

    <a-row :gutter="8">
      <a-col :span="12">
        <a-form-item
          field="registrant.phonenumber"
          label="Số điện thoại"
          :rules="[
            { required: true, message: 'Số điện thoại is required' },
            { minLength: 5, message: 'must be greater than 5 characters' }
          ]"
          :validate-trigger="['change', 'input']"
        >
          <a-input
            v-model="contacts.registrant.phonenumber"
            placeholder="Vui lòng nhập số điện thoại..."
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="registrant.email"
          label="Email"
          :rules="[
            {
              required: true,
              message: 'email is required'
            },
            {
              minLength: 5,
              message: 'must be greater than 5 characters'
            },
            {
              type: 'email',
              message: 'must be greater than 5 characters'
            }
          ]"
          :validate-trigger="['change', 'input']"
        >
          <a-input
            v-model="contacts.registrant.email"
            placeholder="Vui lòng nhập địa chỉ email..."
          />
        </a-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="8">
      <a-col :span="12">
        <a-form-item
          field="registrant.country"
          label="Quốc gia"
          :rules="[{ required: true, message: 'age is required' }]"
        >
          <a-select v-model="contacts.registrant.country" placeholder="Vui lòng chọn Quốc gia...">
            <a-option value="VN">Việt Nam</a-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="registrant.state"
          label="Tỉnh/Thành phố"
          :rules="[{ required: true, message: 'Vui lòng chọn Tình/Thành phố...' }]"
        >
          <a-select
            allow-search
            v-model="contacts.registrant.state"
            placeholder="Vui lòng chọn Tình/Thành phố..."
            @change="handleSelectState(contacts.registrant.state)"
          >
            <a-option v-for="state in states" :key="state.id" :value="state.name">{{
              state.name
            }}</a-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row :gutter="8">
      <a-col :span="12">
        <a-form-item
          field="registrant.city"
          label="Quận/Huyện"
          :rules="[{ required: true, message: 'Vui lòng chọn Quận/Huyện' }]"
        >
          <a-select
            allow-search
            v-model="contacts.registrant.city"
            placeholder="Vui lòng chọn Quận/Huyện..."
            @change="getWards(contacts.registrant.city)"
          >
            <a-option v-for="city in cities" :key="city.id" :value="city.name">{{
              city.name
            }}</a-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="registrant.ward"
          label="Phường/Xã"
          :rules="[{ required: true, message: 'age is required' }]"
        >
          <a-select
            allow-search
            allow-create
            v-model="contacts.registrant.ward"
            placeholder="Vui lòng chọn Xã/Phường..."
          >
            <a-option v-for="ward in wards" :key="ward.id" :value="ward.name">{{
              ward.name
            }}</a-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>

    <a-form-item
      field="registrant.address1"
      label="Address"
      :rules="[
        { required: true, message: 'address is required' },
        { minLength: 5, message: 'must be greater than 5 characters' }
      ]"
      :validate-trigger="['change', 'input']"
    >
      <a-input
        v-model="contacts.registrant.address1"
        placeholder="Vui lòng nhập địa chỉ bao gồm số nhà, tên đường, thôn xóm..."
      />
    </a-form-item>

    <a-form-item>
      <a-button type="primary" v-if="ocrOK" html-type="submit" class="w-full"
        >Xác nhận thông tin & tiếp tục</a-button
      >
    </a-form-item>
    <a-form-item>
      <p>Vui lòng kiểm tra thông tin và xác nhận để tiếp tục.</p>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { onMounted, ref } from 'vue'
// import { useCartStore } from '@/stores/cartStore';
import { useDomainRegisterStore } from '@/stores/domain/domainRegisterStore'
import { useLocationStore } from '@/stores/locationStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useEkycStore } from '@/stores/ekycStore.js'
import OcrUpload from '@/components/ekyc/OcrUpload.vue'
import FaceDetect from '@/components/ekyc/FaceDetect.vue'
import { isMobile } from 'mobile-device-detect';

import QRCodeVue3 from "qrcode-vue3";
import { watch } from 'vue'

const router = useRouter()

let faceDetectKey = 0
const step = ref(1)
const visibleFaceCheck = ref(false)
const cardFrontImage = ref(null)
const cardBackImage = ref(null)

const ekycStore = useEkycStore()
const domainRegisterStore = useDomainRegisterStore()
const locationStore = useLocationStore()
const formRef = ref(null)
const {
  FaceDetection,
  handleDataFront,
  handleDataBack,
  resetState,
  errorFaceCheck,
  handleCheckNationalId
} = ekycStore
const { ocrOK, ekyc,  ekycToken, request_id } = storeToRefs(ekycStore)

const { updateRegistrantFromUser, listDomainFree, resetDomainRegisterState } = domainRegisterStore
const { contacts, errorContact, confirmContact } = storeToRefs(domainRegisterStore)

const { states, cities, wards } = storeToRefs(locationStore)
const { getStates, getCities, getWards } = locationStore

const visibleQrCodeModel = ref(false)

defineProps(['requestEkyc'])




const CheckNationalId = async (idnumber) => {
 
  await handleCheckNationalId(idnumber, request_id.value)
  if (formRef.value) {
    formRef.value.$el.scrollIntoView({
      top: formRef.value.$el.offsetTop - 100,
      behavior: 'smooth' // Optional: for smooth scrolling
    })
  }

  if(isMobile && ekycToken.value){
    window.open('https://kyc.info.vn/ekyc.php?token='+ekycToken.value+'&mobile=true+`&request_id=${request_id}`', '_blank');
  }
  visibleQrCodeModel.value = true;
}

const handleCloseQrCode = () => {
  visibleQrCodeModel.value = false
  ekycToken.value = null
  ekyc.value = 'check'
  resetState()
}

const handleDataImage = async (image) => {
  const resp = await FaceDetection(image)
  if (!resp.success) {
    step.value = 1
    contacts.value.registrant.ekyc = true
    confirmContact.value = false
    contacts.value.registrant.type = 'ind'
  } else {
    step.value = 4
    router.push({ path: '/cart/checkout' })
  }
}

const handleSubmit = ({ values, errors }) => {
  errorContact.value = false
  if (errors) {
    errorContact.value = true
    confirmContact.value = false
  } else {
    if (!ekyc.value) {
      visibleFaceCheck.value = true
      step.value = 3
      confirmContact.value = true
      contacts.value.registrant.type = 'ind'
    } else {
      confirmContact.value = true
      contacts.value.registrant.type = 'ind'
      router.push({ path: '/cart/checkout' })
    }
  }
}

const handleSelectState = (value) => {
  cities.value = []
  wards.value = []
  contacts.value.registrant.city = ''
  contacts.value.registrant.ward = ''
  getCities(value)
}

async function scanForEkycToken() {
  if (ekycToken.value) {
    await CheckNationalId(contacts.value.registrant.nationalid, request_id.value)
    
  } else {
    visibleQrCodeModel.value = false
  }

  setTimeout(scanForEkycToken, 5000)
  
}

onMounted(() => {
  scanForEkycToken()
  resetDomainRegisterState()
  listDomainFree()
  getStates()
  updateRegistrantFromUser()
  resetState()
})
</script>
