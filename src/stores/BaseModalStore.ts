import { defineStore } from "pinia"
import { ref } from "vue"

export const useBaseModalStore = defineStore('baseModal', () => {
  const isOpen = ref(false)

  function openModal() {
    isOpen.value = true
  }

  function closeModal() {
    isOpen.value = false
  }

  return { 
    isOpen, 
    openModal,
    closeModal,
   }
})