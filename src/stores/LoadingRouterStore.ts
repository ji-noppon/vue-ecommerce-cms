import { defineStore } from "pinia"
import { ref } from "vue"

export const useLoadingRouterStore = defineStore('loadingRouter', () => {
  const isLoadingPage = ref(false)

  return { 
    isLoadingPage,
   }
})