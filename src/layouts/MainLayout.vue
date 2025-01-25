<script setup lang="ts">
import ComNavBar from "@com/ComNavBar.vue";
import BaseSideBar from "@com/BaseSideBar.vue";
import Loading from "@com/Loading.vue";
import { useLoadingRouterStore } from '@/stores/LoadingRouterStore'
import { storeToRefs } from 'pinia'

const loadingRouter = useLoadingRouterStore()
const { isLoadingPage } = storeToRefs(loadingRouter)
</script>

<template>
  <div class="body-container">
    <BaseSideBar />
    <div class="w-full main-wrap dark-mode-custom" style="border:unset">
      <ComNavBar />
      <div v-if="isLoadingPage"> <Loading /></div>
      <div v-else><RouterView></RouterView></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.body-container {
  @apply grid grid-cols-[auto_auto] sm:grid-cols-[250px_auto]
}
.main-wrap {
  @apply px-4 bg-gray-100;

  .main-container {
    @apply h-[calc(100%-100px)] bg-white mt-4 rounded-lg border dark:border-blue-500;
  }
}
</style>