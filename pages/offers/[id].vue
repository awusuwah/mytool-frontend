<template>
  <div class="flex flex-col">
    <Header :title="t('pages.offerDetail.title', { internalName: offer?.accommodation.name || '' })" icon="file-text" section="offers" />

    <main class="@container/main flex flex-col gap-2 p-4">
      <section class="grid grid-cols-1 gap-4 @5xl/main:grid-cols-2 @8xl/main:grid-cols-3">
        <AccommodationCard :accommodation="offer?.accommodation" :is-loading="isLoading" />
        <ConditionsCard :contract="offer?.contract" :is-loading="isLoading" />
        <RelationsCard
          :supplier="offer?.supplier"
          :purchaser="offer?.purchaser"
          :buying-office="offer?.buyingoffice"
          :is-loading="isLoading"
        />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import AccommodationCard from "@/_accommodation/accommodationCard/AccommodationCard.vue";
import ConditionsCard from "@/_offer/conditionsCard/ConditionsCard.vue";
import RelationsCard from "@/_offer/relationsCard/RelationsCard.vue";
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
