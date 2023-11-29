<script setup lang="ts">
import {useCartStore} from "@/stores/carts";
import filters from "@/plugins/filters/currency";

const store = useCartStore()
</script>
<template>
  <v-card class="my-3" variant="outlined">
    <v-card-item>
      <h5 class="text-h5 mb-6">Order Summery</h5>

      <div class="d-flex align-center justify-space-between my-5">
        <h6 class="text-h6 font-weight-regular">Shipping Charges</h6>
        <h6 class="font-weight-semibold text-h6">-</h6>
      </div>

      <div class="d-flex align-center justify-space-between my-5">
        <h6 class="text-h6">Total</h6>
        <h6 class="font-weight-semibold text-h5">{{ filters.currency(store.cartTotal) }}</h6>
      </div>
    </v-card-item>
  </v-card>
</template>
