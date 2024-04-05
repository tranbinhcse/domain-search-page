<template>
  <a-config-provider :locale="locale">
    <router-view />
 
  </a-config-provider>

</template>

<script  setup>
  import { computed } from 'vue';
  import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
  import viVN from '@arco-design/web-vue/es/locale/lang/vi-vn';
 
  import useLocale from '@/hooks/locale';

  const { currentLocale } = useLocale();
  const locale = computed(() => {
    switch (currentLocale.value) {
      case 'vi-VN':
        return viVN;
      case 'en-US':
        return enUS;
      default:
        return viVN;
    }
  });
</script>


<style>
body{
  width: 100% !important;
}
</style>
 