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

    <RouterView></RouterView>
    
    <!-- <div><BaseAlert /></div>
    <BaseCard />
    <button @click="toggleDarkMode">dark mode</button> -->
  </div>
</template>

<style lang="scss" scoped>


</style>
