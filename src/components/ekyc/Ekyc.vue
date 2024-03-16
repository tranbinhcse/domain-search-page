<template>
    <div v-if="errorFaceCheck">{{ errorFaceCheck }}</div>
    <div  v-if="step == 1 && !ocrOK" class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <p>Xác thực căn cước công dân (CCCD)</p>
        <p>Lưu ý khi tải lên hình ảnh CCCD của bạn:</p>
        <div class="khungcmnd">
            <div class="group_cmnd truoc">
                <div class="cmnd cmnd_1 ok">Hợp lệ</div>
                <div class="cmnd cmnd_2 er">Không bị cắt</div>
                <div class="cmnd cmnd_3 er">Không mờ</div>
                <div class="cmnd cmnd_4 er">Không bị lóa</div>
            </div>
        </div>
        <ul>
            <li>Giấy tờ còn hạn sử dụng.</li>
            <li>Hình gốc, không scan và photocopy.</li>
        </ul>
        <div>
            <p>Tải lên mặt trước/mặt sau CCCD</p>
            <div class="flex justify-between gap-4 flex-auto">

                <div class="flex-1"><OcrUpload type="cardFront"  v-model="cardFrontImage" /></div>
                <div class="flex-1"><OcrUpload type="cardBack"  v-model="cardBackImage" /></div>
            </div>
        </div>
    </div> 
    <div v-else-if="ocrOK && !userOK" class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8 bg-white dark:bg-slate-700  dark:text-slate-300  rounded-md">
        <p>Xác nhận thông tin</p>
        <p>Bạn cần kiểm tra để đảm bảo thông tin bên dưới là chính xác:</p>
        <form @submit.prevent="handleSubmitForm()" class="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 dark:sm:divide-slate-600/40 sm:border-t sm:pb-0">
            <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label for="first-name" class="block text-sm font-medium leading-6  sm:pt-1.5 text-right">Email</label>
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                <Input type="text" required name="email" id="email" v-model="userData.email" autocomplete="email" :error="error?.email"   />
                </div>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label for="first-name" class="block text-sm font-medium leading-6  sm:pt-1.5 text-right">Số điện thoại</label>
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                <Input type="text" required name="phonenumber" id="phonenumber" v-model="userData.phonenumber" autocomplete="phone" :error="error?.phonenumber"   />  
                </div>
            </div>
            
            <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label for="first-name" class="block text-sm font-medium leading-6  sm:pt-1.5 text-right">Số CCCD</label>
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                <Input type="text" required name="nationalid" readonly id="nationalid" v-model="userData.nationalid" autocomplete="nationalid"  :error="error?.nationalid"  />
                </div>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label for="first-name" class="block text-sm font-medium leading-6  sm:pt-1.5 text-right">Họ và tên</label>
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                <Input type="text" required name="name" readonly id="name" v-model="userData.name" autocomplete="name"  :error="error?.name"  />
                </div>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label for="first-name" class="block text-sm font-medium leading-6  sm:pt-1.5 text-right">Ngày sinh</label>
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                <Input type="text" required name="birthday" readonly id="birthday" v-model="userData.birthday" autocomplete="birthday"   :error="error?.birthday" />
                </div>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label for="first-name" class="block text-sm font-medium leading-6  sm:pt-1.5 text-right">Giới tính</label>
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                    <input type="radio" required name="gender" readonly id="genderFemale" v-model="userData.gender" value="Nữ" autocomplete="gender"> Nữ
                    <input type="radio" required name="gender" readonly id="genderMale" v-model="userData.gender" value="Nam" autocomplete="gender"> Nam 
                </div>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 hidden">
                <label for="first-name" class="block text-sm font-medium leading-6  sm:pt-1.5 text-right">Quê quán</label>
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                <Input type="text" required name="hometown" readonly id="hometown" v-model="userData.hometown" autocomplete="hometown"   />
                </div>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label for="first-name" class="block text-sm font-medium leading-6  sm:pt-1.5 text-right">Nơi thường trú</label>
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                <Input type="text" required name="address1" readonly id="address1" v-model="userData.address1" autocomplete="address"  :error="error?.address1"  />
                </div>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 hidden">
                <label for="first-name" class="block text-sm font-medium leading-6  sm:pt-1.5 text-right">Ngày cấp</label>
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                <Input type="text" required name="issue_date" readonly id="issue_date" v-model="userData.issue_date" autocomplete="issue_date"   />
                </div>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                <label for="first-name" class="block text-sm font-medium leading-6  sm:pt-1.5 text-right">Ngày hết hạn</label>
                <div class="mt-2 sm:col-span-2 sm:mt-0">
                <Input type="text" required name="expiry" readonly id="expiry" v-model="userData.expiry" autocomplete="expiry"   />
                </div>
            </div>

            <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
            <label for="first-name" class="block text-sm font-medium leading-6  sm:pt-1.5 text-right">
                Mã phường/Mã quận/Mã thành phố</label>
            <div class="mt-2 sm:col-span-2 sm:mt-0">
              <div class="flex gap-5">
                <Input type="text" name="ward" readonly id="ward" v-model="userData.ward" autocomplete="ward"  :error="error?.ward"  />
                <Input type="text" name="city" readonly id="city" v-model="userData.city" autocomplete="city" :error="error?.city"   />
                <Input type="text" name="state" readonly id="state" v-model="userData.state" autocomplete="state" :error="error?.state"   />

              </div>
            </div>
            <div>
                <Button class="mt-4" type="submit" >Tiếp tục</Button>
            </div> 
          </div>
        </form>
    </div>
  
    <div v-else-if="userOK" class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8 bg-white dark:bg-slate-700  dark:text-slate-300  rounded-md">
        <FaceDetect  :key="faceDetectKey" @DataImage="handleDataImage" :faceOK="faceOK" />
    </div>
    <div v-if="step == 4">hoàn thành</div>
 
