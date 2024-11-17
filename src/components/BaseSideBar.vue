<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const toggleDarkMode = () => document.documentElement.classList.toggle("dark");

interface MenuItem {
  key: number;
  name: string;
  active: boolean;
  count: number;
  redirect: () => void;
}

const menuItems = ref<MenuItem[]>([
  { key: 1, name: "Dashboard",        active: true,  count: null, redirect: redirectDashboardPage},
  { key: 2, name: "New Case",         active: false, count: 4,    redirect: redirectNewCasePage },
  { key: 3, name: "Inprogress",       active: false, count: 5,    redirect: redirectDashboardPage },
  { key: 4, name: "Reject",           active: false, count: 8,    redirect: redirectDashboardPage },
  { key: 5, name: "Complete",         active: false, count: 20,   redirect: redirectDashboardPage },
  { key: 6, name: "User Management",  active: false, count: null, redirect: redirectDashboardPage },
]);

function handleMenuClick(menu: MenuItem) {
  menuItems.value.forEach((menu) => (menu.active = false));
  menu.active = true;
  if (menu.redirect) {
    menu.redirect()
  }
}

function redirectDashboardPage() {
  menuItems.value[0].active = true;
  router.push("/");
}

function redirectNewCasePage() {
  router.push("/new-case");
}
// function redirectNewCasePage() {
//   router.push('/new-case')
// }
// function redirectNewCasePage() {
//   router.push('/new-case')
// }
// function redirectNewCasePage() {
//   router.push('/new-case')
// }
</script>
<template>
  <div
    class="flex h-screen flex-col justify-between border-e bg-white dark-mode-custom"
  >
    <div class="px-4 py-6">
      <span
        class="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600"
      >
        Logo
      </span>

      <ul class="sidebar-link">
        <!-- ใช้ v-for เพื่อวนลูปสร้างเมนู -->
        <li v-for="(menu, index) in menuItems" :key="index">
          <div
            class="sidebar-menu"
            :class="{ 'sidebar-menu--active': menu.active }"
            @click="handleMenuClick(menu)"
          >
            {{ menu.name }}
            <span v-if="menu.count" class="ml-auto">{{ menu.count }}</span>
          </div>
        </li>
      </ul>
    </div>

    <div
      class="sticky inset-x-0 bottom-0 border-t border-gray-100 dark:border-blue-500"
    >
      <a
        href="#"
        class="flex items-center gap-2 bg-white p-4 hover:bg-gray-50 dark-mode-custom"
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
</template>

<style lang="scss" scoped>
.sidebar-menu {
  @apply rounded-lg flex px-4 py-2 text-sm font-medium text-gray-500 dark:text-white;

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
