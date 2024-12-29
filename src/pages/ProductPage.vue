<script setup lang="ts">
import { Product } from "@/interfaces/product";
import BaseCardSmall from "@com/BaseCardSmall.vue";
import { FilterMatchMode } from "@primevue/core/api";
import {
  DataTable,
  IconField,
  InputIcon,
  Column,
  Button,
  Rating,
  Tag,
  InputText,
} from "primevue";
import { ref } from "vue";

/* const products = ref<Product[]>([
  {title: "แก้วเก็บความเย็น สเตนเลสแท้ ขนาด 600 มล.และ 890 มล. แบบฝาปกติและฝามีหูหิ้ว แถมหลอด", price: 3999, desc: "24 นิ้วเบิ่ม ๆ คือลือ", imgSrc: "https://img.advice.co.th/images_nas/pic_product4/A0163635/A0163635OK_BIG_1.jpg"},
  {title: "mouse", price: 1100, desc: "Logitech g306 wiress ลื่นๆ ", imgSrc: "https://img.advice.co.th/images_nas/pic_product4/A0129671/A0129671OK_BIG_1.jpg"}
]) */

const dt = ref();
const products = ref([
  {
    id: "1000",
    code: "PD-S1",
    name: "Bamboo Watch",
    description: "Product Description",
    image: "bamboo-watch.jpg",
    price: 65,
    category: "Accessories",
    quantity: 24,
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
  {
    id: "1001",
    code: "PD-S2",
    name: "Bamboo Watch",
    description: "Product Description",
    image: "bamboo-watch.jpg",
    price: 650,
    category: "Accessories",
    quantity: 240,
    inventoryStatus: "INSTOCK",
    rating: 4.6,
  },
]);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const submitted = ref(false);
const statuses = ref([
  { label: "INSTOCK", value: "instock" },
  { label: "LOWSTOCK", value: "lowstock" },
  { label: "OUTOFSTOCK", value: "outofstock" },
]);

const formatCurrency = (value) => {
  if (value)
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  return;
};

const editProduct = (prod) => {
  product.value = { ...prod };
  productDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
  product.value = prod;
  deleteProductDialog.value = true;
};

const exportCSV = () => {
  dt.value.exportCSV();
};

const getStatusLabel = (status) => {
  switch (status) {
    case "INSTOCK":
      return "success";

    case "LOWSTOCK":
      return "warn";

    case "OUTOFSTOCK":
      return "danger";

    default:
      return null;
  }
};
</script>
<template>
  <div class="content-container dark-mode-custom mt-4">
    <DataTable
      ref="dt"
      v-model:selection="selectedProducts"
      :value="products"
      dataKey="id"
      :paginator="true"
      :rows="10"
      :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[5, 10, 25]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
    >
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <h3 class="m-0">Manage Products</h3>
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText
              v-model="filters['global'].value"
              placeholder="ค้นหาา..."
            />
          </IconField>
        </div>
      </template>

      <Column
        selectionMode="multiple"
        style="width: 3rem"
        :exportable="false"
      ></Column>
      <Column
        field="code"
        header="Code"
        sortable
        style="min-width: 12rem"
      ></Column>
      <Column
        field="name"
        header="Name"
        sortable
        style="min-width: 16rem"
      ></Column>
      <Column header="Image">
        <template #body="slotProps">
          <img
            :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
            :alt="slotProps.data.image"
            class="rounded"
            style="width: 64px"
          />
        </template>
      </Column>
      <Column field="price" header="Price" sortable style="min-width: 8rem">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.price) }}
        </template>
      </Column>
      <Column
        field="category"
        header="Category"
        sortable
        style="min-width: 10rem"
      ></Column>
      <Column field="rating" header="Reviews" sortable style="min-width: 12rem">
        <template #body="slotProps">
          <Rating :modelValue="slotProps.data.rating" :readonly="true" />
        </template>
      </Column>
      <Column
        field="inventoryStatus"
        header="Status"
        sortable
        style="min-width: 12rem"
      >
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.inventoryStatus"
            :severity="getStatusLabel(slotProps.data.inventoryStatus)"
          />
        </template>
      </Column>
      <Column :exportable="false" style="min-width: 12rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            outlined
            rounded
            class="mr-2"
            @click="editProduct(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="confirmDeleteProduct(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style lang="scss" scoped></style>
