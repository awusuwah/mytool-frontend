<template>
  <div class="flex flex-col">
    <Header :title="t('pages.offerDetail.title', { internalName: offer?.accommodation.name || '' })" icon="file-text" section="offers" />

    <main class="@container/main flex flex-col gap-2 p-4">
      <Heading appearance="title4" render-as="h3">OfferDetail</Heading>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Heading } from "webcc-ui-components";

import Header from "@/header/Header.vue";

const { t } = useI18n();
const route = useRoute();

const offer = ref<Offer | undefined>(undefined);
const isLoading = ref(false);

/**
 * Fetch the offers from the API and manage the loading state.
 */
const fetchOffer = async () => {
  isLoading.value = true;
  offer.value = await useOfferDetail(route.params.id as string);
  isLoading.value = false;
};

onBeforeMount(async () => {
  await fetchOffer();
});
</script>
