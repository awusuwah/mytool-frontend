<template>
  <Card class="flex flex-row items-center gap-y-2 h-14" compact>
    <Badge v-if="supplier?.isPseudo">{{ t("general.badges.pseudo") }}</Badge>
  </Card>
</template>

<script setup lang="ts">
import { Badge, Card } from "webcc-ui-components";

const { t } = useI18n();

defineProps({
  // The supplier which is being displayed
  supplier: {
    type: Object as PropType<Supplier>,
    default: null,
  },

  // Whether the supplier is still loading
  isLoading: {
    type: Boolean,
    default: false,
  },
});
</script>
