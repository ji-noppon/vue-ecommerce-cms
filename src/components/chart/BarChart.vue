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
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // เดือนต่าง ๆ
      datasets: [
        {
          label: 'ยอดขาย',
          data: [1000, 2000, 1500, 3000, 600, 4000, 3900] , // จำนวนเคสแต่ละเดือน
          borderColor: 'rgb(29 78 216)', // สีของเส้นกราฟ
          backgroundColor: 'rgba(29, 78, 216)', // สีพื้นหลังใต้เส้นกราฟ
          fill: true, // เติมสีใต้เส้น
          tension: 0.5, // ทำให้เส้นโค้งเล็กน้อย
        },
        {
          label: 'Recovered Case',
          data: [500, 1500, 1000, 2500, 2000, 3500, 2500], // จำนวนเคสที่ฟื้นตัวแต่ละเดือน
          borderColor: 'rgb(16 185 129)', // สีของขอบแท่งกราฟสำหรับข้อมูลเปรียบเทียบ
          backgroundColor: 'rgba(29, 78, 216, 0.4)', // สีของแท่งกราฟสำหรับข้อมูลเปรียบเทียบ
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
