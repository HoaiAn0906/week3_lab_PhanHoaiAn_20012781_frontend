<script setup lang="ts">
import { ref, computed } from 'vue'
import { BasketIcon } from 'vue-tabler-icons'
import StepFirst from './steps/StepFirst.vue'
import {useCartStore} from "@/stores/carts";


const store = useCartStore()
const { $api } = useNuxtApp()
const auth = useAuth()

const getCart = computed(() => {
  return store.cart
})
const tab = ref('tab-1')
const payment = () => {
  const amount = store.cartTotal
  const customerDummy = {
    id: 1,
    address: 'Jl. Raya Bogor KM 26, Cimanggis, Depok',
    cust_name: 'Nguyen Thi Le',
    email: 'le@yopmail.com',
    phone: '08123456789',
  }

  const data = {
    customer: customerDummy,
    employee: auth.data.value.user,
    products: getCart.value,
    total: store.cartTotal,
  }

  $api.orders.createOrder(data)
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })

  $api.payments.createPayment({ amount: amount })
  .then((res) => {
    const url = res.data.url
    console.log(url)
    window.location.href = url
  })
  .catch((err) => {
    console.log(err)
  })
}
</script>
<template>
  <v-card elevation="10">
    <v-card-text>
      <v-tabs v-model="tab" class="customTab" color="primary">
        <v-tab class="mb-3 mx-2 text-left" height="70" rounded="md" value="tab-1">
          <basket-icon class="v-icon--start" stroke-width="1.5" width="20" />
          <div>
            <div>Item Cart</div>
            <span class="text-subtitle-2 text-lightText text-medium-emphasis font-weight-medium d-block">
              Product Summary
            </span>
          </div>
        </v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item class="pa-1" value="tab-1">
          <step-first />
          <v-row class="mt-3">
            <v-col cols="12" sm="6">
              <v-btn color="primary" to="/" variant="tonal">Continue Shopping</v-btn>
            </v-col>
            <v-col class="text-sm-right" cols="12" sm="6">
              <v-btn v-if="store.cart.length >= 1" color="primary" @click="payment">Payment</v-btn>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
<style lang="scss">
.customTab {
  min-height: 68px;
}
</style>
