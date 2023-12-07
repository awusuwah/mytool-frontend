<template>
  <div class="flex flex-col">
    <Header :title="$t('pages.suppliers.title')" icon="group" section="suppliers" />

    <main class="@container/main flex flex-col gap-2 p-4">
      <Heading appearance="title4" render-as="h3">All Suppliers</Heading>

      <SupplierTable />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Heading } from "webcc-ui-components";

import Header from "@/header/Header.vue";
import SupplierTable from "@/supplierTable/SupplierTable.vue";
</script>
