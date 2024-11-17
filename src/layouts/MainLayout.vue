<script setup lang="ts">
import ComNavBar from "@com/ComNavBar.vue";
import BaseSideBar from "@com/BaseSideBar.vue";
</script>

<template>
    <div class="flex">
      <div class="w-[250px]"><BaseSideBar /></div>
      <div class="w-full main-wrap dark-mode-custom">
        <ComNavBar />
        <div>
          <RouterView></RouterView>
        </div>
      
        
        <!-- <div class="main-container dark-mode-custom">
          <ComDashboard />
        </div> -->
    </div>
    </div>
</template>

<style lang="scss" scoped>
.main-wrap {
  @apply px-4 bg-gray-100;

  .main-container {
    @apply h-[calc(100%-100px)] bg-white mt-4 rounded-lg border dark:border-blue-500;
  }
}
</style>