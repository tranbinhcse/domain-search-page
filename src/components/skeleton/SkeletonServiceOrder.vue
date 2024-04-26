<template>
  <a-space direction="vertical" size="large" :style="{ width: '100%' }">
    <a-skeleton :animation="true">
      <a-row :gutter="8">
        <a-col :span="6"
          ><div class="w-full bg-white p-4 dark:bg-gray-800 rounded">
            <a-skeleton-line :rows="3" /></div
        ></a-col>
        <a-col :span="6"
          ><div class="w-full bg-white p-4 dark:bg-gray-800 rounded">
            <a-skeleton-line :rows="3" /></div
        ></a-col>
        <a-col :span="6"
          ><div class="w-full bg-white p-4 dark:bg-gray-800 rounded">
            <a-skeleton-line :rows="3" /></div
        ></a-col>
        <a-col :span="6"
          ><div class="w-full bg-white p-4 dark:bg-gray-800 rounded">
            <a-skeleton-line :rows="3" /></div
        ></a-col>
      </a-row>
    </a-skeleton>
  </a-space>
</template>
