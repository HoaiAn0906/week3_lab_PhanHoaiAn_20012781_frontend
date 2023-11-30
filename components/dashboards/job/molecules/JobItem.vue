<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  job: {
    type: Object,
    required: true,
  }
})
const successsnackbar = ref(false)
</script>

<template>
  <v-card class="rounded-md card-hover overflow-hidden" elevation="10">
<!--    <router-link :to="`/products/${id}`">-->
<!--      <img alt="product" class="w-100 tw-max-h-[250px]" :src="image" />-->
<!--    </router-link>-->
    <div class="d-flex justify-end mr-3 mt-n6">
      <v-tooltip location="bottom" text="Add to Cart">
<!--        <template #activator="{ props }">-->
<!--          <v-btn-->
<!--            v-bind="props"-->
<!--            class="ml-auto"-->
<!--            color="primary"-->
<!--            icon-->
<!--            size="x-small"-->
<!--            @click="addToCart"-->
<!--          >-->
<!--            <BasketIcon size="18" />-->
<!--          </v-btn>-->
<!--        </template>-->
      </v-tooltip>
    </div>
    <v-card-item class="pt-1">
      <div class="mt-6">
        <h3>{{ job.jobName }}</h3>
        <div class="tw-flex tw-items-center">
          <v-avatar class="mr-2 mt-1" size="40">
            <v-img :src="'https://picsum.photos/500/500'" />
          </v-avatar>

          <h4 class="ml-2">{{ job.company.compName }}</h4>
        </div>
        <v-divider class="mt-2" />
        <div class="tw-flex tw-items-center mt-2">
          <v-icon color="primary" size="18">mdi-map-marker</v-icon>
          <span class="ml-1">{{ job.company.address.number }} {{ job.company.address.street }} {{ job.company.address.city }}</span>
        </div>
        <div class="tw-flex tw-items-center mt-2">
          <v-chip class="mx-1" v-for="(skill, index) in job.skills" :key="index">
            {{ skill.skillName }}
          </v-chip>
        </div>
        <v-divider class="mt-2" />
        <div>
          <h5>{{ job.jobDesc }}</h5>
        </div>
      </div>
    </v-card-item>
    <v-snackbar
      v-model="successsnackbar"
      class="text-white"
      color="success"
      location="bottom right"
      rounded="md"
      variant="flat"
    >
      Item Added to The Cart
    </v-snackbar>
  </v-card>
</template>
<style>
.descriptionH {
  height: 40px;
  overflow: hidden;
}
</style>
