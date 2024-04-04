<template>
  <div class="menu-demo">
    <a-menu mode="horizontal" :default-selected-keys="['1']">
       
      <a-menu-item key="1">Home</a-menu-item>
      <a-menu-item key="2">Solution</a-menu-item>
      <a-menu-item key="3">Cloud Service</a-menu-item>
      <a-menu-item key="4">Cooperation</a-menu-item>
    </a-menu>
  </div>
</template>
<style scoped>
.menu-demo {
  box-sizing: border-box;
  width: 100%;
   
  background-color: var(--color-neutral-2);
}
</style>