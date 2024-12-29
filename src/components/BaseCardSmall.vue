<script setup lang="ts">
import { Product } from '@/interfaces/product'
import { ref } from 'vue'
import { Tag } from 'primevue';

  interface Props {
    product: Product
  }
  const props = defineProps<Props>()
  const date = ref()
</script>
<template>
  <div class="product-card">
    <img
      alt=""
      :src="props.product.imgSrc"
      class="max-w-[150px] rounded-md object-cover mx-auto"
    />
  
    <div class="mt-2">
      <div class="flex"><span class="font-medium">Name: </span><span class="ml-auto">{{ props.product.title }}</span> </div>
      <div class="flex"><span class="font-medium">Price: </span><span class="ml-auto">{{ props.product.price }}</span> </div>
      <div class="flex"><span class="font-medium">Category: </span><span class="ml-auto">สินค้า IT</span> </div>

      <Tag severity="success" value="Promotion"></Tag>
    </div>
  </div>
</template>

<style scoped>
  .product-card {
    @apply rounded-lg p-4 shadow-md shadow-blue-200;
  }
  :deep(.p-inputtext:enabled:focus) {
    border-color: blue !important;
  }
</style>
