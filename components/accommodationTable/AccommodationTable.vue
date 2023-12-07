<template>
  <Table :data="[]" :columns="columns" :no-matches-found-text="t('components.accommodationTable.noAccommodationsFound')">
    <template #toolbar>
      <div class="w-full flex justify-end">
        <Button variant="cta" :label="t('components.accommodationTable.createAccommodation')" disabled />
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

/**
 * Fetch the accommodations with the provided filters enabled.
 */
const fetchAccommodations = async () => {
  try {
    const accommodations = await api.get("/accommodations");
  } catch (error) {
    if (process.client) {
      $toast.error("Unable to fetch the accommodations");
    }
  }
};

const offers = await fetchAccommodations();

/**
 * Columns which are displayed in the table.
 */
const columns = computed(() => [
  { key: "accoName", label: t("components.accommodationTable.table.accoName") },
  { key: "country", label: t("components.accommodationTable.table.country") },
  { key: "region", label: t("components.accommodationTable.table.region") },
  { key: "streetAndNr", label: t("components.accommodationTable.table.streetAndNr") },
  { key: "zipAndPlace", label: t("components.accommodationTable.table.zipAndPlace") },
  { key: "actions", label: t("components.accommodationTable.table.actions") },
]);
</script>
