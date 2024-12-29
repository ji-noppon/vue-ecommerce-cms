<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

interface MenuItem {
  name: string;
  active: boolean;
  redirect: () => void;
}

const menuItems = ref<MenuItem[]>([
  { name: "Dashboard", active: true, redirect: redirectDashboardPage },
  { name: "Case", active: false, redirect: redirectNewCasePage },
  /* { name: "Inprogress",       active: false, count: 5,    redirect: redirectDashboardPage },
  { name: "Reject",           active: false, count: 8,    redirect: redirectDashboardPage },
  { name: "Complete",         active: false, count: 20,   redirect: redirectDashboardPage }, */
  { name: "Product", active: false, redirect: redirectProductPage },
  { name: "User Management", active: false, redirect: redirectUserManagement },
]);

function handleMenuClick(menu: MenuItem) {
  menuItems.value.forEach((menu) => (menu.active = false));
  menu.active = true;
  if (menu.redirect) {
    menu.redirect();
  }
}

function redirectDashboardPage() {
  menuItems.value[0].active = true;
  router.push("/");
}

function redirectNewCasePage() {
  router.push("/new-case");
}

function redirectProductPage() {
  router.push("/product");
}

function redirectUserManagement() {
  router.push("/user-management");
}
</script>
<template>
  <div class="sidebar-wrap dark-mode-custom">
    <div class="px-4 py-6">
      <span class="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
        Logo
      </span>

      <ul class="sidebar-link">
        <li v-for="(menu, index) in menuItems" :key="index">
          <div
            class="sidebar-menu"
            :class="{ 'sidebar-menu--active': menu.active }"
            @click="handleMenuClick(menu)"
          >
            {{ menu.name }}
          </div>
        </li>
      </ul>
    </div>

    <div class="sticky inset-x-0 bottom-0 border-t border-gray-100 dark:border-blue-500">
      <a
        href="#"
        class="dark-mode-custom flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
      >
        <img
          alt=""
          src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          class="size-10 rounded-full object-cover"
        />

        <div>
          <p class="text-xs">
            <strong class="block font-medium">DEV YangWang</strong>
            <span>devyangwang@gmail.com </span>
          </p>
        </div>
      </a>
    </div>
  </div>
  <div class="sidebar-wrap-mobile">
    <button class="bg-yellow-200">xxx</button>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-wrap {
  @apply h-screen flex-col justify-between border-e bg-white hidden sm:flex;
}
.sidebar-wrap-mobile {
  @apply sm:hidden 
}

.sidebar-menu {
  @apply flex rounded-lg px-4 py-2 text-sm font-medium text-gray-500 dark:text-white;

  &:not(.sidebar-menu--active):hover {
    @apply hover:bg-blue-500 hover:text-white;
  }
}
.sidebar-menu--active {
  @apply bg-blue-700 text-white;
}

.sidebar-link {
  @apply mt-6 space-y-1;

  li {
    @apply cursor-pointer;
  }
}
</style>