</template>

<script setup>
import { ref, watch } from 'vue';
import { debounce } from 'lodash'; // Import debounce từ lodash

import { storeToRefs } from 'pinia'
import { useEkycStore } from "@/stores/ekycStore.js";
import { useAuthStore } from "@/stores/auth/authStore.js";
import { useUserStore } from "@/stores/auth/userStore.js";
import Input from '@/components/base/Input.vue';

import OcrUpload from '@/components/ekyc/OcrUpload.vue';
import FaceDetect from '@/components/ekyc/FaceDetect.vue';
let faceDetectKey = 0;
const step = ref(1)
const cardFrontImage = ref(null);
const cardBackImage = ref(null);


const authStore = useAuthStore()
const userStore = useUserStore()
const ekycStore = useEkycStore()
 
const { signup, checkemail } = authStore
const { FaceDetection } = ekycStore
const { details } = userStore
const {  ocrOK , userData, userOK, faceOK, errorFaceCheck } = storeToRefs(ekycStore)
const { error } = storeToRefs(authStore)

const handleSubmitForm = async() => {
   const resp = await details()
   console.log(resp);
   if(resp){
    userOK.value = true
    step.value = 2
   } else {
    const userdata = await signup(userData.value)
    if(userdata){
        userOK.value = true
        step.value = 2
    }
   }
    console.log(userOK);
}

const debouncedCheckEmail = debounce(checkemail, 1000); // Đợi 500ms trước khi gọi hàm checkemail

// Sử dụng watcher để kiểm tra email mỗi khi thay đổi
watch(() => userData.value.email, (newMail) => {
    debouncedCheckEmail(newMail);
});

const handleDataImage = async(image) => {
    const resp = await FaceDetection(image)
    if ( !resp.success) { 
        step.value = 1
        ocrOK.value = false
        userOK.value = false
    } else {
        step.value = 4
        ocrOK.value = false
        userOK.value = false
    }
}

 
</script>

 