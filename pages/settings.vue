<template>
  <div class="flex flex-col">
    <Header :title="$t('pages.settings.title')" icon="settings" section="default" />

    <div class="p-4">
      <Card class="space-y-4">
        <Heading appearance="title4" render-as="h2">
          {{ $t("components.appSettings.title") }}
        </Heading>

        <FormalDropdown
          :model-value="selectedTheme"
          :label="$t('components.appSettings.inputs.theme.label')"
          :options="themeOptions"
          @update:model-value="themeChanged"
        />

        <FormalDropdown
          :model-value="currentLanguage"
          :label="$t('components.appSettings.inputs.language.label')"
          :options="languageOptions"
          @update:model-value="languageChanged"
        />
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import { Card, FormalDropdown, Heading } from "webcc-ui-components";
import Header from "@/header/Header.vue";

import { useAppStore } from "~/stores/app";
import { useThemeStore } from "~/stores/theme";

const { t } = useI18n();
const appStore = useAppStore();
const themeStore = useThemeStore();

/**
 * The currently active theme.
 */
const currentTheme = computed(() => themeStore.theme);
const currentLanguage = computed(() => appStore.language);

const selectedTheme = ref(currentTheme);

/**
 * The options between which the user can choose from.
 */
const themeOptions = computed(() => [
  {
    label: t("components.appSettings.inputs.theme.options.light"),
    value: "light",
    prefixIcon: "sun",
  },
  {
    label: t("components.appSettings.inputs.theme.options.dark"),
    value: "dark",
    prefixIcon: "moon",
  },
  {
    label: t("components.appSettings.inputs.theme.options.coffee"),
    value: "coffee",
    prefixIcon: "star",
  },
]);

/**
 * The options between which the user can choose from.
 */
const languageOptions = computed(() => [
  {
    label: t("components.appSettings.inputs.language.options.en"),
    value: "en",
  },
  {
    label: t("components.appSettings.inputs.language.options.dev"),
    value: "dev",
  },
]);

/**
 * Update the theme in the store. This will immediately activate the new theme and change the application's colors and styles.
 *
 * @param { string } theme - The new theme which has been selected
 */
const themeChanged = (theme: any) => {
  themeStore.setTheme(theme.value);
};

/**
 * Update the language in the store. This will immediately activate the new language and change the application language.
 *
 * @param { string } language - The new language which has been selected.
 */
const languageChanged = (language: string) => {
  appStore.setLanguage(language);
};
</script>
