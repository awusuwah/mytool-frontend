<script setup lang="ts">
import { Button, Card, Formal, FormalInput, Heading } from "webcc-ui-components";
import SelectOwner from "@/_offer/creation/selectRelation/SelectOwner.vue";
import SelectPurchaser from "@/_offer/creation/selectRelation/SelectPurchaser.vue";
import SelectBuyingOffice from "@/_offer/creation/selectRelation/SelectBuyingOffice.vue";

const { t } = useI18n();
const { $toast } = useNuxtApp();
const { convertCodeNameToLabelValue, convertCodeNameToLabelValueWithIcons, convertSeasonModelsToLabelValue, getCountryFlag } = useUtils();
const { convertCreatingOfferToApiFormat } = useOfferCreation();
const { getAccommodationTypeOptions, getContractTypeOptions } = useStaticData();

const authStore = useAuthStore();
const creatingStore = useCreatingStore();

const generalInfoForm = ref();

const offerData = ref<OfferData | undefined>(undefined);
const isLoading = ref(false);
const generalInfoData = ref<CreateOfferStructure>({
  country: authStore.getUserCountry ?? "",
  region: "",
  place: "",
  newPlace: "",

  accoType: "",
  accoName: "",
  pax: "",
  rooms: "",
  bedrooms: "",

  // Conditions
  seasonModel: "",
  startDate: "",
  adminFee: "",
  contractType: "",
  margin: "",
  calculationClass: "",

  // Relations
  owner: "",
  purchaser: "",
  buyingOffice: "",
});
const relationsInvalid = ref({
  owner: false,
  purchaser: false,
  buyingOffice: false,
});

/**
 * Fetch the offer data from the API to get all the required information from the form. This request
 * will deliver more data if more data is passed into it.
 */
const fetchOfferData = async (params: any) => {
  isLoading.value = true;
  offerData.value = await useOfferData(params);
  isLoading.value = false;
};

/**
 * Save the information from the form into the store and continue to the next step.
 */
const continueToNextStep = async () => {
  // Validate all the inputs
  const formValid = generalInfoForm.value.validateForm();

  // Validate the relations
  const { owner, purchaser, buyingOffice } = generalInfoData.value;
  relationsInvalid.value = {
    owner: owner === "",
    purchaser: purchaser === "",
    buyingOffice: buyingOffice === "",
  };

  // If any of the form inputs are invalid, don't continue
  if (!formValid || !owner || !purchaser || !buyingOffice) return;

  // Check if the attributes need to be entered for this offer
  try {
    const attributesResponse = await useOfferDataAttributes(convertCreatingOfferToApiFormat(generalInfoData.value));
    if (attributesResponse?.attributes?.length ?? 0 > 0) {
      creatingStore.setCreatingOffer(generalInfoData.value, { id: "TODOID", currentStep: 2 });
      navigateTo("/offers/create/attributes");
      return;
    }

    // If no attributes need to be entered, continue with the price matrix
    creatingStore.setCreatingOffer(generalInfoData.value, { id: "TODOID", currentStep: 3 });
    navigateTo("/offers/create/prices");
  } catch (error: any) {
    $toast.error("pages.offerCreate.general.toasts.fetchAttributesError");
    console.error(`[MyTool Error] Error while fetching the attributes: `, error);
  }
};

/**
 * When the page loads, fetch some very basic initial data.
 */
onBeforeMount(async () => {
  const creatingOffer = creatingStore.getCreatingOffer;
  console.log("Creating Offer: ", creatingOffer);

  const country = creatingOffer?.country?.value || authStore.getUserCountry || "";
  const purchaserBo = (authStore.getUserBuyingOffices as UserBuyingOffice[])?.[0].purchaserBo ?? "";
  const buyingOfficeBo = (authStore.getUserBuyingOffices as UserBuyingOffice[])?.[0].countryBo ?? "";
  await fetchOfferData({ country });

  if (!creatingOffer) {
    // Set all the prefilled values after the data has been fetched
    generalInfoData.value.country = convertCodeNameToLabelValue(offerData.value?.countries.filter((c) => c.code === country))[0];
    generalInfoData.value.purchaser = offerData.value?.BOs.find((bo) => bo.code === purchaserBo) ?? "";
    generalInfoData.value.buyingOffice = offerData.value?.BOs.find((bo) => bo.code === buyingOfficeBo) ?? "";
    return;
  }

  // TODO: Implement displaying the data from the store (when navigating back)
});

/**
 * An owner has been selected from the modal.
 *
 * @param { SupplierShort } owner - The owner which has been selected.
 */
const ownerUpdated = (owner: SupplierShort) => {
  generalInfoData.value.owner = owner;
  relationsInvalid.value.owner = false;
};

/**
 * A purchaser has been selected from the modal.
 *
 * @param { BuyingOffice } purchaser - The purchaser which has been selected.
 */
const purchaserUpdated = (purchaser: BuyingOffice) => {
  generalInfoData.value.purchaser = purchaser;
  relationsInvalid.value.purchaser = false;
};

