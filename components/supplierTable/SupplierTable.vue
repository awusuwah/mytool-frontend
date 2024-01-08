<template>
  <Table :data="suppliers" :columns="columns" :no-matches-found-text="t('components.supplierTable.noSuppliersFound')">
    <template #toolbar>
      <div class="w-full flex justify-end">
        <Button variant="cta" :label="t('components.supplierTable.createSupplier')" @click="openCreateModal" />
      </div>
    </template>

    <template v-if="!isLoading" #tbody="{ filteredData }">
      <TableRow
        v-for="(supplier, index) in filteredData"
        :entry="supplier"
        :columns="columns"
        class="cursor-pointer"
        hoverable
        @click="navigateTo(`/suppliers/${supplier.id}`)"
      >
        <template #fullname>
          <div class="absolute top-0 left-0 flex gap-x-1">
            <Badge v-if="supplier.isPseudo" variant="neutral" compact>PSEUDO</Badge>
          </div>
          <CodeNameDisplay icon="user" :name="`${supplier.firstname} ${supplier.lastname}`" :code="supplier.id" />
        </template>

        <template #streetAndNr>
          {{ supplier.address.street }}
        </template>

        <template #zipAndPlace>
          {{ `${supplier.address.zip} ${supplier.address.place}` }}
        </template>

        <template #country>
          <div class="flex gap-x-2">
            <Icon :graphic="supplier.country.toLowerCase()" class="w-6 h-6" />
            {{ supplier.country }}
          </div>
        </template>

        <template #roles>
          <div class="flex gap-x-2">
            <Icon v-if="supplier.roles.includes('proprietor')" graphic="home" class="w-6 h-6" />
            <Icon v-if="supplier.roles.includes('keyholder')" graphic="key" class="w-6 h-6" />
          </div>
        </template>
      </TableRow>
    </template>

    <template v-if="isLoading" #tfoot>
      <tfoot class="bg-bgr">
        <tr v-for="i in 10" :key="i" class="h-16">
          <td colspan="7" class="px-4 py-2">
            <div class="w-full h-9 bg-bgr-700 animate-pulse rounded-md"></div>
          </td>
        </tr>
      </tfoot>
    </template>

    <template v-if="isLoading" #nofound>
      <div></div>
    </template>
  </Table>

  <!-- Modal to create new supplier -->
  <Modal :title="t('components.supplierTable.createModal.title')" :open="createModalOpen" @close="closeCreateModal">
    <CreatePseudoSupplierForm v-if="onCreatePage" ref="createPseudoSupplierFormRef" />

    <section v-if="!onCreatePage" class="space-y-4">
      <MessageCard variant="info" style-variant="tinted">
        {{ t("components.supplierTable.createModal.supplierEmailAlreadyExists") }}
      </MessageCard>

      <Table :data="fullSupplierList" :columns="selectColumns">
        <template #tbody="{ filteredData }">
          <TableRow v-for="(supplier, index) in filteredData" :entry="supplier" :columns="selectColumns" class="cursor-pointer" hoverable>
            <template #fullname>
              <div class="absolute top-0 left-0">
                <Badge v-if="supplier.isPseudo" variant="neutral" compact>{{ t("general.badges.pseudo") }}</Badge>
                <Badge v-if="index === 0" variant="theme" compact>{{ t("general.badges.pseudo") }}</Badge>
              </div>

              <CodeNameDisplay icon="user" :name="`${supplier.firstname} ${supplier.lastname}`" :code="supplier.id" />
            </template>

            <template #country>
              <div class="flex gap-x-2">
                <Icon :graphic="supplier.country.toLowerCase()" class="w-6 h-6" />
                {{ supplier.country }}
              </div>
            </template>

            <template #roles>
              <div class="flex gap-x-2">
                <Icon v-if="supplier.roles.includes('proprietor')" graphic="home" class="w-6 h-6" />
                <Icon v-if="supplier.roles.includes('keyholder')" graphic="key" class="w-6 h-6" />
              </div>
            </template>

            <template #actions>
              <Button v-if="index === 0" variant="theme" @click="createSupplier">Create</Button>
              <Button v-else variant="theme" outlined @click="selectSupplier(supplier)">Choose</Button>
            </template>
          </TableRow>
        </template>
      </Table>
    </section>

    <template #footer>
      <Button variant="neutral" :label="t('buttons.cancel')" @click="closeCreateModal" />
      <Button variant="cta" :label="t('components.supplierTable.createModal.createSupplier')" @click="attemptCreateSupplier" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { Badge, Button, Icon, MessageCard, Modal, Table, TableRow } from "webcc-ui-components";

import CodeNameDisplay from "@/codeNameDisplay/CodeNameDisplay.vue";
import CreatePseudoSupplierForm from "@/_supplier/create/CreatePseudoSupplierForm.vue";

const { t } = useI18n();
const { $toast } = useNuxtApp();
const { extractValue } = useUtils();
const authStore = useAuthStore();

const createPseudoSupplierFormRef = ref();

