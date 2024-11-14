<template>
  <div>
    <canvas ref="myChart"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'

// อ้างอิงไปยัง `<canvas>`
const myChart = ref(null)

onMounted(() => {
  const chartInstance = new Chart(myChart.value, {
    type: 'line', // ประเภทกราฟเป็น line chart
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // เดือนต่าง ๆ
      datasets: [
        {
          label: 'New Case',
          data: [10, 20, 15, 30, 25, 40, 30], // จำนวนเคสแต่ละเดือน
          borderColor: 'rgb(29 78 216)', // สีของเส้นกราฟ
          backgroundColor: 'rgba(29, 78, 216, 0.2)', // สีพื้นหลังใต้เส้นกราฟ
          fill: true, // เติมสีใต้เส้น
          tension: 0.3, // ทำให้เส้นโค้งเล็กน้อย
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true, // แสดง legend
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Month',
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Cases',
          },
        },
      },
    },
  })
})
</script>

<style scoped>
canvas {
  width: 100%;
  
  height: 400px;
}
</style>
