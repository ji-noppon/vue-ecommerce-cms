<script setup lang="ts">
  import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
  import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid'

  const colorMode = localStorage.getItem("colorMode") ? true : false;
  
  const toggleDarkMode = () => document.documentElement.classList.toggle("dark");
  

</script>
<template>
  <div class="navbar dark-mode-custom ">
    <div class="navbar-container">
      <div></div>    
      <div class="flex">
        <div class="mr-4" @click="toggleDarkMode">
          <MoonIcon v-if="colorMode" class="w-6 h-6 text-gray-500 dark:bg-white" />
          <SunIcon v-else class="w-8 h-8 text-gray-500 bg-gray-200 p-1 rounded-full" />
        </div>
        <Popover class="relative">
          <PopoverButton>
            <img class="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          </PopoverButton>

          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="translate-y-1 opacity-0"
          >
            <PopoverPanel class="absolute w-[200px] right-0 transform  z-10 bg-white shadow-lg rounded-lg p-4">
              <div class="grid grid-cols-1">
                <a href="/analytics" class="menu-list">Setting</a>
                <a href="/engagement" class="menu-list">Forget Password</a>
                <a href="/engagement" class="menu-list">Role</a>
                <a href="/engagement" class="menu-list">Logout</a>
              </div>    
            </PopoverPanel>
          </transition>
        </Popover>
       
      </div>

      
    </div>
  </div>
</template>



<style lang="scss" scoped>
.navbar {
  @apply w-full bg-white h-[80px] p-4 border rounded-md;

  .navbar-container {
    @apply flex justify-between
  }
}
.menu-list {
  @apply p-2 hover:bg-gray-100
}
</style>