<script setup lang="ts">
import { Button } from "webcc-ui-components";

import Header from "@/header/Header.vue";
import GeneralInfoForm from "@/_offer/creation/GeneralInfoForm.vue";

definePageMeta({
  layout: "offer-create",
});

const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col">
    <Header :title="t('pages.offerCreate.general.title')" icon="file-text" section="offers" />

    <main class="@container/main flex flex-col gap-2 p-4">
      <section class="flex justify-end">
        <Button variant="neutral" :label="t('buttons.next')" suffix-icon="arrow-right" to="/offers/create/attributes" outlined />
      </section>

      <section class="grid grid-cols-1 gap-4 @7xl/main:grid-cols-2">
        <div class="flex flex-col gap-4">
          <GeneralInfoForm />
        </div>
      </section>
    </main>
  </div>
</template>
