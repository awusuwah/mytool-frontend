<script setup lang="ts">
import { Button, Formal, FormalInput, Heading, Icon, Modal, Table, TableRow } from "webcc-ui-components";

const { t } = useI18n();
const { $toast } = useNuxtApp();
const { getCommunicationLanguageOptions, getPaymentPeriodOptions, getSalutationOptions } = useStaticData();
const { convertCodeNameToLabelValue, getCountryFlag, extractValue } = useUtils();

const authStore = useAuthStore();
const staticStore = useStaticStore();

const createPseudoSupplierFormRef = ref();

const props = defineProps({
  // Country of the supplier
  country: {
    type: String,
    default: "",
  },

  // Determine whether the country is disabled
  countryDisabled: {
    type: Boolean,
    default: false,
  },
});

const createSupplierData = ref<CreateSupplierStructure>({
  countryOfAccommodation: props.country ? props.country : authStore.getUserCountry ?? "",
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
 * Get the entire data object of the supplier that is being created.
 */
const getCreateSupplierData = () => {
  const valid = createPseudoSupplierFormRef.value.validateForm();
  return {
    data: createSupplierData.value,
    valid,
  };
};

/**
 * Create a new supplier with all the information from the form.
 */
const createSupplier = async () => {
  if (!createPseudoSupplierFormRef.value.validateForm()) {
    return;
  }

  const supplier = createSupplierData.value;

  try {
    // Create the supplier object which will be used in the request to the API
    const newSupplier = {
      // Metadata
      isPseudo: true,
      brand: "I",
      country: extractValue(supplier.countryOfAccommodation),

      // Address
      address: {
        salutation: extractValue(supplier.salutation),
        firstname: supplier.firstname,
        lastname: supplier.lastname,
        streetAndNumber: supplier.streetAndNumber,
        zip: supplier.zip,
        place: supplier.place,
        country: extractValue(supplier.country),
      },

      // Contact
      emails: [{ type: "MAIL", data: supplier.email, main: true }],
      phoneNumbers: [{ type: "MOB", data: supplier.phone.number, country: supplier.phone.prefix.value, main: true }],
      languages: [extractValue(supplier.language).toUpperCase()],

      // Finance
      paymentPeriod: extractValue(supplier.paymentPeriod),
    };

    // Create the new supplier and redirect the user to the supplier detail page
    const createdSupplier = await useSupplierCreate(newSupplier);
    return createdSupplier;
  } catch (error) {
    console.error(`[MyTool Error] Error while creating a new supplier: `, error);
    $toast.error(t("components.supplierTable.createModal.toasts.createSupplierError"));
  }
};

defineExpose({
  createSupplier,
  getCreateSupplierData,
});
</script>

<template>
  <Formal v-model="createSupplierData" ref="createPseudoSupplierFormRef" class="space-y-4" compact>
    <!-- Section: General -->
    <section class="flex flex-col md:flex-row gap-x-2">
      <FormalInput
        name="countryOfAccommodation"
        type="dropdown"
        :label="t('inputs.countryOfAccommodation.label')"
        :options="convertCodeNameToLabelValue(staticStore.getCountries ?? [])"
        :prefix-icon="getCountryFlag(createSupplierData.countryOfAccommodation)"
        :disabled="props.countryDisabled"
        validation="required"
        :validation-messages="{ required: t('inputs.countryOfAccommodation.validation.required') }"
      />

      <FormalInput name="companyType" type="text" :label="t('inputs.companyType.label')" disabled />
    </section>

    <!-- Section: Name -->
    <section class="space-y-2 pt-6">
      <Heading appearance="title5" render-as="h5">
        {{ $t("components.supplierTable.createModal.titleName") }}
      </Heading>

      <FormalInput
        name="salutation"
        type="radiobuttons"
        :label="t('inputs.salutation.label')"
        :options="getSalutationOptions()"
        validation="required"
        :validation-messages="{ required: t('inputs.salutation.validation.required') }"
      />

      <div class="flex flex-col md:flex-row gap-x-2">
        <FormalInput
          name="firstname"
          type="text"
          :label="t('inputs.firstname.label')"
          validation="required|max:40"
          :validation-messages="{ required: t('inputs.firstname.validation.required'), max: t('inputs.firstname.validation.max', 40) }"
        />
        <FormalInput
          name="lastname"
          type="text"
          :label="t('inputs.lastname.label')"
          validation="required|max:40"
          :validation-messages="{ required: t('inputs.lastname.validation.required'), max: t('inputs.lastname.validation.max', 40) }"
        />
      </div>
    </section>

    <!-- Section: Address -->
    <section class="space-y-2 pt-6">
      <Heading appearance="title5" render-as="h5">
        {{ $t("components.supplierTable.createModal.titleAddress") }}
      </Heading>

      <FormalInput
        name="streetAndNumber"
        type="text"
        :label="t('inputs.streetAndNumber.label')"
        validation="required|max:40"
        :validation-messages="{
          required: t('inputs.streetAndNumber.validation.required'),
          max: t('inputs.streetAndNumber.validation.max', 40),
        }"
      />

      <div class="flex flex-col md:flex-row gap-x-2">
        <FormalInput
          name="zip"
          type="text"
          :label="t('inputs.zip.label')"
          validation="required"
          :validation-messages="{ required: t('inputs.zip.validation.required') }"
        />
        <FormalInput
          name="place"
          type="text"
          :label="t('inputs.place.label')"
          validation="required|max:40"
          :validation-messages="{ required: t('inputs.place.validation.required'), max: t('inputs.place.validation.max', 40) }"
        />
        <FormalInput
          name="country"
          type="dropdown"
          :label="t('inputs.country.label')"
          :options="convertCodeNameToLabelValue(staticStore.getCountries ?? [])"
          :prefix-icon="getCountryFlag(createSupplierData.country)"
          validation="required"
          :validation-messages="{ required: t('inputs.country.validation.required') }"
        />
      </div>
    </section>

    <!-- Section: Contact -->
    <section class="space-y-2 pt-6">
      <Heading appearance="title5" render-as="h5">
        {{ $t("components.supplierTable.createModal.titleContact") }}
      </Heading>

      <FormalInput
        name="email"
        type="email"
        :label="t('inputs.email.label')"
        prefix-icon="mail-send"
        validation="required|email"
        :validation-messages="{ required: t('inputs.email.validation.required'), email: t('inputs.email.validation.email') }"
      />
      <FormalInput
        name="phone"
        type="phone"
        :label="t('inputs.phone.label')"
        number-label="Mobile Number"
        prefix-icon="phone"
        validation="required"
        :validation-messages="{ required: t('inputs.phone.validation.required') }"
      />
      <FormalInput
        name="language"
        type="dropdown"
        :label="t('inputs.languages.label', 1)"
        :options="getCommunicationLanguageOptions()"
        prefix-icon="global"
        validation="required"
        :validation-messages="{ required: t('inputs.languages.validation.required') }"
      />
    </section>

    <!-- Section: Finance -->
    <section class="space-y-2 pt-6">
      <Heading appearance="title5" render-as="h5">
        {{ $t("components.supplierTable.createModal.titleFinance") }}
      </Heading>

      <FormalInput
        name="paymentPeriod"
        type="dropdown"
        :label="t('inputs.paymentPeriod.label')"
        :options="getPaymentPeriodOptions()"
        validation="required"
        :validation-messages="{ required: t('inputs.paymentPeriod.validation.required') }"
      />
    </section>
  </Formal>
</template>
