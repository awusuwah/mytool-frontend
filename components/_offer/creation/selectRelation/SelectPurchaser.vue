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
  purchaser: {
    type: [Object, String] as PropType<BuyingOffice | string>,
    default: null,
  },

  // All the purchasers which can be selected from
  purchasers: {
    type: Array as PropType<BuyingOffice[]>,
    default: () => [],
  },
});

/**
 * Figure out what the value of the input should be based on the selected data.
 */
const inputValue = computed(() => {
  const purchaser = props.purchaser as BuyingOffice;

  if (purchaser) {
    return purchaser.name;
  }

  return props.loading ? t("inputs.purchaser.loading") : t("inputs.purchaser.placeholder");
});

const columns = computed(() => [
  { key: "id", label: t("components.selectPurchaser.modal.table.purchaser") },
  { key: "name", label: t("components.selectPurchaser.modal.table.name") },
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
 * Select a purchaser from the list.
 */
const selectPurchaser = (purchaser: BuyingOffice) => {
  closeModal();
  emit("selected", purchaser);
};
</script>

<template>
  <FormalTextInput
    :model-value="inputValue"
    :label="t('inputs.purchaser.label')"
    :prefix-icon="prefixIcon"
    :invalid="invalid"
    :error-message="t('inputs.purchaser.validation.required')"
    :loading="loading"
    :loading-text="t('inputs.purchaser.loading')"
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
    <Table :columns="columns" :data="purchasers">
      <template #tbody="{ filteredData }">
        <TableRow
          v-for="purchaser in filteredData"
          :entry="purchaser"
          :columns="columns"
          class="cursor-pointer"
          @click="selectPurchaser(purchaser)"
          hoverable
        >
          <template #id>
            {{ purchaser.code }}
          </template>

          <template #name>
            {{ purchaser.name }}
          </template>

          <template #place>
            {{ purchaser.place }}
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
