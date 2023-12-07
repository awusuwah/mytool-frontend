<template>
  <Table :data="[]" :columns="columns" :no-matches-found-text="t('components.offerTable.noOffersFound')">
    <template #toolbar>
      <div class="w-full flex justify-end">
        <Button variant="cta" :label="t('components.offerTable.createOffer')" />
      </div>
    </template>

    <template #tbody="{ filteredData }">
      <TableRow
        v-for="(offer, index) in filteredData"
        :entry="offer"
        :columns="columns"
        class="cursor-pointer"
        @click="navigateTo(`/offers/${offer.id}/`)"
      >
        <template #supplier>
          <CodeNameDisplay icon="user" :name="offer.supplier.label" :code="offer.supplier.code" />
        </template>

        <template #accommodation>
          <CodeNameDisplay icon="home" :name="offer.accom.label" :code="offer.accom.code" />
        </template>

        <template #place>
          {{ offer.place.label }}
        </template>

        <template #contractYears>
          {{ offer.contractYears.join(", ") }}
        </template>

        <template #contractDate>
          {{ offer.creationDate }}
        </template>

        <template #sendDate>
          {{ offer.sendOutDate }}
        </template>

        <template #document>
          <Tooltip>
            {{ offer.link ? t("components.offerTable.tooltips.viewDocument") : t("components.offerTable.tooltips.createDocument") }}

            <template #activator>
              <IconButton icon="file-pdf" :variant="offer.link ? 'neutral' : 'floating'" size="md" />
            </template>
          </Tooltip>
        </template>
      </TableRow>
    </template>
  </Table>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { Button, IconButton, Table, TableRow, Tooltip } from "webcc-ui-components";

import CodeNameDisplay from "@/codeNameDisplay/CodeNameDisplay.vue";
import useApi from "~/composables/useApi";
import { useAuthStore } from "~/stores/auth";

const { t } = useI18n();
const { $toast } = useNuxtApp();
const api = useApi();
const authStore = useAuthStore();
const fetch = useRequestFetch();

/**
 * Fetch the offers with the provided filters enabled
 */
const fetchOffers = async () => {
  try {
    const offers: OfferListResponse = await fetch("/api/offers", {
      params: { bo: "FR075" },
      headers: {
        Authorization: `Bearer ${authStore.getAccessToken}`,
      },
    });
  } catch (error) {
    if (process.client) {
      $toast.error("Unable to fetch the offers");
    }
  }
};

const offers = await fetchOffers();

// const offers = ref([
//   {
//     id: "DHAMdham",
//     status: "SENT",
//     supplier: {
//       code: "PFR10043",
//       label: "GUIRAUD Philip",
//     },
//     accom: {
//       code: "PFR6618.43",
//       label: "Le Fidji",
//     },
//     place: {
//       code: "06618",
//       label: "La Grande Motte",
//     },
//     country: "FR",
//     contractYears: [2024, 2025],
//     sendOutDate: "2023-11-21T08:51:41Z",
//     creationDate: "",
//     link: "",
//   },
//   {
//     id: "MHmZhFzQ",
//     status: "PENDING",
//     supplier: {
//       code: "PFR10044",
//       label: "Garcia olivier",
//     },
//     accom: {
//       code: "PFR6618.33",
//       label: "Le Birdy",
//     },
//     place: {
//       code: "06618",
//       label: "La Grande Motte",
//     },
//     country: "FR",
//     contractYears: [2024, 2025],
//     sendOutDate: "",
//     creationDate: "",
//     link: "",
//   },
//   {
//     id: "EeWHKwHh",
//     status: "REJECTED",
//     supplier: {
//       code: "PFR10060",
//       label: "FERRO Magali",
//     },
//     accom: {
//       code: "PFR6618.53",
//       label: "Marin'Land",
//     },
//     place: {
//       code: "06618",
//       label: "La Grande Motte",
//     },
//     country: "FR",
//     contractYears: [2024, 2025],
//     sendOutDate: "",
//     creationDate: "",
//     link: "",
//   },
//   {
//     id: "DdvVnNGg",
//     status: "PENDING",
//     supplier: {
//       code: "PFR10072",
//       label: "Adam Viviane \u0026 Jean Pierre",
//     },
//     accom: {
//       code: "PFR6618.63",
//       label: "Cap Sud",
//     },
//     place: {
//       code: "06618",
//       label: "La Grande Motte",
//     },
//     country: "FR",
//     contractYears: [2024, 2025],
//     sendOutDate: "",
//     creationDate: "",
//     link: "",
//   },
// ]);

/**
 * Columns which are displayed in the table.
 */
const columns = computed(() => [
  { key: "supplier", label: t("components.offerTable.table.supplier") },
  { key: "accommodation", label: t("components.offerTable.table.accommodation") },
  { key: "place", label: t("components.offerTable.table.place") },
  { key: "contractYears", label: t("components.offerTable.table.contractYears"), responsive: "xl" },
  { key: "contractDate", label: t("components.offerTable.table.contractDate"), sortable: true, responsive: "xl" },
  { key: "sendDate", label: t("components.offerTable.table.sendDate"), sortable: true, responsive: "xl" },
  { key: "document", label: t("components.offerTable.table.document"), responsive: "xl" },
  { key: "actions", label: t("components.offerTable.table.actions") },
]);
</script>
