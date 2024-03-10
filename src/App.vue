<template>
    <router-view></router-view>


    <CartSummary />


</template>

<script setup>
import CartSummary from '@/components/general/CartSummary.vue' 

 
</script>
<style>
#app,
html,
body {
  @apply min-h-screen;
}
body {
  @apply relative;
}

#app {
  @apply bg-page-background;
}
</style>