<template>
     
    <a-form ref="formRef" :model="forms" layout="vertical" @submit="handleSubmit">
      <a-form-item field="registrant.type" label="Loại chủ thể"  :rules="[{required:true,message:'type is required'}]">
        <a-radio-group v-model="forms.registrant.type" type="button">
          <a-radio value="ind">Cá nhân</a-radio>
          <a-radio value="org">Tổ chức</a-radio>
        </a-radio-group>
      </a-form-item>
      <h3  v-if="forms.registrant.type === 'org'">Thông tin tổ chức</h3>
      <a-form-item v-if="forms.registrant.type === 'org'" field="registrant.companyname" label="Tên tổ chức "
                   :rules="[{required:true,message:'name is required'},{minLength:5,message:'must be greater than 5 characters'}]"
                   :validate-trigger="['change','input']"
      >
        <a-input v-model="forms.registrant.companyname" placeholder="please enter your username..." />
      </a-form-item>
      <a-form-item  v-if="forms.registrant.type === 'org'" field="registrant.taxid" label="Mã số thuế "
                   :rules="[{required:true,message:'taxid is required'},{minLength:5,message:'must be greater than 5 characters'}]"
                   :validate-trigger="['change','input']"
      >
        <a-input v-model="forms.registrant.taxid" placeholder="please enter your taxid..." />
      </a-form-item>

      <h3  v-if="forms.registrant.type === 'org'">Thông tin người đại diện</h3>

      
      <a-form-item label="Họ và tên" :content-flex="false" :merge-props="false">
        <a-row :gutter="8">
            <a-col :span="12">
            <a-form-item field="registrant.lastname" validate-trigger="input"
                        :rules="[{required:true,message:'firstname is required'}]" no-style>
                <a-input v-model="forms.registrant.lastname" placeholder="Vui lòng nhập họ và tên lót..." />
            </a-form-item>
            </a-col>
            <a-col :span="12">
            <a-form-item field="registrant.firstname" validate-trigger="input"
                        :rules="[{required:true,message:'lastname is required'}]" no-style>
                <a-input v-model="forms.registrant.firstname" placeholder="Vui lòng nhập tên..." />
            </a-form-item>
            </a-col>
        </a-row>
        </a-form-item>

        <a-row :gutter="8">
            <a-col :span="12">
                <a-form-item field="registrant.nationalid" label="Số căn cước "
                   :rules="[
                    {required:true,message:'nationalid is required'},
                    {minLength:12,message:'must be greater than 12 characters'},
                    {maxLength:15,message:'must be greater than 15 characters'},
                    {type:'number',message:'Please enter number'}
                    ]"
                   :validate-trigger="['change','input']"
                >
                    <a-input v-model="forms.registrant.nationalid" placeholder="Vui lòng nhập số cần cước..." />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item field="registrant.gender" label="Giới tính" :rules="[{required:true,message:'age is required'}]">
                <a-radio-group v-model="forms.registrant.gender">
                <a-radio value="Male">Nam</a-radio>
                <a-radio value="Female">Nữ</a-radio>
                </a-radio-group>
            </a-form-item>
            </a-col>
        </a-row>


        <a-row :gutter="8">
            <a-col :span="12">
                    <a-form-item field="registrant.birthday" label="Ngày sinh"
                                :rules="[{required:true,message:'age is required'}]"
                    >
                        <a-date-picker v-model="forms.registrant.birthday" locale="vi" format="DD/MM/YYYY" placeholder="Vui lòng chọn ngày sinh..." />
                    </a-form-item>
            </a-col>
            <a-col :span="12">
                  
            </a-col>
        </a-row>
        
        
        <a-row :gutter="8">
            <a-col :span="12">
                    <a-form-item field="registrant.phonenumber" label="Số điện thoại"
                                :rules="[{required:true,message:'Số điện thoại is required'},{minLength:5,message:'must be greater than 5 characters'}]"
                                :validate-trigger="['change','input']"
                    >
                        <a-input v-model="forms.registrant.phonenumber" placeholder="Vui lòng nhập số điện thoại..." />
                    </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item field="registrant.email" label="Email"
                   :rules="[
                        {
                            required:true,
                            message:'email is required'
                        },
                        {
                            minLength:5,
                            message:'must be greater than 5 characters'
                        },
                        {
                            type:'email',
                            message:'must be greater than 5 characters'
                        }
                    ]"
                   :validate-trigger="['change','input']"
      >
        <a-input v-model="forms.registrant.email" placeholder="Vui lòng nhập địa chỉ email..." />
      </a-form-item>
            </a-col>
        </a-row>
       
       

        <a-row :gutter="8">
            <a-col :span="12">
                <a-form-item field="registrant.country" label="Quốc gia" :rules="[{required:true,message:'age is required'}]">
                    <a-select v-model="forms.registrant.country" placeholder="Vui lòng chọn Quốc gia...">
                        <a-option value="VN">Việt Nam</a-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="12">
                   
                <a-form-item field="registrant.state" label="Tỉnh/Thành phố" :rules="[{required:true,message:'Vui lòng chọn Tình/Thành phố...'}]">
                    <a-select allow-search v-model="forms.registrant.state" placeholder="Vui lòng chọn Tình/Thành phố..." @change="handleSelectState(forms.registrant.state)">
                        <a-option v-for="state in states" :key="state.id" :value="state.name">{{ state.name }}</a-option>
                    </a-select>
                </a-form-item>
            </a-col>
        </a-row>
 
        <a-row :gutter="8">
            <a-col :span="12">
                <a-form-item field="registrant.city" label="Quận/Huyện" :rules="[{required:true,message:'Vui lòng chọn Quận/Huyện'}]">
                    <a-select allow-search v-model="forms.registrant.city" placeholder="Vui lòng chọn Quận/Huyện..."  @change="getWards(forms.registrant.city)" >
                        <a-option v-for="city in cities" :key="city.id" :value="city.name">{{ city.name }}</a-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item field="registrant.ward" label="Phường/Xã" :rules="[{required:true,message:'age is required'}]">
                    <a-select allow-search allow-create v-model="forms.registrant.ward" placeholder="Vui lòng chọn Xã/Phường...">
                        <a-option v-for="ward in wards" :key="ward.id" :value="ward.name">{{ ward.name }}</a-option>
                    </a-select>
                </a-form-item>
            </a-col>
        </a-row>


        
      <a-form-item field="registrant.address1" label="Address"
                   :rules="[{required:true,message:'address is required'},{minLength:5,message:'must be greater than 5 characters'}]"
                   :validate-trigger="['change','input']"
      >
        <a-input v-model="forms.registrant.address1" placeholder="Vui lòng nhập địa chỉ bao gồm số nhà, tên đường, thôn xóm..." />
      </a-form-item>

 
     
    

     
      <a-form-item>
        
          <a-button type="primary" html-type="submit" class="w-full">Xác nhận thông tin & tiếp tục</a-button>
      </a-form-item>
    </a-form>
    
  </template>
  
  <script setup>
  import { reactive, watch, onMounted } from 'vue';
  import { useCartStore } from '@/stores/cartStore';
  import { useDomainRegisterStore } from '@/stores/domain/domainRegisterStore';
  import { useLocationStore } from "@/stores/locationStore";
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router';
  
  const router = useRouter()
  const domainRegisterStore = useDomainRegisterStore()
  const { saveContacts } = domainRegisterStore
  const { contacts, errorContact } = storeToRefs(domainRegisterStore)

  const locationStore = useLocationStore()
  const { states, cities, wards } = storeToRefs(locationStore)
    const { getStates, getCities, getWards } = locationStore

    defineProps([
        'requestEkyc'
    ]);

  const handleSubmit = ({ values, errors }) => {
    errorContact.value = false;
      if (errors){
        errorContact.value = true
      } else {
        saveContacts({ registrant: values.registrant });
        router.push({ name: 'checkout' });
      }
    };

    const handleSelectState = (value) => {
        cities.value = [];
        wards.value = [];
        forms.registrant.city = '';
        forms.registrant.ward = '';
        getCities(value);
    }
    
    const forms = reactive({
        registrant: {
            type: 'ind',
            companyname: '',
            taxid: '',
            firstname: '',
            lastname: '',
            nationalid: '',
            phonenumber: '',
            email: '',
            country: 'VN',
            state: '',
            city: '',
            ward: '',
            address1: '',
            birthday: ''
        },
    });
     
      const syncFormWithContacts = () => {
             
            if (contacts.value) {
                forms.registrant = { ...contacts.value.registrant };
            }
        };

        watch(() => forms.registrant, (newValue) => {
            saveContacts({ registrant: newValue });
        });

    onMounted(() => {
        syncFormWithContacts()
        getStates()
    });  
   
  </script>
  