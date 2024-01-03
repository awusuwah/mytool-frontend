<template>
  <Card class="flex flex-col gap-y-2">
    <Heading appearance="title4" render-as="h3" class="flex justify-between">
      {{ t("components.supplierCard.title") }}
      <IconButton icon="edit" @click="navigateTo(`/suppliers/${route.params.id}/contact`)" />
    </Heading>

    <DataDisplayGrid class="text-txt">
      <!-- Salutation -->
      <DataDisplay
        :label="t('inputs.salutation.label')"
        :value="getSalutationLabel(supplier?.address.salutation)"
        :is-loading="isLoading"
      />

      <!-- Fullname -->
      <DataDisplay
        :label="t('inputs.fullname.label')"
        :value="`${supplier?.address?.firstname} ${supplier?.address?.lastname}`"
        :is-loading="isLoading"
        class="@lg/datagrid:col-span-2"
      />

      <!-- Supplier Code -->
      <DataDisplay :label="t('inputs.supplierCode.label')" :value="supplier?.id" :is-loading="isLoading" />

      <!-- Country -->
      <DataDisplay :label="t('inputs.country.label')" :is-loading="isLoading">
        <output class="flex flex-row flex-wrap items-center gap-x-2">
          <Icon :graphic="supplier?.country.toLowerCase()" class="w-4 h-4 flex-shrink-0" />
          <span>{{ countryName }}</span>
        </output>
      </DataDisplay>

      <!-- Address -->
      <DataDisplay :label="t('inputs.address.label')" :is-loading="isLoading" class="@lg/datagrid:col-span-3">
        <output class="flex flex-row flex-wrap items-center gap-x-2">
          <Icon graphic="map-pin" class="w-4 h-4 flex-shrink-0" />
          <span>{{ fullAddress }}</span>
        </output>
      </DataDisplay>

      <hr class="@md/datagrid:col-span-4" />

      <!-- Languages -->
      <DataDisplay :label="t('inputs.languages.label')" :is-loading="isLoading" class="@lg/datagrid:col-span-4">
        <output class="flex flex-row flex-wrap items-center gap-x-2">
          <span class="font-semibold">{{ mainLanguage }}</span>
          <span v-if="additionalLanguages">+{{ additionalLanguages }}</span>
        </output>
      </DataDisplay>

      <!-- Email Address -->
      <DataDisplay
        :label="t('inputs.email.label')"
        :value="supplier?.emails?.find((email) => email.main)?.data ?? 'No Email Found'"
        :is-loading="isLoading"
        class="@lg/datagrid:col-span-2"
      />

      <!-- Phone Number -->
      <DataDisplay
        :label="t('inputs.phone.label')"
        :value="supplier?.phoneNumbers?.find((phone) => phone.main)?.data ?? 'No Phone Number Found'"
        :is-loading="isLoading"
        class="@lg/datagrid:col-span-2"
      />
    </DataDisplayGrid>
  </Card>
</template>

<script setup lang="ts">
import { Button, Card, Heading, Icon, IconButton } from "webcc-ui-components";

import DataDisplay from "@/dataDisplay/DataDisplay.vue";
import DataDisplayGrid from "@/dataDisplay/DataDisplayGrid.vue";

const { t } = useI18n();
const route = useRoute();
const { getSalutationLabel } = useUtils();

const props = defineProps({
  // The supplier which is being displayed
  supplier: {
    type: Object as PropType<Supplier>,
    default: null,
  },

  // Whether the supplier is still loading
  isLoading: {
    type: Boolean,
    default: false,
  },
});

/**
 * The name of the supplier's country.
 */
const countryName = computed(() => {
  const countries = useStaticStore().getCountries;
  if (!countries) return props.supplier?.country;

  return countries.find((country) => country.code === props.supplier?.country)?.name;
});

/**
 * The full address of the supplier.
 */
const fullAddress = computed(() => {
  return `${props.supplier?.address?.streetAndNumber}, ${props.supplier?.address?.zip}, ${props.supplier?.address?.place}`;
});

/**
 * The main language of the supplier.
 */
const mainLanguage = computed(() => {
  return props.supplier?.languages[0] || "No Main Language";
});

/**
 * The additional languages of the supplier.
 */
const additionalLanguages = computed(() => {
  return props.supplier?.languages.slice(1).join(", ");
});
</script>
