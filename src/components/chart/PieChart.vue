<template>
  <div class="h-[400px]">
    <h1>title</h1>
    <canvas ref="pieChart"></canvas>
  </div>
 
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import Chart from 'chart.js/auto'

const pieChart = ref(null)
let chartInstance = null // เก็บอินสแตนซ์ของ Chart

// ฟังก์ชันสำหรับทำลายกราฟ
function destroyChart() {
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
}

onMounted(() => {
  destroyChart()

  chartInstance = new Chart(pieChart.value, {
    type: 'doughnut', // เปลี่ยนประเภทกราฟเป็น doughnut chart
    data: {
      labels: ['Total Sent', 'Reached', 'Opened'], // ส่วนต่างๆ ในกราฟ
      datasets: [
        {
          data: [3917, 2500, 1500], // ข้อมูลที่ต้องการแสดงในแต่ละส่วน
          backgroundColor: ['#FFA500', '#00BFFF', '#6A5ACD'], // กำหนดสีของแต่ละส่วน
          hoverOffset: 10, // การขยายเมื่อเลื่อนเมาส์ผ่าน
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '75%', // กำหนดช่องว่างตรงกลาง
      plugins: {
        legend: {
          display: true,
          position: 'bottom', // ตำแหน่งของ legend
          labels: {
            usePointStyle: true,
            padding: 20,
          },
        },
        tooltip: {
          enabled: true,
        },
      },
    },
  })
})

onBeforeUnmount(() => {
  destroyChart() // ทำลายกราฟเมื่อ component ถูกทำลาย
})
</script>

<style scoped>
canvas {
  width: 100%;
  height: 400px;
}
</style>
