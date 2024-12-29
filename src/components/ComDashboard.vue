<script setup lang="ts">
import LineChart from './chart/LineChart.vue'
import PieChart from './chart/PieChart.vue'
import BarChart from './chart/BarChart.vue';
import NewIcon from '@/assets/icons/NewIcon.vue'
import InprogressIcon from '@/assets/icons/InprogressIcon.vue';
import RejectIcon from '@/assets/icons/RejectIcon.vue';
import CompleteIcon from '@/assets/icons/CompleteIcon.vue';
import TotalIcon from '@/assets/icons/TotalIcon.vue';



</script>
<template>
  <div class="mx-auto py-6 px-2">
    <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <div class="icon-box">
        <div>
          <NewIcon class="icon--style color--newcase" /> 
        </div>
        <div>
          <dt class="order-last text-lg font-medium">New Case</dt>
          <dd class="text-4xl font-extrabold  md:text-5xl">2</dd>
        </div>
      </div>

      <div class="icon-box">
        <div>
          <InprogressIcon class="icon--style color--inprogress" /> 
        </div>
        <div>
          <dt class="order-last text-lg font-medium">Inprogress Case</dt>
          <dd class="text-4xl font-extrabold  md:text-5xl">5</dd>
        </div>
      </div>

      <div class="icon-box">
        <div>
          <RejectIcon class="icon--style color--reject" /> 
        </div>
        <div>
          <dt class="order-last text-lg font-medium">Reject Case</dt>
          <dd class="text-4xl font-extrabold  md:text-5xl">3</dd>
        </div>
      </div>

      <div class="icon-box">
        <div>
          <CompleteIcon class="icon--style color--complete" /> 
        </div>
        <div>
          <dt class="order-last text-lg font-medium">Complete Case</dt>
          <dd class="text-4xl font-extrabold  md:text-5xl">10</dd>
        </div>
      </div>

      <div class="icon-box">
        <div>
          <TotalIcon class="icon--style color--total" /> 
        </div>
        <div>
          <dt class="order-last text-lg font-medium">Total Case</dt>
          <dd class="text-4xl font-extrabold  md:text-5xl">20</dd>
        </div>
      </div>
    </dl>

    <div class="mt-4 grid grid-cols-2">
      <div class="bg-white p-4 rounded-lg">
        <BarChart />
      </div>
      <!-- <div class="col-span-2 bg-white p-4 rounded-lg">
        <LineChart />
      </div> -->

      <div class="ml-4 bg-white p-4 rounded-lg">
        <PieChart />
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.icon-box {
  @apply flex justify-evenly items-center rounded-lg border border-gray-100 p-4 text-center bg-white
}
.icon--style {
  @apply w-[50px] h-[50px] p-2 rounded-full ;
}
.color--newcase {
  @apply bg-blue-100;
}
.color--inprogress {
  @apply bg-orange-100
}
.color--reject {
  @apply bg-red-100
}
.color--complete {
  @apply bg-green-100
}
.color--total {
  @apply bg-gray-100
}
</style>