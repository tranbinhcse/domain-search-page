<template>
    <div class="relative">
       
        <div class="">
            <div class="flex items-center justify-center w-full">
                <label :for="`dropzone-file-${type}`" class="flex flex-col items-center justify-center w-full h-42 overflow-hidden border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div v-if="!file" class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <div>
                        <img v-if="file" :src="file" class=" " alt="Uploaded image">
                    </div>
                    <input :id="`dropzone-file-${type}`" type="file" :name="type" class="hidden" accept="image/png, image/jpeg" @change="handleFileChange" />
                </label>
            </div>
            <div>
                <Alert :content="error" v-if="error" variant="warning" />
                <Alert :content="info" v-if="info" variant="active" />
            </div>
        </div>
        <div v-show="loading" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-slate-500/20 dark:bg-gray-700/20  w-full h-full flex justify-center items-center">
            <div role="status" class="">
                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>

   
     
</template>

<script setup>

import { ref, defineProps, defineEmits } from 'vue';
import { storeToRefs } from 'pinia'
import { useEkycStore } from "@/stores/ekycStore.js";
import { useDomainRegisterStore } from "@/stores/domain/domainRegisterStore.js";
import { resizeImage } from "@/utility/ekyc/image-util.js";
import { ocrFrontCardChecking, ocrBackCardChecking } from "@/utility/ekyc.js";
import Alert from '@/components/base/Alert.vue'

const domainRegisterStore = useDomainRegisterStore()
const ekycStore = useEkycStore()
const { recognition } = ekycStore
const { loading, ocrData , ocrOK } = storeToRefs(ekycStore)
const { contacts } = storeToRefs(domainRegisterStore)


const props = defineProps({
    type: String
})

const emits = defineEmits(['update:modelValue', 'dataImageCard']);
const file = ref(null);
const error = ref(null);
const info = ref(null);

const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
        info.value = '';
        error.value = '';
        const reader = new FileReader();
        reader.onloadend = (async(e) => {
            file.value = e.target.result;
            
            let resizedImageData = await resizeImage(reader.result);
           await recognition(props.type, resizedImageData)
           if(props.type == 'cardFront'){
            handleFrontData(event)
           }
           if(props.type == 'cardBack'){
            handleBackData(event)
           }
           
        });
        reader.readAsDataURL(selectedFile);
        
    }
}


const handleFrontData = (event) => {
    const data = ocrFrontCardChecking(ocrData.value.cardFront);
    console.log(data);
    if(data.success == false){
        file.value = '';
     
        error.value = data.message;
        ocrData.value.cardFront = {};
        event.target.value = null;
        
    } else {
        info.value = data.message;

        // Gửi giá trị file đã chọn lên component cha
        emits('dataImageCard', ocrData.value.cardFront);

      
    }
}
const handleBackData = (event) => {
    const data = ocrBackCardChecking(ocrData.value.cardBack, ocrData.value.cardFront);
    console.log(data);
    if(data.success == false){
        file.value = '';
        error.value = data.message;
        ocrData.value.cardBack = {};
        event.target.value = null;
    } else {
     info.value = data.message;
     ocrOK.value = true
 }
}

</script>

 