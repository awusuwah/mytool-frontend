<template>
  <div id="app-layout">
    <Navigation />

    <main :class="mainClasses">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Navigation from "@/navigation/Navigation.vue";

import { useAppStore } from "~/stores/app";

const appStore = useAppStore();

// Determine if the sidebar is open
const sidebarOpen = computed(() => appStore.sidebarOpen);

/**
 * Classes which are applied to the main element. The main element represents the entire page except for the sidebar.
 */
const mainClasses = computed(() => ({
  "background-texture transition-all md:min-h-screen": true,
  "md:ml-72": sidebarOpen.value,
  "md:ml-16": !sidebarOpen.value,
}));
</script>
