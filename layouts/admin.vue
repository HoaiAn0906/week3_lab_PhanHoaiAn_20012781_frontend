<script setup lang="ts">
import { useCustomizerStore } from '@/stores/customizer'

const customizer = useCustomizerStore()
</script>

<template>
  <v-locale-provider>
    <v-app
        :class="[
        customizer.actTheme,
        customizer.mini_sidebar ? 'mini-sidebar' : '',
        customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
        customizer.setBorderCard ? 'cardBordered' : '',
      ]"
        :theme="customizer.actTheme"
    >
      <LcFullHorizontalHeaderAdmin v-if="customizer.setHorizontalLayout" />
      <LcFullHorizontalSidebarAdmin class="tw-mt-[88px]" v-if="customizer.setHorizontalLayout" />
      <v-main>
        <v-container class="page-wrapper tw-bg-white" fluid>
          <div :class="customizer.boxed ? 'maxWidth' : ''">
            <nuxt-page />
          </div>
        </v-container>
      </v-main>
      <v-footer class="tw-bg-secondary tw-px-0 footer">
        <v-container fluid>
          <div :class="customizer.boxed ? 'maxWidth' : ''">
            <div class="tw-flex flex-wrap">
              <div class="tw-w-[260px]">
                <v-text-field
                    append-inner-icon="mdi-magnify"
                    class="tw-rounded-none"
                    density="compact"
                    flat
                    hide-details
                    label="Enter Make or Model"
                    single-line
                    variant="solo-filled"
                />
              </div>
              <v-spacer />
              <div class="tw-block tw-text-[#ffffff80]">
                <v-btn class="tw-text-[13px]" variant="text">Help</v-btn>
                <v-divider class="tw-h-[13px]" vertical />
                <v-btn class="tw-text-[13px]" variant="text">About Us</v-btn>
                <v-divider class="tw-h-[13px]" vertical />
                <v-btn class="tw-text-[13px] pr-0" variant="text">Contact Us</v-btn>
              </div>
            </div>
            <v-divider class="tw-my-3" heigh="1" />
            <div class="tw-flex flex-wrap">
              <div class="tw-text-[13px] tw-text-[#888] tw-w-full sm:tw-w-auto">
                <span>Copyright © 2021. Motors – WordPress Theme by StylemixThemes</span>
              </div>
              <v-spacer />
              <div>
                <v-spacer />
                <div class="tw-w-full sm:tw-w-[200px] tw-flex tw-gap-5">
                  <a class="tw-text-[#6c98e1] tw-text-[14px]" href="#"><v-icon size="18px">mdi-facebook</v-icon></a>
                  <a class="tw-text-[#6c98e1] tw-text-[14px]" href="#"><v-icon size="18px">mdi-twitter</v-icon></a>
                  <a class="tw-text-[#6c98e1] tw-text-[14px]" href="#"><v-icon size="18px">mdi-instagram</v-icon></a>
                  <a class="tw-text-[#6c98e1] tw-text-[14px]" href="#"><v-icon size="18px">mdi-linkedin</v-icon></a>
                </div>
              </div>
            </div>
          </div>
        </v-container>
      </v-footer>
    </v-app>
  </v-locale-provider>
</template>
<style lang="scss">
.footer {
  .tw-rounded-none {
    border-radius: 0 !important;
  }

  v-footer .v-field--variant-solo,
  .v-field--variant-solo-filled {
    background-color: transparent !important;
    color: #fff !important;
  }

  footer .v-input__control > div {
    border-radius: 0 !important;
    height: 35px !important;

    > div {
      height: 35px !important;
    }

    input {
      padding-top: 6px !important;
    }
  }
}
</style>
