<script setup lang="ts">
import BaseCard from '@com/BaseCard.vue';
import NewCaseForm from '@com/form/NewCaseForm.vue';
import { ref } from 'vue';
import { useBaseModalStore } from '@/stores/BaseModalStore'
import { storeToRefs } from 'pinia';

const baseModalStore = useBaseModalStore()
const { closeModal } = baseModalStore
const { isOpen } = storeToRefs(baseModalStore)

</script>
<template>
  <div class="content-container dark-mode-custom mt-4">
    new case page
    <BaseCard />

    <button @click="() => isOpen = !isOpen">กดเปิดฟอร์ม </button>
    <p>statusmodal :  {{ isOpen }}</p>

    <!-- modal -->
    <NewCaseForm />
  </div>
</template>

<style lang="scss" scoped>
</style>