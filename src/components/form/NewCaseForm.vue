<script setup lang="ts">
import BaseModal from '@com/BaseModal.vue';
import BaseButton from '@com/BaseButton.vue';
import { useBaseModalStore } from '@/stores/BaseModalStore'


const baseModalStore = useBaseModalStore()
</script>
<template>
  <BaseModal>
    <template #content>
      <div class="grid grid-cols-12 gap-x-4 gap-y-4">
        <div class="sm:col-span-6">
          <label for="username" class="label-custom">Building</label>
          <div class="mt-2">
            <div class="form-custom">
              <input type="text" name="username" id="username" class="input-text-custom" placeholder="Building" />
            </div>
          </div>
        </div>

        <div class="sm:col-span-6">
          <label for="username" class="label-custom">Room</label>
          <div class="mt-2">
            <div class="form-custom">
              <input type="text" name="username" id="username" class="input-text-custom" placeholder="Room" />
            </div>
          </div>
        </div>

        <div class="sm:col-span-6">
          <label for="username" class="label-custom">Issue</label>
          <div class="mt-2">
            <div class="form-custom">
              <input type="text" name="username" id="username" class="input-text-custom" placeholder="Issue" />
            </div>
          </div>
        </div>

      </div>
    </template>
    <template #footer>
      <div class="flex justify-center mt-5">
        <BaseButton mode="error" label="cancle" class="mr-4 cursor-pointer" @click="baseModalStore.closeModal" />
        <BaseButton label="save" class="cursor-pointer" />
      </div>
    </template>
  </BaseModal>
</template>

<style scoped>

  .label-custom {
    @apply block text-sm/6 font-medium text-gray-900
  }
  .form-custom {
    @apply flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-500
  }
  .input-text-custom {
    @apply block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6
  }
</style>
