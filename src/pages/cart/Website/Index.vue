<template>
    <div class="h-full">
      
       
{{domain}}

      <div class="max-w-7xl m-auto mt-5" id="searchResults" ref="searchResultsRef">

        <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <li v-for="theme in themes" :key="theme.id" class="col-span-1 flex flex-col rounded-lg bg-white text-center shadow">
            <div class="theme-view" :style="`background-image: url(${theme.imageUrl})`">

                <h3 class="mt-6 text-sm font-medium text-gray-900">{{ theme.name }}</h3>
                <dl class="mt-1 flex flex-grow flex-col justify-between">
                  <dt class="sr-only">Title</dt>
                </dl>
            </div>
            <div class="p-2 ">
                <div class="-mt-px flex justify-between ">
                <div class="">
                   <a-button type="link"  size="small">Xem thực tế</a-button>
                </div>
                <div class="flex-auto">
                  <a-button type="outline" size="small" class="w-full" @click="handleChoiesDomain(theme)">
                    <template #icon><icon-plus /></template>
                    Tạo Web
                  </a-button>
                </div>
                </div>
            </div>
            </li>
        </ul>
        
      </div>
  
      <div> 
      </div>

      <a-modal v-model:visible="visible" @ok="handleCreateWebsite" @cancel="handleCancel" @before-ok="handleBeforeOk" hide-cancel ok-text="Kiểm tra">
        <template #title>
          Tạo website với mẫu theme {{themeSelected.title}}
        </template>
        <div class="w-full">
          <a-tabs @tab-click="handleTabClick" :active-key="themeSelected.type">
            <a-tab-pane key="subdomain">
              <template #title>
                <icon-calendar/> Tên miền tạm
              </template>
              <div>
                  <a-input v-model="themeSelected.id" name="theme" readonly type="hidden" /> 
                  <a-input v-model="domain" word-length="50" placeholder="Nhập tên miền của bạn" allow-clear>
                    <template #append>
                      .cloudwp.vn
                    </template>
                  </a-input>
                  
              </div>
            </a-tab-pane>
            <a-tab-pane key="register">
              <template #title>
                <icon-clock-circle/> Đăng ký tên miền mới
              </template>
              <a-input v-model="domain" word-length="50" placeholder="Nhập tên miền của bạn" allow-clear></a-input>
            </a-tab-pane>
            <a-tab-pane key="own">
              <template #title>
                <icon-user/> Đã có tên miền
              </template>
              Content of Tab Panel 3
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-modal>

      
    </div>
  
  
      <!-- Domain Page Info -->
    
  </template>
  <script setup>
  
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useWebStore } from "@/stores/website/webStore";
  import { useDomainSearchStore } from "@/stores/domain/domainSearchStore";
  import { storeToRefs } from 'pinia'


  const domainSearchStore = useDomainSearchStore()
  const { getDomainTlds } = domainSearchStore


  const webStore = useWebStore()
  const { createWebsite } = webStore 
  const {   themeSelected, domain } = storeToRefs(webStore)
  
  const router = useRouter()


  const searchResultsRef = ref(null);

  
  const visible = ref(false);
  

  const handleBeforeOk = async(done) => {
    
    if (themeSelected.value.type == 'subdomain') {
      createWebsite();
    } else if(themeSelected.value.type == 'register') {
      await getDomainTlds();
      router.push({ name: 'DomainWebsite' });
    } else if(themeSelected.value.type == 'own') {
      alert('ok')
    }

    done();

    
  } 
  // Gọi hàm scrollTosearchResults khi form được submit
  const handleCreateWebsite = () => {
    // createWebsite();
  }

  const handleChoiesDomain = (theme) => {
    theme.type = themeSelected.value.type
    themeSelected.value = theme;
    visible.value = true;
  }
  onMounted(() => {
    
  })

  const handleTabClick = (key) => {
    themeSelected.value.type = key;
  }
  


const themes = [
    {
        id: 1,
        name: 'Jane Cooper',
        title: 'Paradigm Representative',
        imageUrl:
        'https://vina.page/files/builder/images/template/spa2.jpg',
    },
     {
      id: 2,
        name: 'Jane Cooper',
        title: 'Paradigm Representative',
        imageUrl:
        'https://vina.page/files/builder/images/template/spa2.jpg',
    },
     {
      id: 3,
        name: 'Jane Cooper',
        title: 'Paradigm Representative',
        imageUrl:
        'https://vina.page/files/builder/images/template/spa2.jpg',
    },
     {
      id: 4,
        name: 'Jane Cooper',
        title: 'Paradigm Representative',
        imageUrl:
        'https://vina.page/files/builder/images/template/spa2.jpg',
    },
     {
        name: 'Jane Cooper',
        title: 'Paradigm Representative',
        imageUrl:
        'https://vina.page/files/builder/images/template/spa2.jpg',
    },
     {
        name: 'Jane Cooper',
        title: 'Paradigm Representative',
        imageUrl:
        'https://vina.page/files/builder/images/template/spa2.jpg',
    },
     {
        name: 'Jane Cooper',
        title: 'Paradigm Representative',
        imageUrl:
        'https://vina.page/files/builder/images/template/spa2.jpg',
    },
    
    
]
  
  
   
  </script>
   <style lang="less">
    .theme-view{
      padding-top: 20px;
      display: block;
      height: 300px;
      transition: background-position 2s ease-in-out;
      width: 100%;
      background-position: top center;
      background-size: 100% auto !important;
      background-repeat: no-repeat;
      width: 100%;
    }

    .theme-view:hover {
    background-position: bottom center !important;
    transition: background-position 10s linear 0s;
}


   </style>