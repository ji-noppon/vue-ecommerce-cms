import { createMemoryHistory, createRouter } from 'vue-router'

import NewCasePage from '../pages/NewCasePage.vue'
import ComDashboard from '@com/ComDashboard.vue'

const routes = [
  { path: '/', component: ComDashboard },
  { path: '/new-case', component: NewCasePage },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export {
  router
} 