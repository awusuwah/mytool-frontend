<script setup lang="ts">
import { Button, FormalDropdown, FormalTextInput, IconButton, Table, TableRow, Tooltip } from "webcc-ui-components";

import PriceMatrixTableRow from "@/_offer/priceMatrix/PriceMatrixTableRow.vue";

const { t } = useI18n();
const { $toast } = useNuxtApp();
const { convertCreatingOfferToApiFormat, convertPriceToApiFormat } = useOfferCreation();
const creatingStore = useCreatingStore();

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

  // All the years which can be selected from in the dropdown
  years: {
    type: Array as PropType<ValueLabel[]>,
    default: () => [],
  },

  // The year which is currently being viewed
  selectedYear: {
    type: Object as PropType<ValueLabel>,
    default: () => ({ label: "", value: "" }),
  },

  // Whether the price matrix is being used in the offer creation flow or not
  creating: {
    type: Boolean,
    default: true,
  },
});

const showWeeklyPrices = ref(false);
const loadingPrices = ref<number[]>([]);
const selectedPrices = ref<Price[]>([]);
const lastSelectedPrice = ref<Price>();
const priceData = ref<Price[]>([]);

const multiModify = ref(0);
const multiModifyOpen = ref(false);

const emit = defineEmits(["update:selectedYear"]);

/**
 * Clamp the prices down to the selected year.
 */
const pricesForSelectedYear = computed(() => {
  return priceData.value.filter((price) => price.year === Number(props.selectedYear.value));
});

/**
 * Determine what type of rent is being used based on the contract type.
 */
const rentType = computed(() => {
  const contractType = creatingStore.getCreatingOffer.contractType.value;

  if (contractType === "B" || contractType === "N") return "purchase";
  return "sales";
});

/**
 * The columns for the price matrix table.
 */
const columns = computed(() => [
  { key: "year", label: "", responsive: "lg", class: "lg:w-0" },
  { key: "duration", label: t("components.priceMatrix.table.duration"), responsive: "sm", class: "md:w-24" },
  { key: "season", label: t("components.priceMatrix.table.season"), class: "w-44 sm:w-72 md:w-56 lg:w-auto" },
  { key: "margin", label: t("components.priceMatrix.table.margin"), responsive: "lg" },
  {
    key: "purchaseSmart",
    label: t("components.priceMatrix.table.purchaseSmart"),
    tooltip: t("components.priceMatrix.table.tooltips.smart"),
    responsive: "lg",
  },
  {
    key: "salesSmart",
    label: t("components.priceMatrix.table.salesSmart"),
    tooltip: t("components.priceMatrix.table.tooltips.smart"),
    responsive: "lg",
  },
  {
    key: "purchaseRent",
    label: showWeeklyPrices ? t("components.priceMatrix.table.purchaseRent") : t("components.priceMatrix.table.purchaseRentWeekly"),
    class: { "w-28": rentType.value === "sales", "w-40": rentType.value === "purchase", "sm:w-48 lg:w-56": true },
  },
  {
    key: "salesRent",
    label: showWeeklyPrices ? t("components.priceMatrix.table.salesRent") : t("components.priceMatrix.table.salesRentWeekly"),
    class: { "w-28": rentType.value === "purchase", "w-40": rentType.value === "sales", "sm:w-48 lg:w-56": true },
  },
]);

/**
 * Updates multiple prices using the "multi modify" modal.
 *
 * @param { }
 */
