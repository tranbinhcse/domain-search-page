<template>
    <div class="max-w-7xl mx-auto mt-5">
        <div class="grid grid-cols-2 pb-4 gap-4" :column="2" v-if="service.status == 'Active'">
            <div class="main-service bg-white flex-1 p-6">
                
                <h3 class="text-xl font-bold">Thông tin website</h3>
                <a-divider></a-divider>
                <p>Tên miền: {{service.domain}}</p>
                <p>Trạng thái: {{service.status}} </p>
                <p>Ngày tạo: {{service.date_created}} </p> 
                <p class="mb-5"></p>
                <a-button type="primary" @click="handleOpenWebsite()">Truy cập website</a-button>
            </div>
            <div class="sidebar-service bg-white max-w-2xl flex-1 p-6">
                <h3 class="text-xl font-bold mb-4">Danh sách tài khoản</h3>
                <a-table :loading="loadingUser" :columns="columns" :data="users" size="large" :pagination="false">
                    <template #actions="{ record, rowIndex }">
                        <a-button :loading="loadingLogin" type="outline" size="small" @click="handleLoginWP(id, record.user_email)">
                            <template #icon>
                                <icon-user />
                            </template>
                            Login</a-button>
                    </template>
                </a-table>
            </div>
            <div class="sidebar-service bg-white max-w-2xl flex-1 p-6">
                <h3 class="text-xl font-bold mb-4">Danh sách Plugins</h3>
                <a-table :loading="loadingPlugin" :columns="PluginColumns" :data="plugins" size="large" :pagination="false"></a-table>
            </div>
            <div class="sidebar-service bg-white max-w-2xl flex-1 p-6">
                <h3 class="text-xl font-bold mb-4">Danh sách Themes</h3>
                <a-table :loading="loadingTheme" :columns="ThemeColumns" :data="themes" size="large" :pagination="false"></a-table>
            </div>
        </div>
        <div class="grid grid-cols-2 pb-4 gap-4" :column="2" v-if="service.status != 'Active'">
            <div class="main-service bg-white flex-1 p-6">
                <h3 class="text-xl font-bold">Thông tin website</h3>
                <a-divider></a-divider>
                <p>Tên miền: {{service.domain}}</p>
                <p>Trạng thái: {{service.status}} </p>
                <p>Ngày tạo: {{service.date_created}} </p>
                <p class="text-center pt-10">
                    <a-spin dot />
                    <p> Website của bạn đang được khởi tạo, vui lòng đợi, nếu đợi quá lâu hãy liên hệ với hỗ trợ qua kênh chat bên dưới</p>
                </p>
            </div>
            <div class="sidebar-service bg-white max-w-2xl flex-1 p-6" v-if="service.unpaid_invoice">
                <h3 class="text-xl font-bold mb-4">Hoá đơn</h3>
                
                Bạn có hoá đơn  {{service.unpaid_invoice.proforma_id}}  chưa thanh toán
                <a-button size="small" @click="router.push({name: 'invoiceDetails', params: { id: service.unpaid_invoice.id }})">Thanh toán</a-button>
            </div>
        </div>
    </div>
</template>



<script setup>

import { onMounted, ref } from 'vue'


import { useServiceDetailStore } from '@/stores/service/serviceDetailStore'
import { useWebsiteDetailStore } from '@/stores/website/websiteDetailStore'
import { useRoute,useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
const serviceDetailStore = useServiceDetailStore()
const websiteDetailStore = useWebsiteDetailStore()
const { getUsers, getUrlLogin, getWPPlugins, getWPThemes } = websiteDetailStore
const { getService } = serviceDetailStore
const { service } = storeToRefs(serviceDetailStore)
const { loading, users, plugins, themes, loadingTheme, loadingPlugin, loadingUser, loadingLogin } = storeToRefs(websiteDetailStore)

const route = useRoute()
const router = useRouter()
const id = ref(route.params.id);
const currentModule = ref(null)

onMounted(async () => {
    await getService(route.params.id) ;
    // Dynamic import based on moduleName
     getUsers(route.params.id);
     getWPPlugins(route.params.id);
     getWPThemes(route.params.id);

     setInterval(refreshService, 10000);
})


const refreshService = async () => {
      // Check if service.status is 'pending', then refresh
      console.log('ok');
    if (service.value.status === 'Pending') {
        await getService(route.params.id);
    }
};



const handleOpenWebsite = () => {
    const url = 'https://' + service.value.domain
    window.open(url, '_blank');
}
const handleLoginWP = async (id, user_email) => {
    const url = await getUrlLogin(id, {email: user_email})
    window.open(url, '_blank');
}

const columns = [
      {
        title: 'Name',
        dataIndex: 'display_name',
        slotName: 'display_name'
      },
       
      {
        title: 'Email',
        dataIndex: 'user_email',
        slotName: 'user_email',
      },
      {
        title: 'Roles',
        dataIndex: 'roles',
        slotName: 'roles',
      },
      {
        title: 'Tuỳ chọn',
        dataIndex: 'actions',
        slotName: 'actions',
      }
    ];

const PluginColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        slotName: 'name'
      },
       
      {
        title: 'status',
        dataIndex: 'status',
        slotName: 'status',
      },
      {
        title: 'version',
        dataIndex: 'version',
        slotName: 'version',
      },
      {
        title: 'Tuỳ chọn',
        dataIndex: 'actions',
        slotName: 'actions',
      }
    ];
const ThemeColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
        slotName: 'name'
      },
       
      {
        title: 'status',
        dataIndex: 'status',
        slotName: 'status',
      },
      {
        title: 'version',
        dataIndex: 'version',
        slotName: 'version',
      },
      {
        title: 'Tuỳ chọn',
        dataIndex: 'actions',
        slotName: 'actions',
      }
    ];

</script>

<style scoped></style>

