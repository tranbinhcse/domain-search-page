<template>
    <div>
       
        <a-badge :color="status[variant]"/>  {{variant}}
    </div>
</template>


<script setup>


import { ref } from 'vue'


defineProps({
    variant: String
})

const status = ref({
      "Active" : "green",
      "Pending" : "yellow",
      "Pending Registration" : "red",
      "Suspended" : "blue",
      "Terminated" : "black",
      "Cancelled" : "gray",
      "Unpaid" : "red",
      "Paid" : "green",
    })

</script>