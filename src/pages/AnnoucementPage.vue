<script setup lang="ts">
import { Announcement } from "@/interfaces/modules/AnnouncementInterface";
import { FilterMatchMode } from "@primevue/core/api";
import { ref } from "vue";

const annoucementTable = ref();
const annoucements = ref<Announcement[]>([
  {
    id: "1000",
    order: 1,
    nameTh: "กูเกิ้ล",
    nameEn: "Google",
    image: `src/assets/images/computer.png`,
    url: "https://www.google.co.th/",
    isActive: false,
  },
  {
    id: "1001",
    order: 2,
    nameTh: "ยูทูป",
    nameEn: "Youtube",
    image: `src/assets/images/phone.png`,
    url: "https://www.youtube.com/",
    isActive: true,
  },
]);
const annoucement = ref<Announcement>();

const annoucementDialog = ref(false);
const deleteAnnoucementDialog = ref(false);

const selectedAnnoucement = ref();
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
  annoucement.value = {};
  submitted.value = false;
  annoucementDialog.value = true;
};

const hideDialog = () => {
  srcImgModel.value = null;
  annoucementDialog.value = false;
  submitted.value = false;
};

const editProduct = (prod) => {
  annoucement.value = { ...prod };
  annoucementDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
  annoucement.value = prod;
  deleteAnnoucementDialog.value = true;
};
const datetime24h = ref();
</script>
<template>
  <div class="content-container mt-4">
    <DataTable
      ref="annoucementTable"
      v-model:selection="selectedAnnoucement"
      :value="annoucements"
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
          <h1 class="inline text-xl font-bold">Announcement Management</h1>
          <DatePicker id="datepicker-24h" v-model="datetime24h" showTime hourFormat="24" fluid  selectionMode="range" />
          {{ datetime24h }}
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
      <Column field="order" header="Order" sortable></Column>
      <Column field="nameTh" header="Name TH" sortable></Column>
      <Column field="nameEn" header="Name EN" sortable></Column>
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
      <Column header="url">
        <template #body="slotProps">
          <a :href="slotProps.data.url">{{ slotProps.data.url }}</a>
        </template>
      </Column>
      <Column field="isActive" header="Status" sortable>
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
  <Dialog
    v-model:visible="annoucementDialog"
    :style="{ width: '450px' }"
    header="Product Details"
    :modal="true"
  >
    <div class="flex flex-col gap-6">
      <img
        v-if="annoucement.image"
        :src="`https://primefaces.org/cdn/primevue/images/product/${annoucement.image}`"
        :alt="annoucement.image"
        class="m-auto block pb-4"
      />

      <div class="card flex flex-col items-center gap-6">
        <img
          v-if="srcImgModel"
          :src="srcImgModel"
          alt="Image"
          class="w-full rounded-xl shadow-md sm:w-64"
        />
        <FileUpload
          mode="basic"
          @select="onFileSelect"
          customUpload
          auto
          severity="secondary"
          class="p-button-outlined"
        />
      </div>

      <div>
        <label for="name" class="mb-3 block font-bold">Name TH</label>
        <InputText
          id="name"
          v-model.trim="annoucement.nameTh"
          required="true"
          autofocus
          :invalid="submitted && !annoucement.nameTh"
          fluid
        />
        <small v-if="submitted && !annoucement.nameTh" class="text-red-500"
          >Name is required.</small
        >
      </div>

      <div>
        <label for="name" class="mb-3 block font-bold">Name EN</label>
        <InputText
          id="name"
          v-model.trim="annoucement.nameEn"
          required="true"
          autofocus
          :invalid="submitted && !annoucement.nameEn"
          fluid
        />
        <small v-if="submitted && !annoucement.nameEn" class="text-red-500"
          >Name is required.</small
        >
      </div>
    </div>

    <template #footer>
      <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
      <Button label="Save" icon="pi pi-check" @click="saveProduct" />
    </template>
  </Dialog>
</template>

<style lang="scss" scoped></style>
