import { defineStore, storeToRefs } from 'pinia'
import EkycRepository from '@/repositories/EkycRepository' 
import { splitFullName, checkAge } from '@/utility/utility' 
import { useDomainRegisterStore } from "@/stores/domain/domainRegisterStore";

export const useEkycStore = defineStore( {
  id: 'ekycStore',
  state: () => ({
    request_id: `TNG-${Math.floor(new Date().getTime() / 1000)}`,
    loading: false,
    ocrData: {
      cardFront: {},
      cardBack: {}
    },
    ocrOK: false,
    userOK: false,
    faceOK: false,
    errorFaceCheck: false,
    isFree: false,
    ekyc: 'check'
  }),
  actions: {
    resetState() {
     
      this.request_id = `TNG-${Math.floor(new Date().getTime() / 1000)}`;
      this.loading = false;
      this.ocrData = {
        cardFront: {},
        cardBack: {}
      };
      this.ocrOK = false;
      this.userOK = false;
      this.faceOK = false;
      this.errorFaceCheck = false;
      this.isFree = false;
    },
    handleDataFront(data) {
      this.isFree = false;
      const domainRegisterStore = useDomainRegisterStore();
      const { contacts } = storeToRefs(domainRegisterStore);
      const name = splitFullName(data.name);
      contacts.value.registrant.firstname = name.firstname;
      contacts.value.registrant.lastname = name.lastname;
      contacts.value.registrant.nationalid = data.id;
      contacts.value.registrant.birthday = data.birthday;
      contacts.value.registrant.gender = data.sex == 'Nam' ? 'Male' : 'Female';

      //clear company info
      contacts.value.registrant.companyname = '';
      contacts.value.registrant.company = false;
      contacts.value.registrant.taxid = '';

      this.ocrOK = false;

      if(checkAge('01-01-2004')){
        this.isFree = true;
      }

    },
    async recognition(type, image) {
      this.loading = true;
      const data = await EkycRepository.recognition(this.request_id, type, image);
      if (type === 'cardFront') {
        this.ocrData.cardFront = data;
      } else if (type === 'cardBack') {
        this.ocrData.cardBack = data;
      }
      this.loading = false;
    },
    async FaceDetection(image_live) {
      this.loading = true;
      const data = await EkycRepository.verification(this.request_id, image_live);
      if (data.success) {
        this.faceOK = true;
      } else {
        this.errorFaceCheck = data.error;
      }
      this.loading = false;
      return data;
    },
    async handleCheckNationalId(idnumber) {
      const data = await EkycRepository.checkNationalId(idnumber);
      const domainRegisterStore = useDomainRegisterStore();
      const { contacts } = storeToRefs(domainRegisterStore);
      if(data.success)  {
        const name = splitFullName(data.name);
        contacts.value.registrant.firstname = name.firstname;
        contacts.value.registrant.lastname = name.lastname;
        contacts.value.registrant.nationalid = data.idnumber;
        contacts.value.registrant.birthday = data.birthday;
        contacts.value.registrant.gender =  'Male';
        contacts.value.registrant.ekyc =  true;

        //clear company info
        contacts.value.registrant.companyname = '';
        contacts.value.registrant.company = false;
        contacts.value.registrant.taxid = '';
        this.ocrOK = true
        this.ekyc = true
        if(checkAge('01-01-2004')){
          this.isFree = true;
        }
      } else {
        this.ocrOK = false
        contacts.value.registrant.ekyc =  false;
        this.ekyc = false
      }

    }
  },
  persist: {
    paths: ['request_id', 'loading', 'ocrData', 'ocrOK', 'userOK', 'faceOK', 'errorFaceCheck', 'user', 'userData'],
  }
});
