import { defineStore, storeToRefs } from 'pinia'
import { useUserStore } from "@/stores/auth/userStore.js";
import { useAuthStore } from "@/stores/auth/authStore.js";
import CartRepository from '@/repositories/CartRepository';
import { useCartStore  } from '@/stores/cartStore';
export const useDomainRegisterStore = defineStore({
  id: 'domainRegisterStore',
  state: () => ({
    loading: false,
    freeVN: [],
    domainFree: [],
    isPromocode: false,
    confirmContact: false,
    contacts: {
      registrant: {
          type: 'ind',
          companyname: '',
          taxid: '',
          firstname: '',
          lastname: '',
          nationalid: '',
          phonenumber: '',
          gender: 'Male',
          email: '',
          country: 'VN',
          state: '',
          city: '',
          ward: '',
          address1: '',
          birthday: '',
          ekyc: false
      },
    },
    errorContact: false,
    errorPromo: false
  }),
  actions: {
    
    saveContacts(data) {
      this.contacts = data 
    },

    updateRegistrantFromUser() {
      const authStore = useAuthStore();
      const { user } = storeToRefs(authStore);
      
    
    

      this.contacts.registrant = { ...user.value }; // Assuming user structure matches registrant

    },
    async getFreePromoVN(options) {
      const res = await CartRepository.getFreePromocode(options);
      this.freeVN = res
      this.isPromocode = false
      const cartStore = useCartStore();
      const { saveToLocalStorage } = cartStore;
      const { cartItems } = storeToRefs(cartStore);
      const index = cartItems.value.findIndex(item => item.name === options.domain);

      if(res.status){
        if (index !== -1) {
          if (!cartItems.value[index].data) {
            cartItems.value[index].data = {}; // Tạo một đối tượng data mới nếu không tồn tại
          } 
          this.isPromocode = true 
        }

      } else {
        this.isPromocode = false 
       
      }
      this.errorPromo = res.error

    },
    listDomainFree(){
      const cartStore = useCartStore();
      const { cartItems } = storeToRefs(cartStore);
      console.log(cartItems.value);
      const domainItemsWithIdVnTLD = cartItems.value.filter(item => item.type === "domain" && item.tld === ".id.vn");
      this.domainFree = domainItemsWithIdVnTLD;
    },
    resetDomainRegisterState() {
      this.freeVN = [];
      this.domainFree = []
    }
    
  },
  persist: {
    paths: [ 'contacts', 'freeVN', 'confirmContact']
  },
  
})