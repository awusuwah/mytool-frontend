<template>
  <div class="flex flex-col">
    <Header
      :title="t('pages.supplierDetail.title', { fullname: `${supplier?.address.firstname} ${supplier?.address.lastname}` || '' })"
      icon="user"
      section="suppliers"
    />

    <main class="@container/main flex flex-col gap-2 p-4">
      <section class="grid grid-cols-1 gap-4 @7xl/main:grid-cols-2">
        <div class="flex flex-col gap-4">
          <SupplierToolbar :supplier="supplier" :is-loading="isLoading" />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import SupplierToolbar from "@/_supplier/supplierToolbar/SupplierToolbar.vue";
import Header from "@/header/Header.vue";

const { t } = useI18n();
const route = useRoute();

const supplier = ref<Supplier | undefined>(undefined);
const isLoading = ref(false);

/**
 * Fetch the supplier from the API and manage the loading state.
 */
const fetchSupplier = async () => {
  isLoading.value = true;
  supplier.value = await useSupplierDetail(route.params.id as string);
  isLoading.value = false;
};

onBeforeMount(async () => {
  await fetchSupplier();
});
</script>
