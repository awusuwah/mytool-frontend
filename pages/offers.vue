<template>
  <div class="flex flex-col">
    <Header :title="$t('pages.offers.title')" icon="file-text" section="offers" />

    <main class="@container/main flex flex-col gap-2 p-4">
      <Heading appearance="title4" render-as="h3">All Offers</Heading>

      <OfferTable />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Heading } from "webcc-ui-components";

import Header from "@/header/Header.vue";
import OfferTable from "@/offerTable/OfferTable.vue";
</script>
