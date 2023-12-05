<template>
  <div class="flex flex-col">
    <Header :title="t('pages.login.title')" icon="login" section="default" />

    <div class="p-4">
      <Card class="space-y-4 max-w-4xl">
        <Heading appearance="title4" render-as="h2">
          {{ t("components.loginForm.title") }}
        </Heading>

        <FormalTextInput v-model="email" type="text" :label="t('inputs.email.label')" placeholder="max.muster@hotelplan.com" />
        <FormalTextInput
          v-model="password"
          type="password"
          :label="t('inputs.password.label')"
          :placeholder="t('inputs.password.placeholder')"
        />

        <div class="flex justify-end">
          <Button variant="cta" :label="t('components.loginForm.submit')" @click="authenticateUser" />
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import { Button, Card, FormalTextInput, Heading } from "webcc-ui-components";
import Header from "@/header/Header.vue";

const { t } = useI18n();

const email = ref("");
const password = ref("");

/**
 * Authenticate the user with the given credentials.
 */
const authenticateUser = async () => {
  // TODO: Implement the login method for developers
};
</script>
