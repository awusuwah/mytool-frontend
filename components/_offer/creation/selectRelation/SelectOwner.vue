<script setup lang="ts">
import { Button, Formal, FormalInput, FormalTextInput, Icon, Modal, Table, TableRow } from "webcc-ui-components";
import CodeNameDisplay from "@/codeNameDisplay/CodeNameDisplay.vue";
import CreatePseudoSupplierForm from "@/_supplier/create/CreatePseudoSupplierForm.vue";
import LoadingRing from "@/loading/LoadingRing.vue";

const { t } = useI18n();
const { $toast } = useNuxtApp();

const { getCountryName } = useUtils();

const createPseudoSupplierFormRef = ref();

const modalOpen = ref(false);
const onChoosePage = ref(true);
const loadingOwners = ref(false);
const filterOwnersData = ref<FilterSupplierStructure>({
  supplierNumber: "",
  email: "",
  firstname: "",
  lastname: "",
});
const filteredOwners = ref<{ country: string; data: SupplierListResponse }>({
  country: "",
  data: [],
});

const emit = defineEmits(["selected"]);

const props = defineProps({
  // The country for which the suppliers will be fetched
  country: {
    type: String,
    default: "",
  },

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
  owner: {
    type: [Object, String] as PropType<SupplierShort | string>,
    default: null,
  },
});

/**
 * Figure out what the value of the input should be based on the selected data.
 */
const inputValue = computed(() => {
  const owner = props.owner as SupplierShort;

  if (owner) {
    return `${owner.firstname} ${owner.lastname} | ${owner.address.place}`;
  }

  return props.loading ? t("inputs.owner.loading") : t("inputs.owner.placeholder");
});

const columns = computed(() => [
  { key: "fullname", label: t("inputs.fullname.label") },
  { key: "country", label: t("inputs.country.label") },
  { key: "roles", label: t("inputs.roles.label") },
]);

/**
 * Open the modal to select a relation.
 */
const openModal = async () => {
  try {
    modalOpen.value = true;
    loadingOwners.value = true;

    // Fetch the suppliers if the country has changed
    if (filteredOwners.value.country !== props.country) {
      filteredOwners.value = {
        country: "",
        data: [],
      };
      const suppliers = await useSupplierList({
        brand: "I",
        suppliercountry: props.country.toUpperCase(),
      });

      filteredOwners.value = {
        country: props.country.toUpperCase(),
        data: suppliers ?? [],
      };
    }
  } catch (error: any) {
    console.error("[MyTool Error] Error while fetching the owners: ", error.message);
    $toast.error(t("components.supplierSelectModal.toast.fetchOwnersError"));
  } finally {
    loadingOwners.value = false;
  }
};

/**
 * Close the modal to select a relation.
 */
const closeModal = () => {
  modalOpen.value = false;
  onChoosePage.value = true;
};

/**
 * Refetch the list of owners based on the filters.
 */
const updateOwnerList = async () => {
  try {
    loadingOwners.value = true;
    filteredOwners.value = {
      country: "",
      data: [],
    };

    const suppliers = await useSupplierList({
      brand: "I",
      suppliercountry: props.country.toUpperCase(),

      // Filters
      id: filterOwnersData.value.supplierNumber,
      email: filterOwnersData.value.email,
      name: `${filterOwnersData.value.firstname} ${filterOwnersData.value.lastname}`.trim(),
    });

    filteredOwners.value = {
      country: props.country.toUpperCase(),
      data: suppliers ?? [],
    };
  } catch (error: any) {
    console.error("[MyTool Error] Error while fetching the owners: ", error.message);
    $toast.error(t("components.supplierSelectModal.toast.fetchOwnersError"));
  } finally {
    loadingOwners.value = false;
  }
};

/**
 * Select an owner from the list.
 */
const selectOwner = (owner: SupplierShort) => {
  closeModal();
  emit("selected", owner);
};

/**
 * Create a new supplier with the data from the form.
 */
