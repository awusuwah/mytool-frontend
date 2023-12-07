<template>
  <div class="flex flex-col">
    <Header :title="$t('pages.accommodations.title')" icon="home" section="accommodations" />

    <main class="@container/main flex flex-col gap-2 p-4">
      <Heading appearance="title4" render-as="h3">All Accommodations</Heading>

      <AccommodationTable />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Heading } from "webcc-ui-components";

import Header from "@/header/Header.vue";
import AccommodationTable from "@/accommodationTable/AccommodationTable.vue";
</script>
