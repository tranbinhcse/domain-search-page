import { defineStore } from 'pinia'
import { get, post } from '@/core/apiClient'
import { reactive, ref, watch, onMounted } from 'vue'
import EkycRepository from '@/repositories/EkycRepository'

import provinceCodeToObject from '@/utility/provincecode'

import { useUserStore } from "@/stores/auth/userStore";

export const useEkycStore = defineStore('ekycStore', () => {

    const now = new Date();
    const timestampInSeconds = Math.floor(now.getTime());
    const request_id = ref(`TNG-${timestampInSeconds}`)
    const loading = ref(false)
    const ocrData = ref({
        'cardFront': {},
        'cardBack': {},
    })
    const ocrOK = ref(false)
    const userOK = ref(false)
    const faceOK = ref(false)
    const errorFaceCheck = ref(false)

 
  
    const user = ref({
      'phonenumber': '',
      'email': '',
    })
    const authStore = JSON.parse(localStorage.getItem('authStore'));
    if (authStore) {
      user.value = authStore.user 
    }  
 

    const userData = ref({
      'phonenumber': user.value?.phonenumber,
      'email': user.value?.email,
      'nationalid': '',
      'name': '',
      'birthday': '',
      'gender': '',
      'hometown': '',
      'address1': '',
      'state': '',
      'ward': '',
      'city': '',
      'country': 'VN',
      'issue_date': '',
      'expiry': '',
  });

 
 
  
  async function recognition(type, image){
    loading.value = true
    const data = await EkycRepository.recognition(request_id.value, type, image);
    if (type === 'cardFront') {
        ocrData.value.cardFront = data;
    } else if (type === 'cardBack') {
        ocrData.value.cardBack = data;
    }
    loading.value = false
 
  }
  async function FaceDetection(image_live){
     
    loading.value = true
    const data = await EkycRepository.verification(request_id.value, image_live);
    if(data.success) {
      faceOK.value = true
    } else {
      errorFaceCheck.value = data.error
    }
    loading.value = false 
    return data;
  }

    // Update userData whenever ocrData changes
    watch(ocrData, () => {
      // Tách tên thành firstname và lastname
      const nameParts = ocrData.value.cardFront?.name?.split(" ") || [];
      const lastname = nameParts[0] || ''; // Lấy phần tử đầu tiên là firstname
      const firstname = nameParts.slice(1).join(" ") || ''; // Gộp các phần tử còn lại thành lastname
      userData.value = {
          'phonenumber': user.value.phonenumber || '',
          'email': user.value.email || '',
          'nationalid': ocrData.value.cardFront?.id || '',
          'firstname': firstname || '',
          'lastname': lastname || '',
          'name': ocrData.value.cardFront?.name || '',
          'birthday': ocrData.value.cardFront?.birthday || '',
          'gender': ocrData.value.cardFront?.sex || '',
          'hometown': ocrData.value.cardFront?.hometown || '',
          'address1': ocrData.value.cardFront?.address || '',
          'ward': ocrData.value.cardFront?.precinct || '',
          'city': ocrData.value.cardFront?.district || '',
          'state': provinceCodeToObject[ocrData.value.cardFront?.province?.substring(1)] || 'Thành phố Hà Nội', // Loại bỏ chữ cái đầu tiên
          'country': 'VN',
          'issue_date': ocrData.value.cardBack?.issue_date || '',
          'expiry': ocrData.value.cardFront?.expiry || '',
      };
  }, { deep: true });

  return {  loading, recognition, ocrData , ocrOK, userData, userOK, FaceDetection, faceOK, errorFaceCheck }
})