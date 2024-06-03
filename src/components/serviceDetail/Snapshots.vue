<template>
  <div class="p-4 bg-white">
    <a-typography-title level="5">Take Snapshot</a-typography-title>
    <a-card class="mt-2">
      <a-input-group compact>
        <a-input v-model="snapshotLabel" placeholder="Label" style="width: 70%;" />
        <a-button type="primary" @click="takeSnapshot">Take Snapshot</a-button>
      </a-input-group>
      <a-typography-paragraph class="mt-2">
        <ul>
          <li>Stored snapshots will cost $0.05/GB per month - pricing subject to change.</li>
          <li>We recommend using DHCP for networking. By default, Vultr instances are configured to use DHCP.</li>
          <li>Snapshots can only be restored to equal or bigger disks. If there is a single partition, it will be automatically expanded.</li>
        </ul>
      </a-typography-paragraph>
    </a-card>

    <!-- Restore Snapshot Section -->
    <a-typography-title level="5" class="mt-6">Restore Snapshot</a-typography-title>
    <a-table :columns="columns" :data="snapshotData" class="mt-2"></a-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const snapshotLabel = ref('');
const snapshotData = ref([]);

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'OS',
    dataIndex: 'os',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];

const takeSnapshot = () => {
  // Implement snapshot taking functionality
  console.log('Snapshot taken:', snapshotLabel.value);
};
</script>