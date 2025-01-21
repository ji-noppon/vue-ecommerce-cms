import { defineStore } from "pinia"
import { ref } from "vue"

export const useMenuLinkStore = defineStore('menuLink', () => {
  const isOpen = ref(false)


  return { 
    isOpen, 

   }
})