<template>
  <div>
    <div class="flex gap-6 mb-5 justify-center items-center flex-auto" v-if="vmdetails?.bandwidth">
      <a-statistic
        title="Bandwidth Usage"
        :value="$unitFormat(vmdetails?.bandwidth?.data_sent)"
        show-group-separator
        class="bg-white p-6 rounded flex-auto"
        animation
      >
        <template #suffix> GB </template>
      </a-statistic>
      <a-statistic
        title="RAM Usage"
        :value="50.52"
        :precision="2"
        :value-style="{ color: '#0fbf60' }"
        class="bg-white p-6 rounded flex-auto"
      >
        <template #prefix>
          <icon-arrow-rise />
        </template>
        <template #suffix>%</template>
      </a-statistic>

      <div class="bg-white p-6 rounded flex-auto arco-statistic">
        <div class="arco-statistic-title">Uptime</div>
        <div class="arco-statistic-content">
          <div class="arco-statistic-value">
            <span class="arco-statistic-value-integer">{{
              convertToDayAndTime(vmdetails?.uptime)
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white p-4 rounded">
      <a-descriptions title="User Info" :column="{ xs: 1, md: 3, lg: 3 }">
        <a-descriptions-item span="1" label="Location">
          {{ service.server_name }}
        </a-descriptions-item>
        <a-descriptions-item span="1" label="vCPUs">
          {{ vmdetails.cpus }} vCPU
        </a-descriptions-item>
        <a-descriptions-item span="1" label="Label">
          {{ vmdetails.label }}
        </a-descriptions-item>

        <!-- <a-descriptions-item span="1" label="IP Address">
          {{ vmdetails.ipv4 }}
        </a-descriptions-item> -->
        <a-descriptions-item span="1" label="IP Address">
          {{ vmdetails.ipv4 }}
          <button @click="() => handleCopyToClipboard(vmdetails.ipv4)" class="bg-white">
            <icon-copy />
          </button>
        </a-descriptions-item>

        <a-descriptions-item span="1" label="RAM"> {{ vmdetails.memory }} MB </a-descriptions-item>
        <a-descriptions-item span="1" label="OS">
          {{ vmdetails.template_name }}
        </a-descriptions-item>
        <a-descriptions-item span="1" label="Username">
          {{ vmdetails.username }}
        </a-descriptions-item>
        <a-descriptions-item span="1" label="Storage">
          {{ vmdetails.disk }} GB
        </a-descriptions-item>
        <a-descriptions-item span="1" label="Bandwidth"> Unlimited </a-descriptions-item>
        <!-- <a-descriptions-item span="1" label="Password">
          {{ vmdetails.password }}
        </a-descriptions-item> -->
        <a-descriptions-item span="1" label="Password">
          {{ isShowPassword ? vmdetails.password : '*******' }}
          <button @click="handleShowPassword" class="bg-white ml-2">
            <icon-eye />
          </button>
          <button @click="() => handleCopyToClipboard(vmdetails.password)" class="bg-white ml-2">
            <icon-copy />
          </button>
        </a-descriptions-item>

        <a-descriptions-item span="1" label="Expires">
          {{ service.expires }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

defineProps(['service', 'vmdetails'])

const isShowPassword = ref(false)

const handleCopyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(
    () => {
      alert('IP address copied to clipboard')
    },
    (err) => {
      console.error('Could not copy text: ', err)
    }
  )
}

const handleShowPassword = () => {
  isShowPassword.value = !isShowPassword.value
}

const convertToDayAndTime = (totalSeconds) => {
  const days = Math.floor(totalSeconds / (3600 * 24))
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = Math.floor(totalSeconds % 60)

  return `${days} ngày, ${hours}:${minutes}:${seconds}`
}
</script>
