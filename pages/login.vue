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
          <Button
            variant="cta"
            :label="t('components.loginForm.submit')"
            :disabled="!email || !password || loggingIn"
            @click="authenticateUser"
          />
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
import { useAuthStore } from "~/stores/auth";

const { t } = useI18n();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const loggingIn = ref(false);

/**
 * Authenticate the user with the given credentials.
 */
const authenticateUser = async () => {
  const { $toast } = useNuxtApp();

  try {
    loggingIn.value = true;

    // Fetch the access token and user data from the API
    const loginResponse: LoginResponse = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    }).then((response) => response.json());

    // Store the access token and user data in the store
    authStore.setAccessToken(loginResponse.body.accessToken);
    authStore.setUser({
      username: loginResponse.body.user.username,
      fullname: `${loginResponse.body.user.firstname} ${loginResponse.body.user.lastname}`,
      email: loginResponse.body.user.email,
      buyingOffices: [
        {
          id: 1,
          country: loginResponse.body.user.country,
          countryBo: loginResponse.body.user.countryBo.code,
          purchaserBo: loginResponse.body.user.purchaserBo.code,
        },
      ],
    });

    // Preload the countries into the store
    const responseData = await useOfferData();
    useStaticStore().setCountries(responseData?.countries ?? null);

    $toast.success(t("components.loginForm.toasts.success", { username: loginResponse.body.user.username }));

    await navigateTo("/settings");
  } catch (error) {
    $toast.error(t("components.loginForm.toasts.error"));
  } finally {
    loggingIn.value = false;
  }
};

type LoginResponse = {
  status: string;
  body: {
    accessToken: string;
    user: {
      username: string;
      firstname: string;
      lastname: string;
      email: string;

      language: string;
      country: string;
      countryBo: UserBo;
      purchaserBo: UserBo;

      brand: string;
    };
  };
};

type UserBo = {
  code: string;
  type: "BO" | "PA";
  isMain: boolean;
};
</script>
