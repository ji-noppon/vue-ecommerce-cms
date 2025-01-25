<script setup lang="ts">
import { Product } from "@/interfaces/modules/product";
import { FilterMatchMode } from "@primevue/core/api";
import { ref } from "vue";
import { useBaseModalStore } from '@/stores/CategoryStore'
import {
  DataTable,
  Dialog,
  IconField,
  InputIcon,
  Column,
  Button,
  Rating,
  Tag,
  InputText,
  InputNumber,
  Textarea,
  Select,
  RadioButton,
  FileUpload,
} from "primevue";

const productTable = ref();
const products = ref<Product[]>([
  {
    id: "1000",
    code: "PD-S1",
    nameTh: "นาฟิกา",
    nameEn: "Bamboo Watch",
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
    nameTh: "นาฟิกา",
    nameEn: "Bamboo Watch",
    description: "Product Description",
    image: "bamboo-watch.jpg",
    price: 6500,
    category: "Accessories",
    quantity: 240,
    inventoryStatus: "INSTOCK",
    rating: 4.6,
  },
]);
const product = ref<Product>();

const productDialog = ref(false);
const deleteProductDialog = ref(false);

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

const srcImgModel = ref(null);

function onFileSelect(event) {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
        srcImgModel.value = e.target.result;
    };

    reader.readAsDataURL(file);
}

const formatCurrency = (value) => {
  if (value)
    return value.toLocaleString("th-TH", {
      style: "currency",
      currency: "THB",
    });
};

const openNew = () => {
  product.value = {};
  submitted.value = false;
  productDialog.value = true;
};

const hideDialog = () => {
  srcImgModel.value = null
  productDialog.value = false;
  submitted.value = false;
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
  productTable.value.exportCSV();
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
  <div class="content-container mt-4 product-container">
    <DataTable
      ref="productTable"
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
        <div class="flex">
          <h3 class="inline text-xl font-bold">Products Management</h3>
          <Button class="ml-auto mr-4" label="Create" @click="openNew" />
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
      ></Column>
      <Column
        field="nameTh"
        header="Name TH"
        sortable
      ></Column>
      <Column
        field="nameEn"
        header="Name EN"
        sortable
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
      <Column field="price" header="Price" sortable style="min-width: 6rem">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.price) }}
          <!-- {{ slotProps.data.price }} -->
        </template>
      </Column>
      <Column
        field="category"
        header="Category"
        sortable
      ></Column>
      <Column field="rating" header="Reviews" sortable>
        <template #body="slotProps">
          <Rating :modelValue="slotProps.data.rating" :readonly="true" />
        </template>
      </Column>
      <Column
        field="inventoryStatus"
        header="Status"
        sortable
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
  <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details" :modal="true">
    <div class="flex flex-col gap-6">
        <img v-if="product.image" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`" :alt="product.image" class="block m-auto pb-4" />

        <div class="card flex flex-col items-center gap-6">
          <img v-if="srcImgModel" :src="srcImgModel" alt="Image" class="shadow-md rounded-xl w-full sm:w-64" />
          <FileUpload mode="basic" @select="onFileSelect" customUpload auto severity="secondary" class="p-button-outlined" />
        </div>

        <div>
            <label for="name" class="block font-bold mb-3">Name Th</label>
            <InputText id="name" v-model.trim="product.nameTh" required="true" autofocus :invalid="submitted && !product.nameTh" fluid />
            <small v-if="submitted && !product.nameTh" class="text-red-500">Name is required.</small>
        </div>
        <div>
            <label for="name" class="block font-bold mb-3">Name En</label>
            <InputText id="name" v-model.trim="product.nameEn" required="true" autofocus :invalid="submitted && !product.nameEn" fluid />
            <small v-if="submitted && !product.nameEn" class="text-red-500">Name is required.</small>
        </div>

        <div>
            <label for="description" class="block font-bold mb-3">Description</label>
            <Textarea id="description" v-model.trim="product.description" required="true" rows="3" cols="20" fluid />
        </div>
        <div>
            <label for="inventoryStatus" class="block font-bold mb-3">Inventory Status</label>
            <Select id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status" fluid></Select>
        </div>

        <div>
            <span class="block font-bold mb-4">Category</span>
            <div class="grid grid-cols-12 gap-4">
                <div class="flex items-center gap-2 col-span-6">
                    <RadioButton id="category1" v-model="product.category" name="category" value="Accessories" />
                    <label for="category1">Accessories</label>
                </div>
                <div class="flex items-center gap-2 col-span-6">
                    <RadioButton id="category3" v-model="product.category" name="category" value="Laptops" />
                    <label for="category3">Laptops</label>
                </div>
                <div class="flex items-center gap-2 col-span-6">
                    <RadioButton id="category4" v-model="product.category" name="category" value="Computer" />
                    <label for="category4">Computer</label>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-6">
                <label for="price" class="block font-bold mb-3">Price</label>
                <InputNumber id="price" v-model="product.price" mode="decimal" locale="en-US" fluid />
            </div>
            <div class="col-span-6">
                <label for="quantity" class="block font-bold mb-3">Quantity</label>
                <InputNumber id="quantity" v-model="product.quantity" integeronly fluid />
            </div>
        </div>
    </div>

    <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" @click="saveProduct" />
    </template>
  </Dialog>
</template>

<style lang="scss" scoped>
 .product-container {
    overflow-x: auto;
    max-width: calc(100vw - 300px);
 }
</style>
