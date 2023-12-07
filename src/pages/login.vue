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
          <Button variant="cta" :label="t('components.loginForm.submit')" :disabled="!email || !password" @click="authenticateUser" />
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
import useApi from "~/composables/useApi";

const { t } = useI18n();
const api = useApi();

const email = ref("");
const password = ref("");

/**
 * Authenticate the user with the given credentials.
 */
const authenticateUser = async () => {
  const { $config } = useNuxtApp();
  console.log("Base URL: ", $config.public.apiBaseUrl);

  try {
    // 1. Fetch a JWT access token for the user
    const accessToken: LoginTokenResponse = await $fetch("https://login-test.hotelplan.com/oauth/idp/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=password&client_id=localhost-login-test&client_secret=${$config.public.oauthSecret}&username=${email.value}&password=${password.value}&resource=http://localhost:3000`,
    });

    // Show an error when no access token has been found
    if (!accessToken?.access_token) {
      console.error("No access token found in response: ", accessToken);
      return;
    }

    // 2. Get the JWT access token from the internal API
    const jwt = await api.get("/login", {
      headers: {
        Authorization: `Bearer ${accessToken.access_token}`,
      },
    });

    console.log("jwt", jwt);

    console.log("accessToken", accessToken);
  } catch (error) {
    console.error("Error while authenticating user: ", error);
  }
};

type LoginTokenResponse = {
  token_type: string;
  access_token: string;
  expires_in: number;

  refresh_token: string;
  refresh_token_expires_in: number;
};
</script>
