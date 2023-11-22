<template>
  <div class="bg-cta">
    <button @click="themeStore.toggleTheme">Change theme</button>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from "vue";

import { useThemeStore } from "~/stores/theme";
import { syncLocalStorage } from "~/utils/localStorage";

const themeStore = useThemeStore();
const currentTheme = computed(() => themeStore.theme);

useHead({
  title: "Vue 3 + Vite + Tailwind Starter",
  htmlAttrs: {
    class: currentTheme,
  },
  bodyAttrs: {
    class: "bg-bgr",
  },
});

onBeforeMount(() => {
  syncLocalStorage();

  // Check if the user has a previously selected theme
  // - If so, use that theme
  // - If not, determine the theme based on the user's OS preference
  if (currentTheme.value === "") {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      themeStore.setTheme("dark");
    } else {
      themeStore.setTheme("light");
    }
  }
});
</script>
