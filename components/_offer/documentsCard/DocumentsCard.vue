<template>
  <Card class="flex flex-col gap-y-2">
    <Heading appearance="title4" render-as="h3">{{ t("components.documentsCard.title", { count: documents?.length }) }}</Heading>

    <div v-if="!isLoading" class="flex flex-row gap-2">
      <Tooltip v-for="(document, index) in documents">
        <div class="flex flex-col gap-2">
          <span>
            <b>{{ t("components.documentsCard.tooltips.creator") }}:</b>
            {{ document.creator }}
          </span>

          <span>
            <b>{{ t("components.documentsCard.tooltips.createdOn") }}:</b>
            {{ document.createdOn }}
          </span>

          <span>
            <b>{{ t("components.documentsCard.tooltips.id") }}:</b>
            {{ document.id }}
          </span>
        </div>

        <template #activator>
          <div class="relative">
            <button :class="calculateDocumentClasses(index)">
              <Icon graphic="file-pdf" size="lg" />
            </button>
            <Badge v-if="index === 0" variant="success" class="absolute -left-1.5 -top-1.5" compact>
              {{ t("components.documentsCard.latest") }}
            </Badge>
          </div>
        </template>
      </Tooltip>

      <!-- Button to create new documents -->
      <Tooltip>
        {{ t("components.documentsCard.tooltips.createDocument") }}

        <template #activator>
          <button :class="calculateDocumentClasses(-1)">
            <Icon graphic="add" size="lg" />
          </button>
        </template>
      </Tooltip>
    </div>

    <div v-else class="flex flex-row gap-2">
      <div v-for="i in 3" class="skeleton w-14 h-14" />
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Badge, Card, Heading, Icon, Tooltip } from "webcc-ui-components";

const { t } = useI18n();

const props = defineProps({
  // The documents which are being displayed
  documents: {
    type: Array as PropType<OfferDocument[]>,
    default: null,
  },

  // Whether the documents are still loading
  isLoading: {
    type: Boolean,
    default: false,
  },
});

/**
 * Calculate the classes for the document button. The outputted classes change based on the index.
 *
 * @param { Number } index - The index of the document in the list.
 */
const calculateDocumentClasses = (index: number) => ({
  "relative flex items-center justify-center w-14 h-14 rounded hover:scale-105 active:scale-95 transition-all": true,
  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-thm focus:ring-offset-bgr": true,

  "bg-bgr-200 hover:bg-bgr-300 text-txt-200 hover:text-txt ring-2 ring-txt-300": index === 0,
  "bg-bgr-100 hover:bg-bgr-200 text-txt-600 hover:text-txt-400": index !== 0 && index !== -1,
  "bg-bgr-100 hover:bg-bgr-200 text-txt-100": index === -1,
});
</script>
