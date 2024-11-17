import { createRouter, createWebHistory } from 'vue-router'

// const routes = [
//   { path: '/', component: () => import('../components/ComDashboard.vue') },
//   { path: '/new-case', component: () => import('../pages/NewCasePage.vue'), meta: { requiresAuth: true }  },
//   { path: '/login', component: () => import('../pages/LoginPage.vue'), meta: { requiresAuth: true }  },
// ]

const routes = [
  { 
    path: '/', 
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '', // หน้า Dashboard หลัก
        component: () => import('../components/ComDashboard.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/new-case', // หน้ารายละเอียด
        component: () => import('../pages/NewCasePage.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  { 
    path: '/login', 
    component: () => import('../pages/LoginPage.vue'), 
    meta: { requiresAuth: false }  
  },
  {
    path: '/not-found',
    component: () => import('../pages/NotFoundPage.vue'),
  },
  {
    path: '/:catchAll(.*)',  // ใช้ :catchAll(.*) เพื่อจับ path ที่ไม่ตรง
    redirect: '/not-found'  // หรือเลือกไปที่หน้าที่ต้องการ (เช่น หน้า 404 หรือ Login)
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation Guard เพื่อทำการ redirect หากผู้ใช้ไม่ได้ล็อกอิน
router.beforeEach((to, from, next) => {
  const isAuthenticated = true;  // กำหนดสถานะการล็อกอินจาก Vuex หรืออื่นๆ

  // หากต้องการการล็อกอินและยังไม่ได้ล็อกอิน
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // ถ้าผู้ใช้ไม่ได้ล็อกอินและพยายามเข้าถึง route ที่ต้องการล็อกอิน
    if (to.path !== '/login') {
      next({ path: '/login' }); // redirect ไปที่หน้า login
    } else {
      next(); // ถ้ากำลังอยู่ในหน้า login ไม่ต้องทำอะไร
    }
  } else {
    // ถ้าผู้ใช้ล็อกอินแล้ว หรือหน้าไม่ต้องการการล็อกอินก็ไปต่อ
    next();
  }
})

export {
  router
} 