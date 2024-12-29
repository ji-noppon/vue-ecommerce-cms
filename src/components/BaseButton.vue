<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  mode?: 'success' | 'error' | 'info'
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  mode: "success"
})

const modeClasses = {
  success: "bg-green-500   hover:border-green-500   hover:bg-green-400",
  error:   "bg-red-500     hover:border-red-500     hover:bg-red-400",
  info:    "bg-yellow-500  hover:border-yellow-500  hover:bg-yellow-400"
};
</script>

<template>
  <button
    class="base-button"
    :class="modeClasses[props.mode]"
  >
    {{ props.label }}
  </button>
</template>
<style scoped>
  .base-button {
    @apply rounded-full text-center py-2 w-24 font-medium text-white disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500;
  }
</style>