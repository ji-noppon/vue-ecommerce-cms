import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './routers/index'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import './style.css'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  theme: {
      preset: Aura,
  }
});
app.mount('#app')