/**
 * A buying office has been selected from the modal.
 *
 * @param { BuyingOffice } buyingOffice - The buying office which has been selected.
 */
const buyingOfficeUpdated = (buyingOffice: BuyingOffice) => {
  generalInfoData.value.buyingOffice = buyingOffice;
  relationsInvalid.value.buyingOffice = false;
};

/**
 * Prepare the options for the calculation classes.
 */
const calculationClassOptions = computed(() => {
  return offerData.value?.calculationClasses.map((cc) => ({
    label: cc,
    value: cc,
  }));
});

/**
 * Watch for changes in the country field and fetch data based on it.
 */
watch(
  () => generalInfoData.value.country,
  async (newCountry, oldCountry) => {
    const newCountryValue = typeof newCountry === "string" ? newCountry : (newCountry as ValueLabel).value;
    const oldCountryValue = typeof oldCountry === "string" ? oldCountry : (oldCountry as ValueLabel).value;
    if (newCountryValue === oldCountryValue) return;

    generalInfoData.value.region = { label: "", value: "" };
    generalInfoData.value.place = { label: "", value: "" };
    generalInfoData.value.owner = "";
    generalInfoData.value.purchaser = "";
    generalInfoData.value.buyingOffice = "";
    await fetchOfferData({ country: newCountryValue });
  }
);

/**
 * Watch for changes in the region field and fetch data based on it.
 */
watch(
  () => generalInfoData.value.region,
  async (newRegion, oldRegion) => {
    const newRegionValue = typeof newRegion === "string" ? newRegion : (newRegion as ValueLabel).value;
    const oldRegionValue = typeof oldRegion === "string" ? oldRegion : (oldRegion as ValueLabel).value;
    if (newRegionValue === oldRegionValue) return;

    generalInfoData.value.place = { label: "", value: "" };
    await fetchOfferData({ country: (generalInfoData.value.country as ValueLabel).value, region: newRegionValue });
  }
);
</script>

