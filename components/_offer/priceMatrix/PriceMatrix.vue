<script setup lang="ts">
import { Card, FormalDropdown, Heading } from "webcc-ui-components";

import PriceMatrixTable from "@/_offer/priceMatrix/PriceMatrixTable.vue";
import PriceMatrixTurnover from "@/_offer/priceMatrix/PriceMatrixTurnover.vue";

const { t } = useI18n();
const { $toast } = useNuxtApp();
const appStore = useAppStore();
const creatingStore = useCreatingStore();
const { convertCreatingOfferToApiFormat } = useOfferCreation();

const selectedYear = ref<ValueLabel>();

const props = defineProps({
  // The prices which have been fetched from the API. This is only used in the offer creation flow
  prices: {
    type: Object as PropType<OfferDataPricesResponse | null>,
    default: null,
  },

  // Whether the component is loading or not.
  loading: {
    type: Boolean,
    default: false,
  },

  // Whether the component is in the creation flow or not.
  creating: {
    type: Boolean,
    default: true,
  },
});

/**
 * Get all the possible years from the prices.
 */
const allYears = computed(() => {
  if (!props.prices) return [];

  const years: ValueLabel[] = [];

  // Loop over all the prices and get the years
  props.prices?.prices.forEach((price) => {
    if (!years.find((year) => year.value === price.year.toString())) {
      years.push({
        label: price.year.toString(),
        value: price.year.toString(),
      });
    }
  });

  selectedYear.value = years[0];

  return years;
});

/**
 * Refresh the turnover data. This will refetch the turnovers using the prices from the matrix.
 */
const refreshTurnover = async () => {
  if (props.creating) {
    await refreshTurnoverInOfferCreation();
    return;
  }

  await refreshTurnoverInOfferEdit();
};

const refreshTurnoverInOfferCreation = async () => {
  const creatingOffer = creatingStore.getCreatingOffer;
  if (!creatingOffer) return;

  try {
    const requestBody = {
      ...convertCreatingOfferToApiFormat(creatingOffer),
      prices: [...creatingOffer.prices],
    };

    const response = await useOfferDataTurnovers(requestBody);
    if (!response) return;

    creatingStore.setCreatingOfferTurnovers(response);
  } catch (error: any) {
    console.error("[MyTool Error] An error occured while refreshing the turnover.", error);
    $toast.error(t("components.priceMatrix.turnover.toasts.refreshTurnoverError"));
  }
};

const refreshTurnoverInOfferEdit = async () => {};
</script>

<template>
  <div>
    <Heading appearance="title3" render-as="h2" class="mb-2">
      {{ t("components.priceMatrix.title") }}
    </Heading>

    <section class="mb-52">
      <PriceMatrixTable
        :prices="prices"
        :loading="loading"
        :years="allYears"
        :selected-year="selectedYear"
        @update:selectedYear="(newYear) => (selectedYear = newYear)"
      />
    </section>

    <section
      class="fixed bottom-0 left-0 right-0 z-40 px-3 transition-all"
      :class="{ 'md:left-16': !appStore.getSidebarOpen, 'md:left-72': appStore.getSidebarOpen }"
    >
      <div class="h-6 bg-gradient-to-t from-bgr-100 via-bgr-100"></div>
      <div class="w-full flex flex-col gap-3 bg-bgr-100 pb-3 md:flex-row">
        <PriceMatrixTurnover
          :turnovers="prices?.turnovers"
          :loading="loading"
          :selected-year="selectedYear"
          @refresh:turnovers="refreshTurnover"
        />

        <Card class="w-full md:w-1/3 flex flex-row md:flex-col justify-between gap-2"></Card>
      </div>
    </section>
  </div>
</template>
