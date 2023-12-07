<template>
  <aside :class="asideClasses">
    <nav :class="navClasses">
      <NuxtLink to="/" class="text-sm font-bold">
        <Icon graphic="mytool-icon" class="m-auto" :class="iconClasses" />
      </NuxtLink>

      <div class="flex flex-col text-txt-400 list-none md:mt-32 md:min-w-full">
        <NavigationItem :label="t('pages.dashboard.title')" icon="bar-chart-grouped" to="/dashboard" class="mb-10" />
        <NavigationItem :label="t('pages.offers.title')" icon="file-text" to="/offers" />
        <NavigationItem :label="t('pages.suppliers.title')" icon="group" to="/suppliers" />
        <NavigationItem :label="t('pages.accommodations.title')" icon="home" to="/accommodations" />
      </div>

      <div class="absolute left-2 bottom-1">
        <ContextMenu ref="contextMenuRef" class="hidden md:block" :options="contextOptions" @click="contextOptionSelected">
          <section v-if="authStore.getUser" class="flex items-center justify-start gap-2 px-2 py-3 bg-bgr-200">
            <dl class="leading-none">
              <dt class="text-txt-400 text-xs font-normal">
                {{ t("components.navigation.contextMenu.loggedInAs") }}
              </dt>
              <dd>{{ authStore.getUser?.fullname || "Unknown User" }}</dd>
            </dl>
          </section>
        </ContextMenu>
      </div>

      <Button
        variant="neutral"
        class="absolute right-0 hidden px-2 border-r-0 rounded-none rounded-l-lg bottom-20 md:px-2 md:block"
        outlined
        @click="appStore.setSidebarOpen(!sidebarOpen)"
      >
        <Icon :graphic="sidebarOpen ? 'arrow-left' : 'arrow-right'" class="block w-4 h-4 m-0" />
      </Button>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { Button, ContextMenu, Icon } from "webcc-ui-components";

import NavigationItem from "@/navigation/NavigationItem.vue";

import { useAppStore } from "~/stores/app";
import { useAuthStore } from "~/stores/auth";

const { t } = useI18n();
const router = useRouter();
const appStore = useAppStore();
const authStore = useAuthStore();

const contextMenuRef = ref<ContextMenuRefType | null>(null);

// Determine if the sidebar is open
const sidebarOpen = computed(() => appStore.sidebarOpen);

/**
 * Classes which are applied to the aside element.
 */
const asideClasses = computed(() => ({
  "flex justify-between bg-bgr z-0 shadow-xl transition-all md:fixed md:left-0 md:top-0 md:flex-row md:flex-nowrap md:min-h-full md:overflow-y-visible md:overflow-x-hidden":
    true,
  "md:w-72": sidebarOpen.value,
  "md:w-16": !sidebarOpen.value,
}));

/**
 * Classes which are applied to the navigation element.
 */
const navClasses = computed(() => ({
  "absolute top-0 left-0 right-0 z-50 items-center flex-1 h-auto overflow-x-hidden overflow-y-auto rounded-b shadow isolate md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:shadow-none":
    true,
  hidden: true,
}));

/**
 * Classes which are applied to the icon element.
 */
const iconClasses = computed(() => ({
  "w-20 h-20 mt-5": sidebarOpen.value,
  "w-14 h-14": !sidebarOpen.value,
}));

/**
 * The options which are available in the context menu.
 */
const contextOptions = computed(() => {
  const allOptions = [
    {
      label: t("components.navigation.contextMenu.options.settings"),
      value: "settings",
      prefixIcon: "settings",
    },
    {
      label: t("components.navigation.contextMenu.options.login"),
      value: "login",
      prefixIcon: "login",
    },
    {
      label: t("components.navigation.contextMenu.options.logout"),
      value: "logout",
      prefixIcon: "logout",
    },
  ];

  // Remove the login / logout options depending on the user's authentication state
  if (!authStore.getUser) {
    return allOptions.filter((option) => option.value !== "logout");
  } else {
    return allOptions.filter((option) => option.value !== "login");
  }
});

/**
 * Handle when any context menu option is selected and act accordingly.
 *
 * @param { String } value - The value of the selected option.
 */
const contextOptionSelected = (value: string): void => {
  if (contextMenuRef.value) {
    contextMenuRef.value.selected = null;
  }

  switch (value) {
    case "settings":
      router.push("/settings");
      break;

    case "login":
      router.push("/login");
      break;

    case "logout":
      // TODO: Implement logout logic with the small microsoft online logout window
      console.warn("Logout is not implemented yet! Nothing will happen :)");
      break;

    default:
      console.info(`You have selected the option ${value} which is not fully implemented! Nothing will happen :)`);
      break;
  }
};

type ContextMenuRefType = {
  selected: string | null;
};
</script>

<style>
.activator-icon-button > div {
  right: -0.75rem;
}
</style>
