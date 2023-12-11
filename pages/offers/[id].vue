<template>
  <div class="flex flex-col">
    <Header :title="t('pages.offerDetail.title', { internalName: offer?.accommodation.name || '' })" icon="file-text" section="offers" />

    <main class="@container/main flex flex-col gap-2 p-4">
      <section class="grid grid-cols-1 gap-4 @7xl/main:grid-cols-2">
        <div class="flex flex-col gap-4">
          <AccommodationCard :accommodation="offer?.accommodation" :is-loading="isLoading" />
          <ConditionsCard :contract="offer?.contract" :is-loading="isLoading" />
          <RelationsCard
            :supplier="offer?.supplier"
            :purchaser="offer?.purchaser"
            :buying-office="offer?.buyingoffice"
            :is-loading="isLoading"
          />
          <ServicesCard :services="offer?.services" :gerance="offer?.contract.gerance" :is-loading="isLoading" />
          <DocumentsCard :documents="offer?.documents" :is-loading="isLoading" />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import AccommodationCard from "@/_accommodation/accommodationCard/AccommodationCard.vue";
import ConditionsCard from "@/_offer/conditionsCard/ConditionsCard.vue";
import RelationsCard from "@/_offer/relationsCard/RelationsCard.vue";
import ServicesCard from "@/_offer/servicesCard/ServicesCard.vue";
import DocumentsCard from "@/_offer/documentsCard/DocumentsCard.vue";
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
