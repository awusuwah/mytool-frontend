<template>
  <Table :data="[]" :columns="columns" :no-matches-found-text="t('components.supplierTable.noSuppliersFound')">
    <template #toolbar>
      <div class="w-full flex justify-end">
        <Button variant="cta" :label="t('components.supplierTable.createSupplier')" />
      </div>
    </template>
  </Table>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { Button, Table } from "webcc-ui-components";

import useApi from "~/composables/useApi";
import { useAuthStore } from "~/stores/auth";

const { t } = useI18n();
const { $toast } = useNuxtApp();
const api = useApi();
const authStore = useAuthStore();
const fetch = useRequestFetch();

/**
 * Fetch the suppliers with the provided filters enabled.
 */
const fetchSuppliers = async () => {
  try {
    const suppliers = await fetch("/api/suppliers", { params: { brand: "I" } });
  } catch (error) {
    if (process.client) {
      $toast.error("Unable to fetch the suppliers");
    }
  }
};

const suppliers = await fetchSuppliers();

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
</script>
