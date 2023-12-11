<template>
  <Card class="flex flex-col gap-y-2">
    <Heading appearance="title4" render-as="h3" class="flex justify-between">
      {{ t("components.relationsCard.title") }}
      <IconButton icon="edit" @click="openEditModal" />
    </Heading>

    <DataDisplayGrid class="text-txt">
      <!-- Supplier -->
      <DataDisplay :label="t('components.relationsCard.labels.supplier')" :is-loading="isLoading">
        <NuxtLink :to="`/suppliers/${supplier.id}`">{{ supplier?.address.firstname }} {{ supplier?.address.lastname }}</NuxtLink>
      </DataDisplay>

      <!-- Purchaser -->
      <DataDisplay :label="t('components.relationsCard.labels.purchaser')" :value="purchaser?.label" :is-loading="isLoading" />
      <DataDisplay :label="t('components.relationsCard.labels.buyingOffice')" :value="buyingOffice?.label" :is-loading="isLoading" />
    </DataDisplayGrid>

    <!-- Edit Modal -->
    <Modal :title="t('components.relationsCard.editModal.title')" :open="editModalOpen" @close="closeEditModal">
      <template #footer>
        <Button variant="neutral" :label="t('buttons.cancel')" @click="closeEditModal" />
        <Button variant="cta" :label="t('buttons.save')" @click="saveRelations" />
      </template>
    </Modal>
  </Card>
</template>

<script setup lang="ts">
import { Button, Card, Heading, IconButton, Modal } from "webcc-ui-components";

import DataDisplay from "@/dataDisplay/DataDisplay.vue";
import DataDisplayGrid from "@/dataDisplay/DataDisplayGrid.vue";

const { t } = useI18n();

const editModalOpen = ref(false);

defineProps({
  // The supplier which is being displayed
  supplier: {
    type: Object as PropType<Supplier>,
    default: null,
  },

  // The purchaser which is being displayed
  purchaser: {
    type: Object as PropType<ValueLabel>,
    default: null,
  },

  // The buying office which is being displayed
  buyingOffice: {
    type: Object as PropType<ValueLabel>,
    default: null,
  },

  // Whether the data is still loading
  isLoading: {
    type: Boolean,
    default: false,
  },
});

/**
 * Open the modal which allows the user to edit the relations.
 */
const openEditModal = () => {
  editModalOpen.value = true;
};

/**
 * Close the modal which allows the user to edit the relations.
 */
const closeEditModal = () => {
  editModalOpen.value = false;
};

/**
 * Save the updated relations.
 */
const saveRelations = () => {
  // TODO: Implement saving relations
  console.warn("Saving relations is not yet implemented!");
};
</script>
