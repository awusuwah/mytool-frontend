<template>
  <Card class="flex flex-col gap-y-2">
    <Heading appearance="title4" render-as="h3" class="flex justify-between">
      {{ t("components.accommodationCard.title") }}
      <IconButton icon="edit" @click="openEditModal" />
    </Heading>

    <DataDisplayGrid class="text-txt">
      <!-- Internal Name -->
      <DataDisplay
        :label="t('components.accommodationCard.labels.internalName')"
        :value="accommodation?.name"
        :is-loading="isLoading"
        class="@lg/datagrid:col-span-2"
      />

      <!-- Accommodation Type -->
      <DataDisplay :label="t('components.accommodationCard.labels.accoType')" :value="accommodation?.type.label" :is-loading="isLoading" />

      <!-- Accommodation Code -->
      <DataDisplay :label="t('components.accommodationCard.labels.accoCode')" :is-loading="isLoading">
        <output class="text-base leading-tight">{{ accommodation?.code }}</output>
      </DataDisplay>

      <!-- Location -->
      <DataDisplay :label="t('components.accommodationCard.labels.location')" :is-loading="isLoading" class="@lg/datagrid:col-span-2">
        <output class="flex flex-row flex-wrap items-center gap-x-2">
          <Icon :graphic="accommodation?.country.code.toLowerCase()" class="w-4 h-4 flex-shrink-0" />
          <span>{{ accommodation?.country.name }}</span>

          <Icon graphic="arrow-right" class="text-txt-400 w-4 h-4 flex-shrink-0" />
          <span>{{ accommodation?.region.name }}</span>

          <Icon graphic="arrow-right" class="text-txt-400 w-4 h-4 flex-shrink-0" />
          <span>{{ accommodation?.place?.name }}</span>
        </output>
      </DataDisplay>

      <!-- Postal Address -->
      <DataDisplay
        :label="t('components.accommodationCard.labels.postalAddress')"
        value="TBD"
        :is-loading="isLoading"
        class="@lg/datagrid:col-span-2"
      />

      <!-- Pax, Rooms & Bedrooms -->
      <DataDisplay :label="t('components.accommodationCard.labels.pax')" :value="accommodation?.pax" :is-loading="isLoading" />
      <DataDisplay :label="t('components.accommodationCard.labels.rooms')" :value="accommodation?.rooms" :is-loading="isLoading" />
      <DataDisplay :label="t('components.accommodationCard.labels.bedrooms')" :value="accommodation?.bedrooms" :is-loading="isLoading" />
    </DataDisplayGrid>

    <!-- Edit Modal -->
    <Modal
      :title="t('components.accommodationCard.editModal.title', { internalName: accommodation?.name })"
      :open="editModalOpen"
      @close="closeEditModal"
    >
      <template #footer>
        <Button variant="neutral" :label="t('buttons.cancel')" @click="closeEditModal" />
        <Button variant="cta" :label="t('buttons.save')" @click="saveAccommodation" />
      </template>
    </Modal>
  </Card>
</template>

<script setup lang="ts">
import { Button, Card, Heading, Icon, IconButton, Modal } from "webcc-ui-components";

import DataDisplay from "@/dataDisplay/DataDisplay.vue";
import DataDisplayGrid from "@/dataDisplay/DataDisplayGrid.vue";

const { t } = useI18n();

const editModalOpen = ref(false);

defineProps({
  // The accommodation which is being displayed
  accommodation: {
    type: Object as PropType<OfferAccommodation>,
    default: null,
  },

  // Whether the accommodation is still loading
  isLoading: {
    type: Boolean,
    default: false,
  },
});

/**
 * Open the modal which allows the user to edit the accommodation.
 */
const openEditModal = () => {
  editModalOpen.value = true;
};

/**
 * Close the modal which allows the user to edit the accommodation.
 */
const closeEditModal = () => {
  editModalOpen.value = false;
};

/**
 * Save the updated accommodation.
 */
const saveAccommodation = () => {
  // TODO: Implement saving the accommodation
  console.warn("Saving the accommodation is not yet implemented!");
};
</script>
