import { defineStore } from "pinia"
import { ref } from "vue"
import { Category } from "../interfaces/modules/category";

export const useBaseModalStore = defineStore('category', () => {
  const categorys = ref<Category[]>([
    {
      id: "1000",
      nameTh: "โน็ตบุ้ค",
      nameEn: "Laptops",
      image: `src/assets/images/computer.png`,
      quantity: 24,
      isActive: false,
    },
    {
      id: "1001",
      nameTh: "คอมพิวเตอร์",
      nameEn: "Computer",
      image: `src/assets/images/phone.png`,
      quantity: 240,
      isActive: true,
    },
  ]);

  return { 
    categorys,
   }
})