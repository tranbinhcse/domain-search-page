<template>
  <a-layout class="bg-white">
    <a-layout-sider theme="light">
      <a-menu mode="inline" :selected-keys="['ipv4']">
        <a-menu-item key="ipv4"> IPv4 </a-menu-item>
        <a-menu-item key="ipv6"> IPv6 </a-menu-item>
        <a-menu-item key="vpc"> VPC 2.0 </a-menu-item>
        <a-menu-item key="firewall"> Firewall </a-menu-item>
        <a-menu-item key="customISO"> Custom ISO </a-menu-item>
        <a-menu-item key="changeHostname"> Change Hostname </a-menu-item>
        <a-menu-item key="changePlan"> Change Plan </a-menu-item>
        <a-menu-item key="changeOS"> Change OS </a-menu-item>
        <a-menu-item key="reinstallSSH"> Reinstall SSH Keys </a-menu-item>
        <a-menu-item key="changeStartupScript"> Change Startup Script </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content>
      <div class="p-4">
        <a-typography-title level="5">Public Network</a-typography-title>
        <a-typography-text>
          Need assistance? View our
          <a-link href="#" type="primary">networking configuration</a-link>
          tips and examples.
        </a-typography-text>

        <a-table :columns="columns" :data="data" class="mt-4"></a-table>

        <div class="mt-6">
          <a-typography-title level="5">Additional IPv4 IP</a-typography-title>
          <a-button type="primary" class="mt-2">Add Another IPv4 Address</a-button>
        </div>

        <div class="mt-6">
          <a-typography-title level="5">VPC Network</a-typography-title>
          <a-button type="primary" class="mt-2">Enable VPC</a-button>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script setup>
import { ref } from 'vue'

const columns = [
  {
    title: 'Address',
    dataIndex: 'address',
    slots: { customRender: 'address' }
  },
  {
    title: 'Netmask',
    dataIndex: 'netmask'
  },
  {
    title: 'Gateway',
    dataIndex: 'gateway'
  },
  {
    title: 'Reverse DNS',
    dataIndex: 'reverseDNS',
    slots: { customRender: 'reverseDNS' }
  }
]

const data = [
  {
    address: '45.76.174.65',
    netmask: '255.255.254.0',
    gateway: '45.76.174.1',
    reverseDNS: 'sv.babeeni.com'
  }
]
</script>
