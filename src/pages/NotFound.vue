<template>
    <div class="content">
     
      <a-result class="result" status="404" :subtitle="'not found'"> </a-result>
      <div class="operation-row">
        <FaceDetect />
        <a-button key="back" type="primary" @click="back"> back </a-button>
      </div>
    </div>
  </template>
  
  <script   setup>
    import { useRouter } from 'vue-router';
    import FaceDetect from '@/components/ekyc/FaceDetect.vue';

    const router = useRouter();
    const back = () => {
      // warning： Go to the node that has the permission
      router.push({ name: 'home' });
    };
  </script>
  
  <style scoped lang="less">
    .content {
      // padding-top: 100px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -95px;
      margin-top: -121px;
      text-align: center;
    }
  </style>
  