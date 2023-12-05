<template>
  <div :class="classes">
    <NuxtLink :to="to" class="flex px-4 h-14 items-center text-sm font-bold" :aria-label="label">
      <Icon :graphic="icon" class="inline h-8 w-8" />

      <span v-if="sidebarOpen" class="ml-2 whitespace-nowrap">{{ label }}</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { Icon } from "webcc-ui-components";

import { useAppStore } from "~/stores/app";

const route = useRoute();
const appStore = useAppStore();

// Determine if the sidebar is open
const sidebarOpen = computed(() => appStore.sidebarOpen);

const props = defineProps({
  // The icon which is displayed for the navigation item.
  icon: {
    type: String,
    required: true,
  },

  // The label which is displayed for the navigation item + the tooltip.
  label: {
    type: String,
    required: true,
  },

  // The link where the navigation item should redirect to.
  to: {
    type: String,
    required: true,
  },
});

/**
 * Classes which are applied to the wrapper element.
 */
const classes = computed(() => {
  const fullPath = route.fullPath;

  return {
    "items-center transition-colors w-full": true,

    "bg-thm text-thm-contrast": props.to.slice(1) === "dashboard" && fullPath.includes(props.to),
    "bg-offer text-thm-contrast": props.to.slice(1) === "offers" && fullPath.includes(props.to),
    "bg-supplier text-thm-contrast": props.to.slice(1) === "suppliers" && fullPath.includes(props.to),
    "bg-accommodation text-thm-contrast": props.to.slice(1) === "accommodations" && fullPath.includes(props.to),
  };
});
</script>
