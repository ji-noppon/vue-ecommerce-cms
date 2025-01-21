import { createRouter, createWebHistory } from 'vue-router'
import { ROUTE_NAME } from '../constants/route'

const routes = [
  { 
    path: '/', 
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '', // หน้า Dashboard หลัก
        name: ROUTE_NAME.DASHBOARD,
        component: () => import('../components/ComDashboard.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/annoucement', // หน้ารายละเอียด
        name: ROUTE_NAME.ANNOUCEMENT,
        component: () => import('../pages/AnnoucementPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/banner', // หน้ารายละเอียด
        name: ROUTE_NAME.BANNER,
        component: () => import('../pages/BannerPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/category', // หน้ารายละเอียด
        name: ROUTE_NAME.CATEGORY,
        component: () => import('../pages/CategoryPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/group-product', // หน้ารายละเอียด
        name: ROUTE_NAME.GROUP_PRODUCT,
        component: () => import('../pages/GroupProductPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/product', // หน้ารายละเอียด
        name: ROUTE_NAME.PRODUCT,
        component: () => import('../pages/ProductPage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/user-management', // หน้ารายละเอียด
        name: ROUTE_NAME.USER_MANAGEMENT,
        component: () => import('../pages/UserManagementPage.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  { 
    path: '/login',
    name: ROUTE_NAME.LOGIN, 
    component: () => import('../pages/LoginPage.vue'), 
    meta: { requiresAuth: false }  
  },
  {
    path: '/not-found',
    name: ROUTE_NAME.NOT_FOUND,
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