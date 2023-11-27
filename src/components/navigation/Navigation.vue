<template>
  <aside :class="asideClasses">
    <nav :class="navClasses">
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
import { Button, Icon } from "webcc-ui-components";

import { useAppStore } from "~/stores/app";

const appStore = useAppStore();

// Determine if the sidebar is open
const sidebarOpen = computed(() => appStore.sidebarOpen);

/**
 * Classes which are applied to the aside element.
 */
const asideClasses = computed(() => ({
  "flex justify-between bg-bgr z-0 shadow-xl transition-all md:fixed md:left-0 md:top-0 md:flex-row md:flex-nowrap md:min-h-full md:overflow-y-visible md:overflow-x-hidden":
    true,
  "md:w-72": sidebarOpen.value === true,
  "md:w-16": sidebarOpen.value === false,
}));

/**
 * Classes which are applied to the navigation element.
 */
const navClasses = computed(() => ({
  "absolute top-0 left-0 right-0 z-50 items-center flex-1 h-auto overflow-x-hidden overflow-y-auto rounded-b shadow isolate md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none":
    true,
  hidden: true,
}));

const open = ref(false);
</script>
