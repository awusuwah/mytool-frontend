<script setup lang="ts">
import { Button } from "webcc-ui-components";

import Header from "@/header/Header.vue";
import PriceMatrix from "@/_offer/priceMatrix/PriceMatrix.vue";

definePageMeta({
  layout: "offer-create",
});

const { t } = useI18n();
const { convertCreatingOfferToApiFormat } = useOfferCreation();
const creatingStore = useCreatingStore();

const isLoading = ref(false);
const prices = ref<OfferDataPricesResponse | null>(null);

/**
 * Fetch the prices for the offer from the API and managed the loading state.
 */
const fetchPrices = async () => {
  const creatingOffer = creatingStore.getCreatingOffer;

  isLoading.value = true;
  prices.value = (await useOfferDataPrices(convertCreatingOfferToApiFormat(creatingOffer))) ?? null;
  isLoading.value = false;
};

onBeforeMount(async () => {
  await fetchPrices();
});
</script>

<template>
  <div class="flex flex-col">
    <Header :title="t('pages.offerCreate.prices.title')" icon="file-text" section="offers" />

    <main class="@container/main flex flex-col gap-2 p-4">
      <section>
        <Button variant="neutral" :label="t('buttons.back')" prefix-icon="arrow-left" outlined to="/offers/create/attributes" />
      </section>

      <PriceMatrix :prices="prices" :loading="isLoading" />
    </main>
  </div>
</template>
