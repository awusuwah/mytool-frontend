<template>
  <Card class="flex flex-col gap-y-2">
    <Heading appearance="title4" render-as="h3"> {{ t("components.conditionsCard.title") }} </Heading>

    <DataDisplayGrid class="text-txt">
      <!-- Contract Years -->
      <DataDisplay :label="t('components.conditionsCard.labels.contractYears')" :value="contractYears" :is-loading="isLoading" />

      <!-- Start- & End Date -->
      <DataDisplay :label="t('components.conditionsCard.labels.startDate')" :value="formatDate(contract?.start)" :is-loading="isLoading" />
      <DataDisplay
        :label="t('components.conditionsCard.labels.endDate')"
        :value="formatDate(contract?.end)"
        :is-loading="isLoading"
        class="@lg/datagrid:col-span-2"
      />

      <!-- Contract Type -->
      <DataDisplay :label="t('components.conditionsCard.labels.contractType')" :value="contract?.type.label" :is-loading="isLoading" />

      <!-- Season Model -->
      <DataDisplay
        :label="t('components.conditionsCard.labels.seasonModel')"
        :value="contract?.seasonmodel.label"
        :is-loading="isLoading"
      />

      <!-- Margin OR Calculation Class -->
      <DataDisplay
        v-if="contract?.type.value === 'B' || contract?.type.value === 'N'"
        :label="t('components.conditionsCard.labels.calculationClass')"
        :value="contract?.calculationClass?.label"
        :is-loading="isLoading"
      />
      <DataDisplay
        v-if="contract?.type.value === 'BC' || contract?.type.value === 'S'"
        :label="t('components.conditionsCard.labels.margin')"
        :value="`${contract?.margin}%`"
        :is-loading="isLoading"
      />
    </DataDisplayGrid>
  </Card>
</template>

<script setup lang="ts">
import { Card, Heading } from "webcc-ui-components";

import DataDisplay from "@/dataDisplay/DataDisplay.vue";
import DataDisplayGrid from "@/dataDisplay/DataDisplayGrid.vue";

const { t } = useI18n();
const { formatDate } = useDateUtils();

const props = defineProps({
  // The contract which is being displayed
  contract: {
    type: Object as PropType<OfferContract>,
    default: null,
  },

  // Whether the contrast is still loading
  isLoading: {
    type: Boolean,
    default: false,
  },
});

/**
 * Calculate the contract years based on the contract start date and the contract duration. The output
 * is formatted as a string (e.g. "2021 - 2022").
 */
const contractYears = computed(() => {
  const from = new Date(props.contract?.start).getFullYear();
  const to = from + props.contract?.length - 1;

  // If the from and to year are the same, only return one year
  return from === to ? from : `${from} - ${to}`;
});
</script>
