<script setup lang="ts">
import BuildingIcon from '@/assets/icons/BuildingIcon.vue';
import BaseButton from './BaseButton.vue';
import ComProgress from './ComProgress.vue';

 interface Props {

 }

 const porps = defineProps<Props>()

</script>
<template>
  <div>
    <div class="flex rounded-lg mt-4 p-4 shadow-sm shadow-indigo-600">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        class="h-56 max-w-[250px] rounded-md object-cover"
      />
    
      <div class="ml-4 min-w-[400px]">
        <div>  
          <div class="card-detail-box">
            <BuildingIcon class="inline mr-2" /> <span class="text-gray-400 w-20">Building:</span> <span class="font-medium"> Tower A</span>  
          </div>
          <div class="card-detail-box mt-2">
            <BuildingIcon class="inline mr-2" /> <span class="text-gray-400 w-20">Floor:</span> <span class="font-medium"> 4</span>  
          </div>
          <div class="card-detail-box mt-2">
            <BuildingIcon class="inline mr-2" /> <span class="text-gray-400 w-20">Room:</span> <span class="font-medium"> 321</span>  
          </div>

          <div class="card-detail-box mt-2">
            <BuildingIcon class="inline mr-2" /> <span class="text-gray-400 w-20">Issue:</span> <span class="font-medium"> น้ำไม่ไหล</span>  
          </div>

          <div class="mt-6">
            สถานะ
            <ComProgress />
          </div>
        </div>
      </div>



      <div class="ml-auto">
        <div class="grid gap-y-2">
          <BaseButton label="รับเรื่อง" />
          <BaseButton label="รายละเอียด" :mode="'info'" />
          <BaseButton label="ยกเลิก" :mode="'error'" />
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
  .card-detail-box {
    @apply flex items-center;
  }
</style>