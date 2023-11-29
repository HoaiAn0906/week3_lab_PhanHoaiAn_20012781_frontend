<script setup lang="ts">
import { ref } from 'vue'
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue'
import CartCheckout from '@/components/dashboards/cart/CartCheckout.vue'

const page = ref({ title: 'Carts' })
const breadcrumbs = ref([
  {
    title: 'Home',
    disabled: false,
    href: '/',
  },
  {
    title: 'Cart Page',
    disabled: true,
    href: '#',
  },
])
</script>

<template>
  <base-breadcrumb :breadcrumbs="breadcrumbs" :title="page.title" />
  <cart-checkout />
</template>
