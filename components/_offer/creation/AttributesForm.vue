<script setup lang="ts">
import { Button, Card, Formal, FormalInput, Heading, MessageCard, Tooltip } from "webcc-ui-components";

const { t } = useI18n();
const { convertCreatingOfferToApiFormat } = useOfferCreation();
const creatingStore = useCreatingStore();

const attributesData = ref({});
const attributes = ref<OfferDataAttributesResponse>();
const isLoading = ref(false);

/**
 * Fetch the attributes from the API and managed the loading state.
 */
const fetchAttributes = async (creatingOffer: CreateOfferStructure) => {
  isLoading.value = true;
  attributes.value = (await useOfferDataAttributes(convertCreatingOfferToApiFormat(creatingOffer))) ?? undefined;
};

/**
 * Just before the page loads, we fetch the attributes from the API to see what needs to be displayed.
 */
onBeforeMount(async () => {
  const creatingOffer: CreateOfferStructure = creatingStore.getCreatingOffer;
  await fetchAttributes(creatingOffer);

  // If there are no attributes, we can automatically continue to the next step
  if (attributes.value?.attributes.length === 0) {
    creatingStore.setCreatingOfferAttributes({});
    navigateTo("/offers/create/prices");
    return;
  }

  // If there are attributes, we need to setup the data object for the formal component
  const attributesDataObject: { [key: string]: string | number | boolean } = {};
  attributes.value?.attributes.forEach((attr) => {
    const prefilledValue = creatingOffer.attributes?.[attr.name] ?? null;
    const emptyValue = attr.type === "BOOLEAN" ? false : attr.value;

    attributesDataObject[attr.name] = prefilledValue || emptyValue;
  });

  attributesData.value = attributesDataObject;
  isLoading.value = false;
});

/**
 * Determine the formal input type based on the attribute type and it's options.
 */
const formalType = (type: AttributeType, options?: ValueLabel[]) => {
  switch (type) {
    case "BOOLEAN":
      return "checkbox";

    case "ENUMERATION":
      if ((options?.length ?? 0) <= 3) return "radiobuttons";
      return "dropdown";

    case "INTEGER":
    case "DECIMAL":
      return "number";

    default:
      return "text";
  }
};

/**
 * Mutate certain attribute options to contain altered labels. This adds icon for the amount of stars
 * and some plus and minus signs for the satisfaction.
 */
const mutatedAttributeOptions = (attribute: Attribute): ValueLabel[] | undefined => {
  return attribute.options?.map(({ value, label }) => ({
    label: label.replace("*", "⭐").replaceAll("+", "➕").replaceAll("-", "➖"),
    value,
  }));
};

/**
 * Save the attributes and continue to the next step.
 */
const continueToNextStep = () => {
  creatingStore.setCreatingOfferAttributes(compactAttributes());
  navigateTo("/offers/create/prices");
};

/**
 * Compact the attributes data object to be key/value pairs of the attribute name and it's choosen value.
 */
const compactAttributes = () => {
  const compactedAttributes: { [key: string]: string | number | boolean } = {};
  Object.entries(attributesData.value).forEach(([key, value]) => {
    if ((value as string | number | boolean | Object).hasOwnProperty("value")) {
      compactedAttributes[key] = (value as ValueLabel).value;
    } else {
      compactedAttributes[key] = value as string;
    }
  });

  return compactedAttributes;
};
</script>

<template>
  <Card v-if="isLoading" class="space-y-2">
    <Heading appearance="title4" render-as="h3" class="flex justify-between">
      {{ t("components.attributesForm.title") }}
    </Heading>
  </Card>

  <Card v-else class="space-y-2">
    <Heading appearance="title4" render-as="h3" class="flex justify-between">
      {{
        attributes?.rule === "USE-SEASONMODEL"
          ? t("components.attributesForm.titleSeasonModelPricing")
          : t("components.attributesForm.titleSmartPricing")
      }}
    </Heading>

    <Formal v-if="(attributes?.attributes.length ?? 0) > 0" v-model="attributesData" class="space-y-4" compact>
      <MessageCard variant="info" style-variant="tinted">
        <span v-if="attributes?.rule === 'USE-SEASONMODEL'">
          {{ t("components.attributesForm.descriptionSeasonModelPricing") }}
        </span>
        <span v-else>
          {{ t("components.attributesForm.descriptionSmartPricing") }}
        </span>
      </MessageCard>

      <section class="grid grid-cols-1 gap-x-8 gap-y-2 @2xl/card:grid-cols-2">
        <div
          v-for="attribute in attributes?.attributes"
          :class="{ '@2xl/card:col-span-2': ['ENUMERATION', 'INTEGER'].includes(attribute.type) }"
        >
          <FormalInput
            v-if="attribute.type === 'ENUMERATION'"
            :name="attribute.name"
            :label="attribute.desc"
            :title="attribute.desc"
            :type="formalType(attribute.type, attribute.options)"
            :options="mutatedAttributeOptions(attribute)"
            :vertical="false"
          >
            <template v-if="['ZISOBJ:ZIQUAL', 'ZISOBJ:SPSTANDARD'].includes(attribute.name)" class="self-center" #suffix>
              <Tooltip>
                {{
                  attribute.name === "ZISOBJ:ZIQUAL"
                    ? t("components.attributesForm.tooltips.stars")
                    : t("components.attributesForm.tooltips.validation")
                }}
              </Tooltip>
            </template>
          </FormalInput>

          <FormalInput
            v-else
            :name="attribute.name"
            :label="attribute.desc"
            :placeholder="attribute.desc"
            :type="formalType(attribute.type)"
          />
        </div>
      </section>

      <div class="flex justify-end">
        <Button variant="cta" class="ml-auto" @click="continueToNextStep">
          {{ t("components.attributesForm.buttons.continueToPrices") }}
        </Button>
      </div>
    </Formal>
  </Card>
</template>
