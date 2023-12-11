<template>
  <Card class="flex flex-col gap-y-4">
    <div>
      <Heading appearance="title4" render-as="h3" class="flex justify-between">
        {{ t("components.servicesCard.title") }}
        <IconButton icon="edit" @click="openEditModal" />
      </Heading>

      <DataDisplayGrid class="text-txt">
        <DataDisplay :label="getService('FC')?.serviceText" :value="getService('FC')?.text || '---'" :is-loading="isLoading" />
        <DataDisplay :label="getService('LT')?.serviceText" :value="getService('LT')?.text || '---'" :is-loading="isLoading" />
        <DataDisplay :label="getService('LI')?.serviceText" :value="getService('LI')?.text || '---'" :is-loading="isLoading" />
        <DataDisplay :label="getService('PET')?.serviceText" :value="getService('PET')?.text || '---'" :is-loading="isLoading" />
        <DataDisplay :label="getService('COT')?.serviceText" :value="getService('COT')?.text || '---'" :is-loading="isLoading" />
        <DataDisplay :label="getService('WIFI')?.serviceText" :value="getService('WIFI')?.text || '---'" :is-loading="isLoading" />
        <DataDisplay
          :label="t('components.servicesCard.labels.other')"
          :value="getService('OEXC')?.text || '---'"
          :is-loading="isLoading"
        />
      </DataDisplayGrid>
    </div>

    <div>
      <Heading appearance="title5" render-as="h4">
        {{ t("components.servicesCard.titleFees") }}
      </Heading>

      <DataDisplayGrid class="text-txt">
        <DataDisplay
          :label="t('components.servicesCard.labels.administrationFees')"
          :value="gerance ? `${gerance}%` : '---'"
          :is-loading="isLoading"
        />
        <DataDisplay
          :label="t('components.servicesCard.labels.handlingFees')"
          :value="getService('HF')?.text || '---'"
          :is-loading="isLoading"
        />
        <DataDisplay
          :label="t('components.servicesCard.labels.otherFees')"
          :value="getService('OFEE')?.text || '---'"
          :is-loading="isLoading"
        />
      </DataDisplayGrid>
    </div>

    <!-- Edit Modal -->
    <Modal :title="t('components.servicesCard.editModal.title')" :open="editModalOpen" @close="closeEditModal">
      <template #footer>
        <Button variant="neutral" :label="t('buttons.cancel')" @click="closeEditModal" />
        <Button variant="cta" :label="t('buttons.save')" @click="saveServices" />
      </template>
    </Modal>
  </Card>
</template>

<script setup lang="ts">
import { Button, Card, Heading, IconButton, Modal } from "webcc-ui-components";

const { t } = useI18n();

const editModalOpen = ref(false);

const props = defineProps({
  // The services which are being displayed
  services: {
    type: Array as PropType<OfferService[]>,
    default: null,
  },

  // The gerance which is used for the administration fee
  gerance: {
    type: Number,
    default: null,
  },

  // Whether the services at still loading
  isLoading: {
    type: Boolean,
    default: false,
  },
});

/**
 * Get a specific service from the list of services by it's code.
 *
 * @param { String } serviceCode - The code of the service to get.
 */
const getService = (serviceCode: string) => {
  return props.services?.find((service) => service.code === serviceCode) ?? null;
};

/**
 * Open the modal which allows the user to edit the services.
 */
const openEditModal = () => {
  editModalOpen.value = true;
};

/**
 * Close the modal which allows the user to edit the services.
 */
const closeEditModal = () => {
  editModalOpen.value = false;
};

/**
 * Save the updated services.
 */
const saveServices = () => {
  // TODO: Implement saving the services
  console.warn("Saving the services is not yet implemented!");
};
</script>
