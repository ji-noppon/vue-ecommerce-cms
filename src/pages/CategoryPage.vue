<script setup lang="ts">
import { Category } from "@/interfaces/modules/CategoryInterface";
import { FilterMatchMode } from "@primevue/core/api";
import { ref } from "vue";

const productTable = ref();
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
const category = ref<Category>();

const categoryDialog = ref(false);
const deleteCategoryDialog = ref(false);

const selectedCategory = ref();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const submitted = ref(false);

const srcImgModel = ref(null);

function onFileSelect(event) {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
        srcImgModel.value = e.target.result;
    };

    reader.readAsDataURL(file);
}

const openNew = () => {
  category.value = {};
  submitted.value = false;
  categoryDialog.value = true;
};

const hideDialog = () => {
  srcImgModel.value = null
  categoryDialog.value = false;
  submitted.value = false;
};

const editProduct = (prod) => {
  category.value = { ...prod };
  categoryDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
  category.value = prod;
  deleteCategoryDialog.value = true;
};

</script>
<template>
  <div class="content-container mt-4">
    <DataTable
      ref="productTable"
      v-model:selection="selectedCategory"
      :value="categorys"
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
          <h1 class="inline text-xl font-bold">Category Management</h1>
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
            :src="slotProps.data.image"
            :alt="slotProps.data.image"
            class="rounded"
            style="width: 64px"
          />
        </template>
      </Column>
      <Column
        field="isActive"
        header="Status"
        sortable
      >
        <template #body="slotProps">
          <ToggleSwitch v-model="slotProps.data.isActive" />
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
  <Dialog v-model:visible="categoryDialog" :style="{ width: '450px' }" header="Product Details" :modal="true">
    <div class="flex flex-col gap-6">
        <img v-if="category.image" :src="`https://primefaces.org/cdn/primevue/images/product/${category.image}`" :alt="category.image" class="block m-auto pb-4" />

        <div class="card flex flex-col items-center gap-6">
          <img v-if="srcImgModel" :src="srcImgModel" alt="Image" class="shadow-md rounded-xl w-full sm:w-64" />
          <FileUpload mode="basic" @select="onFileSelect" customUpload auto severity="secondary" class="p-button-outlined" />
        </div>

        <div>
          <label for="name" class="block font-bold mb-3">Name TH</label>
          <InputText id="name" v-model.trim="category.nameTh" required="true" autofocus :invalid="submitted && !category.nameTh" fluid />
          <small v-if="submitted && !category.nameTh" class="text-red-500">Name is required.</small>
        </div>

        <div>
          <label for="name" class="block font-bold mb-3">Name EN</label>
          <InputText id="name" v-model.trim="category.nameEn" required="true" autofocus :invalid="submitted && !category.nameEn" fluid />
          <small v-if="submitted && !category.nameEn" class="text-red-500">Name is required.</small>
        </div>
    </div>

    <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" @click="saveProduct" />
    </template>
  </Dialog>
</template>

<style lang="scss" scoped></style>