const updatePriceWithMultiModify = async () => {
  const mutatedPrices = selectedPrices.value.map((price) => {
    loadingPrices.value.push(price.period);
    return convertPriceToApiFormat(price, multiModify.value.toString(), showWeeklyPrices.value ? "weekly" : "daily", rentType.value);
  });

  // Prepare the requestbody for the API
  let requestBody: ApiOfferStructure | any = {};

  if (props.creating) {
    // Offer Creation
    const creatingOffer = creatingStore.getCreatingOffer;
    requestBody = {
      ...convertCreatingOfferToApiFormat(creatingOffer),
      prices: mutatedPrices,
    };
  } else {
    // TODO: Offer Edit
  }

  try {
    const response: any = await useOfferDataRecalc(requestBody);
    if (!response) return;

    // Update the prices in the table with the new values
    priceData.value = priceData.value.map((p) => {
      const newPrice = response.find((newPrice: Price) => newPrice.period === p.period);
      if (newPrice) return newPrice;
      return p;
    });

    // Reset the error and loading state of the changed prices
    response.forEach((p: Price) => {
      loadingPrices.value = loadingPrices.value.filter((loadingPrice) => loadingPrice !== p.period);
      // TODO: Reset the error state

      // TODO: Update the offer in the store
    });
  } catch (error: any) {
    // Clear the error and loading state of the changed prices
    selectedPrices.value.forEach((price) => {
      loadingPrices.value = loadingPrices.value.filter((loadingPrice) => loadingPrice !== price.period);
      // TOOD: Reset the error state
    });

    console.error("[MyTool Error] An error occured while recalculating the prices.", error);
    $toast.error(t("components.priceMatrix.table.toasts.updatePricesError"));
  } finally {
    clearSelected();
  }
};

/**
 * Updates a single price from the offer.
 *
 * @param { Number | String } price - The new price value.
 * @param { Number } period - The period of the price which got updated.
 */
const updatePrice = async (price: string, period: number) => {
  const matchingPrice = priceData.value?.find((p) => p.period === period);
  if (!matchingPrice) return;

  const mutatedPrice = convertPriceToApiFormat(matchingPrice, price, showWeeklyPrices.value ? "weekly" : "daily", rentType.value);
  loadingPrices.value.push(period);

  // Prepare the requestbody for the API
  let requestBody: ApiOfferStructure | any = {};

  if (props.creating) {
    // Offer Creation
    const creatingOffer = creatingStore.getCreatingOffer;
    requestBody = {
      ...convertCreatingOfferToApiFormat(creatingOffer),
      prices: [mutatedPrice],
    };
  } else {
    // TODO: Offer Edit
  }

  try {
    const response: any = await useOfferDataRecalc(requestBody);
    if (!response) return;

    const newPrice = response[0];

    // Update the price in the table with the new values
    priceData.value = priceData.value.map((p) => {
      if (p.period === period) return newPrice;
      return p;
    });

    // Reset the error and loading state of the changed price
    loadingPrices.value = loadingPrices.value.filter((p) => p !== period);
    // TODO: Reset the error state

    // TODO: Update the offer in the store
  } catch (error: any) {
    // Clear the error and loading state of the changed price
    loadingPrices.value = loadingPrices.value.filter((p) => p !== period);
    // TOOD: Reset the error state

    console.error("[MyTool Error] An error occured while recalculating the price.", error);
    $toast.error(t("components.priceMatrix.table.toasts.updatePriceError"));
  }
};

/**
 * Select a single date in the price matrix. If the date is already selected, it will be unselected.
 *
 * @param { Price } price - The price which got selected.
 * @param { MouseEvent } event - The event which triggered this function.
 */
const selectDate = (price: Price, event: MouseEvent): void => {
  // If the date is already selected, unselect it
  if (selectedPrices.value.find((p) => p.period === price.period)) {
    selectedPrices.value = selectedPrices.value.filter((p) => p.period !== price.period);
    return;
  }

  // Otherwise, add the date to the list
  selectedPrices.value.push(price);
  lastSelectedPrice.value = price;

  // Open the multi modify modal
  multiModifyOpen.value = true;
  const multiModifyModal = document.getElementById("multiModify");

  if (multiModifyModal) {
    multiModifyModal.style.top = `${event.clientY}px`;
    multiModifyModal.style.left = `${event.clientX + 30}px`;
    multiModifyModal.focus();
  }
};

/**
 * Select multiple dates in the price matrix.
 *
 * @param { Price } price - The price which got selected.
 * @param { MouseEvent } event - The event which triggered this function.
 */
