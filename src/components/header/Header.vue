<template>
  <header :class="headerClasses">
    <div class="flex items-center flex-grow space-x-4 overflow-x-hidden text-3xl font-thin text-thm-contrast md:text-3xl xl:text-4xl">
      <Icon v-if="icon" :graphic="icon" class="flex-shrink-0 w-9 h-9 inline" />
      <h1 v-if="title" class="overflow-hidden leading-normal truncate">
        {{ title }}
      </h1>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "webcc-ui-components";

const props = defineProps({
  // The icon to display in the header
  icon: {
    type: String,
    default: null,
  },

  // The title to display in the header
  title: {
    type: String,
    required: true,
  },

  // The section colors for the header
  section: {
    type: String,
    default: "default",
    validator: (value: string) => ["default", "offers", "suppliers", "accommodations"].includes(value),
  },
});

/**
 * Classes which are applied to the header element.
 */
const headerClasses = computed(() => ({
  "flex items-center justify-between gap-4 px-6 h-14": true,

  "bg-thm text-white": props.section === "default",
  "bg-gradient-to-r from-thm via-thm to-offer text-white": props.section === "offers",
  "bg-gradient-to-r from-thm via-thm to-supplier text-white": props.section === "suppliers",
  "bg-gradient-to-r from-thm via-thm to-accommodation text-white": props.section === "accommodations",
}));
</script>