<template>
  <Formal v-model="generalInfoData" ref="generalInfoForm" class="space-y-4" compact>
    <Card class="space-y-2">
      <Heading appearance="title4" render-as="h3" class="flex justify-between">
        {{ t("pages.offerCreate.general.subtitleAccommodation") }}
      </Heading>

      <Heading appearance="title6" render-as="h4">
        {{ t("pages.offerCreate.general.subtitleTouristicRegion") }}
      </Heading>

      <div class="component-container">
        <FormalInput
          name="country"
          type="dropdown"
          :label="t('inputs.country.label')"
          :options="convertCodeNameToLabelValueWithIcons(offerData?.countries ?? [])"
          :prefix-icon="getCountryFlag(generalInfoData.country)"
          :loading="isLoading"
          :loading-text="t('inputs.country.loading')"
          validation="required"
          :validation-messages="{ required: t('inputs.country.validation.required') }"
        />
        <FormalInput
          name="region"
          type="dropdown"
          :label="t('inputs.region.label')"
          :options="convertCodeNameToLabelValue(offerData?.regions ?? [])"
          prefix-icon="map-pin"
          :loading="isLoading"
          :loading-text="t('inputs.region.loading')"
          :disabled="!(generalInfoData.country as ValueLabel).value"
          validation="required"
          :validation-messages="{ required: t('inputs.region.validation.required') }"
        />

        <FormalInput
          name="place"
          type="dropdown"
          :label="t('inputs.place.label')"
          :options="convertCodeNameToLabelValue(offerData?.places ?? [])"
          prefix-icon="map-pin"
          :loading="isLoading"
          :loading-text="t('inputs.place.loading')"
          :disabled="!(generalInfoData.region as ValueLabel).value || generalInfoData.newPlace !== ''"
          :validation="generalInfoData.newPlace === '' ? 'required' : ''"
          :validation-messages="{ required: t('inputs.place.validation.required') }"
        />
      </div>

      <FormalInput
        name="newPlace"
        type="text"
        :label="t('inputs.newPlace.label')"
        prefix-icon="map-pin"
        :loading="isLoading"
        :disabled="(generalInfoData.place as ValueLabel).value !== ''"
        :validation="(generalInfoData.place as ValueLabel).value === '' ? 'required' : ''"
        :validation-messages="{ required: t('inputs.newPlace.validation.required') }"
      />

      <FormalInput
        name="accoType"
        type="radiobuttons"
        :title="t('inputs.accoType.label')"
        :options="getAccommodationTypeOptions()"
        validation="required"
        :validation-messages="{ required: t('inputs.accoType.validation.required') }"
        class="h-12 flex items-center"
      />
      <FormalInput
        name="accoName"
        type="text"
        :label="t('inputs.accoName.label')"
        validation="required"
        :validation-messages="{ required: t('inputs.accoName.validation.required') }"
      />

      <div class="component-container">
        <FormalInput
          name="pax"
          type="number"
          :label="t('inputs.pax.label')"
          validation="required"
          :validation-messages="{ required: t('inputs.pax.validation.required') }"
        />
        <FormalInput
          name="rooms"
          type="number"
          :label="t('inputs.rooms.label')"
          validation="required"
          :validation-messages="{ required: t('inputs.rooms.validation.required') }"
        />
        <FormalInput
          name="bedrooms"
          type="number"
          :label="t('inputs.bedrooms.label')"
          validation="required"
          :validation-messages="{ required: t('inputs.bedrooms.validation.required') }"
        />
      </div>
    </Card>

    <Card class="space-y-2">
      <Heading appearance="title4" render-as="h3" class="flex justify-between">
        {{ t("pages.offerCreate.general.subtitleConditions") }}
      </Heading>

      <FormalInput
        name="seasonModel"
        type="dropdown"
        :label="t('inputs.seasonModel.label')"
        :options="convertSeasonModelsToLabelValue(offerData?.seasonModels ?? [])"
        :loading="isLoading"
        :loading-text="t('inputs.seasonModel.loading')"
        :disabled="!(generalInfoData.country as ValueLabel).value"
        validation="required"
        :validation-messages="{ required: t('inputs.seasonModel.validation.required') }"
      />

      <div class="component-container">
        <FormalInput
          name="startDate"
          type="datepicker"
          :label="t('inputs.startDate.label')"
          format="dd.MM.yyyy"
          :min-date="new Date(new Date().toISOString().split('T')[0])"
          prefix-icon="calendar"
          validation="required"
          :validation-messages="{ required: t('inputs.startDate.validation.required') }"
        />

        <FormalInput
          name="adminFee"
          type="text"
          :label="t('inputs.adminFee.label')"
          step="1"
          min="0"
          max="15"
          validation="integer|min:0|max:15"
          :validation-messages="{
            min: t('inputs.adminFee.validation.min', { min: 0 }),
            max: t('inputs.adminFee.validation.max', { max: 15 }),
            integer: t('inputs.adminFee.validation.integer'),
          }"
        />
      </div>

      <div class="component-container">
        <FormalInput
          name="contractType"
          type="dropdown"
          :label="t('inputs.contractType.label')"
          :options="getContractTypeOptions()"
          validation="required"
          :validation-messages="{ required: t('inputs.contractType.validation.required') }"
        />

        <FormalInput
          name="margin"
          type="number"
          :label="t('inputs.margin.label')"
          :disabled="!(generalInfoData.contractType as ValueLabel).value || (generalInfoData.contractType as ValueLabel).value === 'B' || (generalInfoData.contractType as ValueLabel).value === 'N'"
          :validation="(generalInfoData.contractType as ValueLabel).value === 'S' || (generalInfoData.contractType as ValueLabel).value === 'BC' ? 'required' : ''"
          :validation-messages="{ required: t('inputs.margin.validation.required') }"
        />

        <FormalInput
          name="calculationClass"
          type="dropdown"
          :label="t('inputs.calculationClass.label')"
          :options="calculationClassOptions ?? []"
          :disabled="!(generalInfoData.contractType as ValueLabel).value || (generalInfoData.contractType as ValueLabel).value === 'S' || (generalInfoData.contractType as ValueLabel).value === 'BC'"
          :validation="(generalInfoData.contractType as ValueLabel).value === 'B' || (generalInfoData.contractType as ValueLabel).value === 'N' ? 'required' : ''"
          :validation-messages="{ required: t('inputs.calculationClass.validation.required') }"
        />
      </div>
    </Card>

    <Card class="space-y-2">
      <Heading appearance="title4" render-as="h3" class="flex justify-between">
        {{ t("pages.offerCreate.general.subtitleRelations") }}
      </Heading>

      <div class="component-container">
        <SelectOwner
          prefix-icon="user"
          :country="(generalInfoData.country as ValueLabel).value"
          :invalid="relationsInvalid.owner"
          :owner="generalInfoData.owner"
          :loading="isLoading"
          :disabled="!(generalInfoData.country as ValueLabel).value"
          @selected="ownerUpdated"
        />

        <SelectPurchaser
          prefix-icon="user-business"
          :invalid="relationsInvalid.purchaser"
          :purchaser="generalInfoData.purchaser"
          :purchasers="offerData?.BOs"
          :loading="isLoading"
          :disabled="!(generalInfoData.country as ValueLabel).value"
          @selected="purchaserUpdated"
        />

        <SelectBuyingOffice
          prefix-icon="store"
          :invalid="relationsInvalid.buyingOffice"
          :buying-office="generalInfoData.buyingOffice"
          :buying-offices="offerData?.BOs"
          :loading="isLoading"
          :disabled="!(generalInfoData.country as ValueLabel).value"
          @selected="buyingOfficeUpdated"
        />
      </div>
    </Card>

    <!-- Buttons -->
    <div class="flex justify-end">
      <Button variant="cta" class="ml-auto" @click="continueToNextStep">
        {{ t("buttons.continueToAttributes") }}
      </Button>
    </div>
  </Formal>
</template>
