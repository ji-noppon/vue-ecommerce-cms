<script setup lang="ts">
import BaseCard from "@com/BaseCard.vue";
import BaseAlert from "@com/BaseAlert.vue";
import BaseSideBar from "@com/BaseSideBar.vue";
import ComNavBar from "@com/ComNavBar.vue";
import ComDashboard from "@com/ComDashboard.vue";

const toggleDarkMode = () => document.documentElement.classList.toggle("dark");

</script>

<template>
  <div>
    <div class="flex">
      <div class="w-[250px]"><BaseSideBar /></div>
      <div class="w-full main-wrap dark-mode-custom">
        <ComNavBar />

        <RouterView></RouterView>
        
        <!-- <div class="main-container dark-mode-custom">
          <ComDashboard />
        </div> -->
    </div>
    </div>
    
    
    <div><BaseAlert /></div>
    <BaseCard />
    <button @click="toggleDarkMode">dark mode</button>
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