const suppliers = ref<SupplierListResponse>([]);
const suppliersMatchingEmail = ref<SupplierListResponse>([]);
const isLoading = ref(false);
const onCreatePage = ref(true);
const createModalOpen = ref(false);
const createSupplierData = ref<CreateSupplierStructure>({
  countryOfAccommodation: authStore.getUserCountry ?? "",
  companyType: "Interhome",

  salutation: "",
  firstname: "",
  lastname: "",

  streetAndNumber: "",
  zip: "",
  place: "",
  country: "",

  email: "",
  phone: {
    prefix: "",
    number: "",
  },
  language: "",

  paymentPeriod: "",
});

/**
 * Columns which are displayed in the table.
 */
const columns = computed(() => [
  { key: "fullname", label: t("components.supplierTable.table.fullname") },
  { key: "streetAndNr", label: t("components.supplierTable.table.streetAndNr") },
  { key: "zipAndPlace", label: t("components.supplierTable.table.zipAndPlace") },
  { key: "country", label: t("components.supplierTable.table.country") },
  { key: "email", label: t("components.supplierTable.table.email") },
  { key: "roles", label: t("components.supplierTable.table.roles") },
  { key: "actions", label: t("components.supplierTable.table.actions") },
]);

/**
 * Columns which are displayed in the table when the user is on the second page of the modal, selecting a supplier.
 */
const selectColumns = computed(() => [
  { key: "fullname", label: t("inputs.fullname.label") },
  { key: "country", label: `${t("inputs.country.label")} & ${t("inputs.email.label")}` },
  { key: "roles", label: t("inputs.roles.label") },
  { key: "actions", label: t("inputs.actions.label") },
]);

/**
 * A list of all the suppliers which match the new suppliers email + the new supplier.
 */
const fullSupplierList = computed(() => [
  {
    address: {
      country: extractValue(createSupplierData.value.country),
      place: createSupplierData.value.place,
      street: createSupplierData.value.streetAndNumber,
      zip: createSupplierData.value.zip,
    },
    country: extractValue(createSupplierData.value.countryOfAccommodation),
    firstname: createSupplierData.value.firstname,
    lastname: createSupplierData.value.lastname,
    email: createSupplierData.value.email,
    roles: [],
    id: `XX-XXXXX`,
    isNew: true,
  },
  ...suppliersMatchingEmail.value,
]);

/**
 * Fetch the suppliers from the API and manage the loading state.
 */
const fetchSuppliers = async () => {
  isLoading.value = true;
  suppliers.value = (await useSupplierList({ brand: "I", suppliercountry: "CH" })) ?? [];
  isLoading.value = false;
};

onBeforeMount(async () => {
  await fetchSuppliers();
});

/**
 * Open the modal to create a new supplier.
 */
const openCreateModal = () => {
  createModalOpen.value = true;
};

/**
 * Close the modal to create a new supplier.
 */
const closeCreateModal = () => {
  createModalOpen.value = false;
};

/**
 * Attempt to create a new supplier. This will check if a supplier with the same email already
 * exists and navigate the user to a second page in the modal where he can choose an existing
 * supplier or create a new one with the data entered.
 */
const attemptCreateSupplier = async () => {
  const result = createPseudoSupplierFormRef.value?.getCreateSupplierData();

  if (result.valid)
    try {
      // Check if a supplier with the same email already exists
      const suppliersWithEmail = await useSupplierList({
        brand: "I",
        suppliercountry: extractValue(createSupplierData.value.countryOfAccommodation),
        email: result.data.email,
      });

      // If there are suppliers with the same email, navigate the user to a second page in the modal
      if (suppliersWithEmail?.length) {
        suppliersMatchingEmail.value = suppliersWithEmail;
        onCreatePage.value = false;
        return;
      }

      // Otherwise, create a new supplier
      await createSupplier(result.data);
    } catch (error) {
      console.error(
        `[MyTool Error] Error while checking if a supplier with this email (${createSupplierData.value.email}) already exists: `,
        error
      );
      $toast.error(t("components.supplierTable.createModal.toasts.checkSupplierError"));
    }
};

/**
 * Create a new supplier with all the information from the form.
 */
const createSupplier = async (sup: any) => {
  try {
    // Create the supplier object which will be used in the request to the API
    const newSupplier = {
      // Metadata
      isPseudo: true,
      brand: "I",
      country: extractValue(sup.countryOfAccommodation),

      // Address
      address: {
        salutation: extractValue(sup.salutation),
        firstname: sup.firstname,
        lastname: sup.lastname,
        streetAndNumber: sup.streetAndNumber,
        zip: sup.zip,
        place: sup.place,
        country: extractValue(sup.country),
      },

      // Contact
      emails: [{ type: "MAIL", data: sup.email, main: true }],
      phoneNumbers: [{ type: "MOB", data: sup.phone.number, country: sup.phone.prefix.value, main: true }],
      languages: [extractValue(sup.language).toUpperCase()],

      // Finance
      paymentPeriod: extractValue(sup.paymentPeriod),
    };

    // Create the new supplier and redirect the user to the supplier detail page
    const createdSupplier = await useSupplierCreate(newSupplier);
    navigateTo(`/suppliers/${createdSupplier?.id}`);
  } catch (error) {
    console.error(`[MyTool Error] Error while creating a new supplier: `, error);
    $toast.error(t("components.supplierTable.createModal.toasts.createSupplierError"));
  }
};

/**
 * Select an existing supplier from the list of suppliers with the same email.
 */
const selectSupplier = (supplier: any) => {
  navigateTo(`/suppliers/${supplier.id}`);
};
</script>
