<script setup lang="ts">
import { Button, Formal, FormalInput, FormalTextInput, Icon, Modal, Table, TableRow } from "webcc-ui-components";

import CodeNameDisplay from "@/codeNameDisplay/CodeNameDisplay.vue";
import CreatePseudoSupplierForm from "@/_supplier/create/CreatePseudoSupplierForm.vue";
import LoadingRing from "@/loading/LoadingRing.vue";

const { t } = useI18n();

const modalOpen = ref(false);

const emit = defineEmits(["selected"]);

const props = defineProps({
  // Determine whether the input should be marked as invalid
  invalid: {
    type: Boolean,
    default: false,
  },

  // Determine whether the input should be marked as disabled
  disabled: {
    type: Boolean,
    default: false,
  },

  // Determine whether the input should be marked as loading
  loading: {
    type: Boolean,
    default: false,
  },

  // The prefix icon displayed in the input
  prefixIcon: {
    type: String,
    default: null,
  },

  // The data value which has been selected in the modal
  buyingOffice: {
    type: [Object, String] as PropType<BuyingOffice | string>,
    default: null,
  },

  // All the buying office which can be selected from
  buyingOffices: {
    type: Array as PropType<BuyingOffice[]>,
    default: () => [],
  },
});

/**
 * Figure out what the value of the input should be based on the selected data.
 */
const inputValue = computed(() => {
  const buyingOffice = props.buyingOffice as BuyingOffice;

  if (buyingOffice) {
    return buyingOffice.name;
  }

  return props.loading ? t("inputs.buyingOffice.loading") : t("inputs.buyingOffice.placeholder");
});

const columns = computed(() => [
  { key: "id", label: t("components.selectBuyingOffice.modal.table.buyingOffice") },
  { key: "name", label: t("components.selectBuyingOffice.modal.table.name") },
  { key: "place", label: t("inputs.place.label") },
]);

/**
 * Open the modal to select a relation.
 */
const openModal = async () => {
  modalOpen.value = true;
};

/**
 * Close the modal to select a relation.
 */
const closeModal = () => {
  modalOpen.value = false;
};

/**
 * Select a buying office from the list.
 */
const selectBuyingOffice = (buyingOffice: BuyingOffice) => {
  closeModal();
  emit("selected", buyingOffice);
};
</script>

<template>
  <FormalTextInput
    :model-value="inputValue"
    :label="t('inputs.buyingOffice.label')"
    :prefix-icon="prefixIcon"
    :invalid="invalid"
    :error-message="t('inputs.buyingOffice.validation.required')"
    :loading="loading"
    :loading-text="t('inputs.buyingOffice.loading')"
    :disabled="disabled"
    type="button"
    class="w-full"
    @click="openModal"
    compact
  >
    <template #prefix>
      <LoadingRing v-if="loading" size="sm" class="self-center mx-2.5 text-thm" />
    </template>
  </FormalTextInput>

  <Modal :open="modalOpen" :title="t('components.selectPurchaser.modal.title')" position="stretch" @close="closeModal">
    <Table :columns="columns" :data="buyingOffices">
      <template #tbody="{ filteredData }">
        <TableRow
          v-for="buyingOffice in filteredData"
          :entry="buyingOffice"
          :columns="columns"
          class="cursor-pointer"
          @click="selectBuyingOffice(buyingOffice)"
          hoverable
        >
          <template #id>
            {{ buyingOffice.code }}
          </template>

          <template #name>
            {{ buyingOffice.name }}
          </template>

          <template #place>
            {{ buyingOffice.place }}
          </template>
        </TableRow>
      </template>
    </Table>

    <template #footer>
      <div class="flex justify-end gap-x-2">
        <Button variant="neutral" :label="t('buttons.cancel')" @click="closeModal" />
      </div>
    </template>
  </Modal>
</template>
