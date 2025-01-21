import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './routers/index'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css'
import { definePreset } from '@primevue/themes';

import './style.css'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

// custom theme
const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}'
    }
  }
});

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  theme: {
      preset: MyPreset,
  }
});
app.mount('#app')
