<script setup lang="ts">
const props = defineProps({
  year: {
    type: Number,
    default: new Date().getFullYear()
  }
})
const { $api } = useNuxtApp()
const series = ref([{
  name: "Orders",
  data: []
}]);

const chartOptions = {
  chart: {
    type: 'area',
    height: 350,
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },

  title: {
    text: 'Order',
    align: 'left'
  },
  subtitle: {
    text: 'by month in year',
    align: 'left'
  },
  labels: ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"],
  xaxis: {
    categories: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  },
  yaxis: {
    opposite: true
  },
  legend: {
    horizontalAlign: 'left'
  }
}

const fetch = async () => {
  const { data } = await $api.dashboards.getOrderByMonth(props.year)
  console.log(data)

  series.value[0].data = Object.values(data);
}

onMounted(() => {
  fetch()
})

watch(() => props.year, () => {
  fetch()
})
</script>

<template>
  <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
</template>

<style scoped lang="scss">

</style>