const createSupplier = async () => {
  const createdSupplier: Supplier = await createPseudoSupplierFormRef.value?.createSupplier();
  console.log("createdSupplier", createdSupplier);

  if (createdSupplier) {
    const createdSupplierShort = {
      address: {
        country: createdSupplier.address.country,
        place: createdSupplier.address.place,
        street: createdSupplier.address.streetAndNumber,
        zip: createdSupplier.address.zip,
      },
      brand: createdSupplier.brand,
      country: createdSupplier.country,
      email: createdSupplier.emails[0].data,
      firstname: createdSupplier.address.firstname,
      lastname: createdSupplier.address.lastname,
      id: createdSupplier.id,
      isKeyholderReady: false,
      isPseudo: createdSupplier.isPseudo,
      roles: [],
    };

    selectOwner(createdSupplierShort);
  }
};
</script>

<template>
  <FormalTextInput
    :model-value="inputValue"
    :label="t('inputs.owner.label')"
    :prefix-icon="prefixIcon"
    :invalid="invalid"
    :error-message="t('inputs.owner.validation.required')"
    :loading="loading"
    :loading-text="t('inputs.owner.loading')"
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

  <Modal :open="modalOpen" :title="t('components.supplierSelectModal.modal.title')" position="stretch" @close="closeModal">
    <!-- Section: Choose an owner -->
    <section v-if="onChoosePage" class="space-y-4">
      <Formal v-model="filterOwnersData" class="space-y-4" compact>
        <div class="component-container">
          <FormalInput name="supplierNumber" type="text" :label="t('inputs.supplierNumber.label')" :disabled="loadingOwners" />
          <FormalInput name="email" type="email" :label="t('inputs.email.label')" :disabled="loadingOwners" />
        </div>

        <div class="component-container">
          <FormalInput name="firstname" type="text" :label="t('inputs.firstname.label')" :disabled="loadingOwners" />
          <FormalInput name="lastname" type="text" :label="t('inputs.lastname.label')" :disabled="loadingOwners" />
          <Button variant="neutral" :label="t('buttons.filter')" :disabled="loadingOwners" size="xl" @click="updateOwnerList" />
        </div>
      </Formal>

      <Table :columns="columns" :data="filteredOwners.data">
        <template #tbody="{ filteredData }">
          <TableRow
            v-for="owner in filteredData"
            :entry="owner"
            :columns="columns"
            class="cursor-pointer"
            @click="selectOwner(owner)"
            hoverable
          >
            <template #fullname>
              <CodeNameDisplay icon="user" :name="`${owner.firstname} ${owner.lastname}`" :code="owner.id" />
            </template>

            <template #country>
              <div class="flex gap-x-2">
                <Icon :graphic="owner.country.toLowerCase()" class="w-6 h-6" />
                {{ getCountryName(owner.country) }}
              </div>
            </template>

            <template #roles>
              <div class="flex gap-x-2">
                <Icon v-if="owner.roles.includes('proprietor')" graphic="home" class="w-6 h-6" />
                <Icon v-if="owner.roles.includes('keyholder')" graphic="key" class="w-6 h-6" />
              </div>
            </template>
          </TableRow>
        </template>

        <template #tfoot v-if="loadingOwners">
          <tfoot class="bg-bgr">
            <tr v-for="i in 15" :key="i">
              <td colspan="9" class="px-4 py-2">
                <div class="w-full h-6 skeleton"></div>
              </td>
            </tr>
          </tfoot>
        </template>

        <template #nofound v-if="loadingOwners">
          <div></div>
        </template>
      </Table>
    </section>

    <!-- Section: Create a new supplier -->
    <CreatePseudoSupplierForm v-else ref="createPseudoSupplierFormRef" :country="country" :country-disabled="country !== ''" />

    <template #footer>
      <div v-if="onChoosePage" class="flex justify-end gap-x-2">
        <Button variant="neutral" :label="t('buttons.cancel')" @click="closeModal" />
        <Button variant="neutral" :label="t('components.supplierSelectModal.modal.buttons.createSupplier')" @click="onChoosePage = false" />
      </div>

      <div v-else class="w-full flex justify-between gap-x-2">
        <Button variant="neutral" :label="t('buttons.back')" prefix-icon="arrow-left" @click="onChoosePage = true" />

        <div class="flex flex-row gap-x-2">
          <Button variant="neutral" :label="t('buttons.cancel')" @click="closeModal" />
          <Button variant="neutral" :label="t('components.supplierSelectModal.modal.buttons.createSupplier')" @click="createSupplier" />
        </div>
      </div>
    </template>
  </Modal>
</template>
