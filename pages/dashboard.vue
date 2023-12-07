<template>
  <div class="flex flex-col">
    <Header :title="$t('pages.dashboard.title')" icon="bar-chart-grouped" section="default" />

    <main class="@container/main flex flex-col gap-2 p-4">
      <Heading appearance="title3" render-as="h2">Hello, {{ user?.fullname || "User" }}</Heading>
      <Heading appearance="title4" render-as="h3">Last Viewed</Heading>

      <section class="grid grid-cols-1 gap-4 @5xl/main:grid-cols-2 @8xl/main:grid-cols-3">
        <Card class="space-y-2">Recent Offers</Card>
        <Card class="space-y-2">Recent Suppliers</Card>
        <Card class="space-y-2">Recent Accommodations</Card>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Card, Heading } from "webcc-ui-components";

import Header from "@/header/Header.vue";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

const user = computed(() => authStore.getUser);
</script>
