<template>
  <div :class="classes">
    <Icon v-if="icon" :graphic="icon" class="hidden w-4 h-4 sm:inline shrink-0" />

    <div class="grid">
      <span class="leading-none truncate">{{ name }}</span>
      <code v-if="code" class="block font-mono text-xs leading-none text-txt-400">{{ code }}</code>
      <span v-if="subline" class="block text-xs leading-none text-txt-400">{{ subline }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "webcc-ui-components";

const props = defineProps({
  // The name for the value to display
  name: {
    type: [Number, String],
    required: true,
  },

  // The code for the value to display
  code: {
    type: [Number, String],
    default: null,
  },

  // The subline for the value to display
  subline: {
    type: String,
    default: null,
  },

  // Shift the icon to the left
  shifted: {
    type: Boolean,
    default: false,
  },

  // The icon to display next to the values
  icon: {
    type: String,
    default: null,
  },
});

/**
 * Classes which are applied to the main wrapper element.
 */
const classes = computed(() => ({
  "relative top-1.5": props.shifted,
  "flex items-center sm:gap-x-2": props.icon,
}));
</script>
