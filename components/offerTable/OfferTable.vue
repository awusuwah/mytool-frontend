<template>
  <Table :data="offers ?? []" :columns="columns" :no-matches-found-text="t('components.offerTable.noOffersFound')">
    <template #toolbar>
      <div class="w-full flex justify-end">
        <Button variant="cta" :label="t('components.offerTable.createOffer')" @click="navigateTo('/offers/create/')" />
      </div>
    </template>

    <template v-if="!isLoading" #tbody="{ filteredData }">
      <TableRow
        v-for="(offer, index) in filteredData"
        :entry="offer"
        :columns="columns"
        class="cursor-pointer"
        hoverable
        @click="navigateTo(`/offers/${offer.id}`)"
      >
        <template #supplier>
          <div class="absolute top-0 left-0 flex gap-x-1">
            <Badge :variant="getStatusColor(offer.status)" compact>
              {{ getStatusText(offer.status) }}
            </Badge>
            <Badge v-if="isPseudo(offer)" variant="neutral" compact>PSEUDO</Badge>
          </div>
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
          {{ formatDate(offer.creationDate) }}
        </template>

        <template #sendDate>
          {{ formatDate(offer.sendOutDate) }}
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

    <template v-if="isLoading" #tfoot>
      <tfoot class="bg-bgr">
        <tr v-for="i in 10" :key="i" class="h-16">
          <td colspan="9" class="px-4 py-2">
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
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { Badge, Button, IconButton, Table, TableRow, Tooltip } from "webcc-ui-components";

import CodeNameDisplay from "@/codeNameDisplay/CodeNameDisplay.vue";

const { t } = useI18n();
const { formatDate } = useDateUtils();
const { getStatusColor, getStatusText } = useOfferUtils();

const offers = ref<OfferListResponse>([]);
const isLoading = ref(false);

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

/**
 * Fetch the offers from the API and manage the loading state.
 */
const fetchOffers = async () => {
  isLoading.value = true;
  offers.value = (await useOfferList({ bo: "FR075" })) ?? [];
  isLoading.value = false;
};

/**
 * Check if the offer is pseudo.
 */
const isPseudo = (offer: OfferShort) => {
  // if the offer.accom.code starts with three letters before the first number, the offer is pseudo
  const pseudoRegex = /^([a-zA-Z]{3})\d+/;
  return pseudoRegex.test(offer.accom.code);
};

onBeforeMount(async () => {
  await fetchOffers();
});
</script>
