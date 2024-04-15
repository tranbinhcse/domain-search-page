<template>
    <main class="bg-white dark:bg-slate-900 max-w-2xl mx-auto my-10 p-4">
      
      <div class="relative flex"> 
    
      <a-form ref="formRef" :model="user" :rules="rules"  layout="vertical" class="mt-5" @submit="handleSubmit" :scrollToFirstError="true">
   
       <a-form-item field="type" label="Loại tài khoản"   :validate-trigger="['change','input']" >
           <a-radio-group v-model="user.type" type="button">
             <a-radio value="ind">Cá nhân</a-radio>
             <a-radio value="org">Tổ chức</a-radio>
           </a-radio-group>
         </a-form-item>
    
         <a-form-item v-if="user.type === 'org'" field="companyname" label="Tên tổ chức "  :validate-trigger="['change','input']" >    
           <a-input v-model="user.companyname" placeholder="Vui lòng nhập tên đầy đủ..." />
         </a-form-item>
         <a-form-item  v-if="user.type === 'org'" field="taxid" label="Mã số thuế "  :validate-trigger="['change','input']" >
           <a-input v-model="user.taxid" placeholder="Vui lòng nhập mã số thuế..." />
         </a-form-item>
   
         <h3  v-if="user.type === 'org'">Thông tin người đại diện</h3>
         
          <a-row :gutter="8">
              <a-col :span="12">
              <a-form-item field="lastname" label="Họ và tên lót"    :validate-trigger="['change','input']">
                  <a-input  v-model="user.lastname" placeholder="Vui lòng nhập họ và tên lót..." />
              </a-form-item>
              </a-col>
              <a-col :span="12">
              <a-form-item field="firstname"  label="Tên"    :validate-trigger="['change','input']">
                  <a-input  v-model="user.firstname" placeholder="Vui lòng nhập tên..." />
              </a-form-item>
              </a-col>
          </a-row>
        
   
          <a-row :gutter="8">
              <a-col :span="10">
                  <a-form-item field="nationalid" label="Số căn cước "   :validate-trigger="['change','input']" >
                      <a-input  v-model="user.nationalid" placeholder="Vui lòng nhập số cần cước..." />
                  </a-form-item>
              </a-col>
              
              <a-col :span="10">
                
                      <a-form-item field="birthday" label="Ngày sinh"  :validate-trigger="['change','input']" >
                          <a-date-picker format="DD/MM/YYYY"  v-model="user.birthday" value-format="DD/MM/YYYY" locale="vi" placeholder="Vui lòng chọn ngày sinh..." />
                      </a-form-item>
              </a-col>
              <a-col :span="4">
                  <a-form-item field="gender" label="Giới tính"  :validate-trigger="['change','input']" >
                      <a-radio-group v-model="user.gender">
                          <a-radio value="Male">{{ $t('Male') }}</a-radio>
                          <a-radio value="Female">{{ $t('Female') }}</a-radio>
                      </a-radio-group>
                  </a-form-item> 
              </a-col>
          </a-row>
   
   
          <a-row :gutter="8">
              
              <a-col :span="12">
                    
              </a-col>
          </a-row>
          
          
          <a-row :gutter="8">
              <a-col :span="12">
                      <a-form-item field="phonenumber" label="Số điện thoại"  :validate-trigger="['change','input']" >
                          <a-input v-model="user.phonenumber" placeholder="Vui lòng nhập số điện thoại..." />
                      </a-form-item>
              </a-col>
              <a-col :span="12">
                  <a-form-item field="email" label="Email" :validate-trigger="['change','input']"  >
          <a-input v-model="user.email" placeholder="Vui lòng nhập địa chỉ email..." />
        </a-form-item>
       
              </a-col>
          </a-row>
         
         
   
          <a-row :gutter="8">
              <a-col :span="12">
                  <a-form-item field="country" label="Quốc gia"  :validate-trigger="['change','input']" >
                      <a-select v-model="user.country" placeholder="Vui lòng chọn Quốc gia...">
                          <a-option value="VN">Việt Nam</a-option>
                      </a-select>
                  </a-form-item>
              </a-col>
              <a-col :span="12">
                     
                  <a-form-item field="state" label="Tỉnh/Thành phố"  :validate-trigger="['change','input']" >
                      <a-select allow-search v-model="user.state" placeholder="Vui lòng chọn Tình/Thành phố..." @change="handleSelectState(user.state)">
                          <a-option v-for="state in states" :key="state.id" :value="state.name">{{ state.name }}</a-option>
                      </a-select>
                  </a-form-item>
              </a-col>
          </a-row>
   
          <a-row :gutter="8">
              <a-col :span="12">
                  <a-form-item field="city" label="Quận/Huyện"  :validate-trigger="['change','input']" >
                      <a-select allow-search v-model="user.city" placeholder="Vui lòng chọn Quận/Huyện..."  @change="getWards(user.city)" >
                          <a-option v-for="city in cities" :key="city.id" :value="city.name">{{ city.name }}</a-option>
                      </a-select>
                  </a-form-item>
              </a-col>
              <a-col :span="12">
                  <a-form-item field="ward" label="Phường/Xã"  :validate-trigger="['change','input']" >
                      <a-select allow-search allow-create v-model="user.ward" placeholder="Vui lòng chọn Xã/Phường...">
                          <a-option v-for="ward in wards" :key="ward.id" :value="ward.name">{{ ward.name }}</a-option>
                      </a-select>
                  </a-form-item>
              </a-col>
          </a-row>
   
   
          
        <a-form-item field="address1" label="Address" :validate-trigger="['change','input']" >
          <a-input v-model="user.address1" placeholder="Vui lòng nhập địa chỉ bao gồm số nhà, tên đường, thôn xóm..." />
        </a-form-item>
        
        <a-form-item class="text-center">
            <a-button type="primary" html-type="submit"  >Lưu</a-button>
           
        </a-form-item>
        <a-alert v-if="info">{{ info }}</a-alert>
       
      </a-form>
  </div>
  </main>
    </template>
    
    <script setup>
      import { reactive, watch, onMounted, ref } from 'vue';
      import { useUserStore } from '@/stores/auth/userStore';
      import { useLocationStore } from "@/stores/locationStore";
      import { storeToRefs } from 'pinia'
      import { useRouter } from 'vue-router'; 
    
  
  
      const userStore = useUserStore()
      const { updateUser, details } = userStore
      const { loading, error, user, info} = storeToRefs(userStore)
      const router = useRouter()
  
  
     
      const locationStore = useLocationStore()
      const formRef = ref(null) 
      const { states, cities, wards } = storeToRefs(locationStore)
      const { getStates, getCities, getWards } = locationStore
    
      
  
   
      const rules = reactive({
          firstname: [
              { required: true, message:'Tên yêu cầu nhập' },
          ],
          lastname: [
              { required: true, message:'Họ và tên lót yêu cầu nhập' },
          ], 
          phonenumber: [
              { required: true, message:'Số điện thoại cần phải nhập' },
          ],
          nationalid: [
              { required: true, message:'Số CCCD cần phải nhập đầy đủ' },
          ],
          email: [
              { required: true, message:'Vui lòng nhập email' },
              { type: 'email', message:'Vui lòng nhập đúng địa chỉ email' },
          ],
          companyname: [
              { required: true, message:'Tên công ty đầy đủ' },
          ],
          taxid: [
              { required: true, message:'Mã số thuế cần phải nhập' },
          ],
          address1: [
              { required: true, message:'Địa chỉ cần phải chính xác' },
          ],
          country: [
              { required: true, message:'Địa chỉ cần phải chính xác' },
          ],
          city: [
              { required: true, message:'Địa chỉ cần phải chính xác' },
          ],
          state: [
              { required: true, message:'Địa chỉ cần phải chính xác' },
          ],
          ward: [
              { required: true, message:'Địa chỉ cần phải chính xác' },
          ],
          password: [
              { required: true, message:'Vui lòng nhập mật khẩu' },
          ],
          password2: [
              { required: true, message:'Vui lòng nhập lại mật khẩu' },
          ],
      })
      
   
    const handleSubmit = async({ values, errors }) => {
      
        if (errors){
          console.log(errors);
        } else {
          await updateUser(user.value)
          for (const key in error.value) {
              formRef.value.setFields({
                  [key]: {
                  status: 'error',
                  message: error.value[key]
                  }
              });
          }
  
          
        }
      
      };
   
      const handleSelectState = (value) => {
          cities.value = [];
          wards.value = [];
          user.city = '';
          user.ward = '';
          getCities(value);
      }
      onMounted(async() => {
        await details();
          await getStates();
          cities.value = [];
          wards.value = [];
          await getCities(user.value.state);
          await getWards(user.value.city);
      });     
  
  
   
   
  
    </script>
    