const selectDateShift = (price: Price, event: MouseEvent): void => {
  // If no price has been selected prior to this one, select the date
  if (!selectedPrices.value.length ?? 0 > 0) {
    selectDate(price, event);
    return;
  }

  // Otherwise, select all prices between the first and second price
  const firstPrice = lastSelectedPrice.value;
  const secondPrice = price;

  // Get the index of the first and second price & get all dates between them
  const firstPriceIndex = priceData.value.findIndex((p) => p.period === firstPrice?.period);
  const secondPriceIndex = priceData.value.findIndex((p) => p.period === secondPrice.period);
  const pricesBetween = priceData.value.slice(firstPriceIndex, secondPriceIndex + 1);

  // Add the prices to the list of selected prices
  selectedPrices.value = [...pricesBetween];

  // Open the multi modify modal
  multiModifyOpen.value = true;
  const multiModifyModal = document.getElementById("multiModify");

  if (multiModifyModal) {
    multiModifyModal.style.top = `${event.clientY}px`;
    multiModifyModal.style.left = `${event.clientX + 30}px`;
    multiModifyModal.focus();
  }
};

/**
 * Check if the provided price period is loading.
 *
 * @param { Number } period - The price period to check.
 */
const checkLoading = (period: number): boolean => {
  return loadingPrices.value.includes(period);
};

/**
 * Check if the provided price period is selected.
 *
 * @param { Number } period - The price period to check.
 */
const checkSelected = (period: number): boolean => {
  return selectedPrices.value.find((p) => p.period === period) !== undefined ? true : false;
};

/**
 * Clear the selected prices & close the mass modify modal.
 */
const clearSelected = (): void => {
  multiModifyOpen.value = false;
  selectedPrices.value = [];
};

/**
 * Watch for changes in the loading state of the prices and set the price data accordingly.
 */
watch(
  () => props.loading,
  (newLoading, oldLoading) => {
    console.log("Watcher: ", newLoading, oldLoading);
    if (newLoading === false && oldLoading === true) {
      priceData.value = props.prices?.prices || [];
    }
  }
);
</script>

<template>
  <Table :data="pricesForSelectedYear || []" :columns="columns" cell-padding="compact" class="@container/priceMatrix" stickyheader>
    <template #toolbar>
      <div class="flex justify-between gap-x-4 w-full">
        <div class="flex gap-2">
          <FormalDropdown
            :model-value="selectedYear"
            :label="t('components.priceMatrix.table.toolbar.selectedYear.label')"
            :options="years"
            :clearable="false"
            :disabled="years.length <= 1"
            @update:model-value="emit('update:selectedYear', $event)"
          />
        </div>

        <div class="grid place-items-end place-content-start"></div>
      </div>
    </template>

    <template v-if="!loading" #tbody="{ filteredData }">
      <PriceMatrixTableRow
        v-for="price in filteredData"
        :columns="columns"
        :price="price"
        :price-type="showWeeklyPrices ? 'weekly' : 'daily'"
        :rent-type="rentType"
        :marked="checkSelected(price.period)"
        :loading="checkLoading(price.period)"
        @update:price="updatePrice"
        @marked:normal="(price, event) => selectDate(price, event)"
        @marked:shift="(price, event) => selectDateShift(price, event)"
      />
    </template>

    <template v-if="loading" #tfoot>
      <tfoot class="bg-bgr">
        <tr v-for="i in 10" :key="i" class="h-16">
          <td colspan="7" class="px-4 py-2">
            <div class="w-full h-9 bg-bgr-700 animate-pulse rounded-md"></div>
          </td>
        </tr>
      </tfoot>
    </template>

    <template v-if="loading" #nofound>
      <div></div>
    </template>
  </Table>

  <Teleport to="body">
    <Transition name="fade-in" appear>
      <div v-show="multiModifyOpen" id="multiModify" class="fixed menu z-50 p-2 bg-bgr border border-bgr-300 shadow-xl rounded">
        <header class="flex flex-row justify-between">
          <h3 class="text-lg font-semibold text-txt">
            {{ $t("components.priceMatrix.table.multiModify.title", { count: selectedPrices.length }) }}
          </h3>

          <IconButton variant="neutral" type="button" icon="close" @click="clearSelected" />
        </header>

        <div class="flex items-center mt-2 gap-x-2">
          <FormalTextInput id="massModifyInput" v-model="multiModify" type="number" text-align="right" />
          <Button variant="cta" size="sm" @click="updatePriceWithMultiModify">
            {{ $t("components.priceMatrix.table.multiModify.apply") }}
          </Button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
