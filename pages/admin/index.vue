<script setup lang="ts">
import OrderByMonth from "~/components/dashboards/statistical/orderByMonth.vue";

definePageMeta({
  layout: 'admin',
})

const year = ref(new Date().getFullYear())
</script>

<template>
  <div>
    <h1>Order by Month in Year</h1>
    <VueDatePicker v-model="year" year-picker />
    <order-by-month :year="year"/>
  </div>
</template>

<style scoped lang="scss">

</style>