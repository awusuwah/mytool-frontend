<template>
  <Table :data="suppliers" :columns="columns" :no-matches-found-text="t('components.supplierTable.noSuppliersFound')">
    <template #toolbar>
      <div class="w-full flex justify-end">
        <Button variant="cta" :label="t('components.supplierTable.createSupplier')" />
      </div>
    </template>

    <template v-if="!isLoading" #tbody="{ filteredData }">
      <TableRow
        v-for="(supplier, index) in filteredData"
        :entry="supplier"
        :columns="columns"
        class="cursor-pointer"
        hoverable
        @click="navigateTo(`/suppliers/${supplier.id}/`)"
      >
        <template #fullname>
          <CodeNameDisplay icon="user" :name="`${supplier.firstname} ${supplier.lastname}`" :code="supplier.id" />
        </template>

        <template #streetAndNr>
          {{ supplier.address.street }}
        </template>

        <template #zipAndPlace>
          {{ `${supplier.address.zip} ${supplier.address.place}` }}
        </template>

        <template #country>
          <div class="flex gap-x-2">
            <Icon :graphic="supplier.country.toLowerCase()" class="w-6 h-6" />
            {{ supplier.country }}
          </div>
        </template>

        <template #roles>
          <div class="flex gap-x-2">
            <Icon v-if="supplier.roles.includes('proprietor')" graphic="home" class="w-6 h-6" />
            <Icon v-if="supplier.roles.includes('keyholder')" graphic="key" class="w-6 h-6" />
          </div>
        </template>
      </TableRow>
    </template>

    <template v-if="isLoading" #tfoot>
      <tfoot class="bg-bgr">
        <tr v-for="i in 10" :key="i" class="h-16">
          <td colspan="7" class="px-4 py-2">
            <div class="w-full h-9 bg-bgr-700 animate-pulse rounded-md"></div>
          </td>
        </tr>
      </tfoot>
    </template>

    <template v-if="isLoading" #nofound>
      <div></div>
    </template>
  </Table>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { Button, Icon, Table, TableRow } from "webcc-ui-components";

import CodeNameDisplay from "@/codeNameDisplay/CodeNameDisplay.vue";

const { t } = useI18n();

const suppliers = ref<SupplierListResponse>([]);
const isLoading = ref(false);

/**
 * Columns which are displayed in the table.
 */
const columns = computed(() => [
  { key: "fullname", label: t("components.supplierTable.table.fullname") },
  { key: "streetAndNr", label: t("components.supplierTable.table.streetAndNr") },
  { key: "zipAndPlace", label: t("components.supplierTable.table.zipAndPlace") },
  { key: "country", label: t("components.supplierTable.table.country") },
  { key: "email", label: t("components.supplierTable.table.email") },
  { key: "roles", label: t("components.supplierTable.table.roles") },
  { key: "actions", label: t("components.supplierTable.table.actions") },
]);

/**
 * Fetch the suppliers from the API and manage the loading state.
 */
const fetchSuppliers = async () => {
  isLoading.value = true;
  suppliers.value = (await useSupplierList({ brand: "I", suppliercountry: "CH" })) ?? [];
  isLoading.value = false;
};

onBeforeMount(async () => {
  await fetchSuppliers();
});
</script>
