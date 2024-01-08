<script setup lang="ts">
const props = defineProps({
  // Size of the loader
  size: {
    type: String as PropType<"sm" | "md" | "lg">,
    default: "md",
  },
});

/**
 * Classes which are applied to the loader
 */
const classes = computed(() => {
  return {
    "animate-spin": true,

    "w-5 h-5": props.size === "sm",
    "w-10 h-10": props.size === "md",
    "w-20 h-20": props.size === "lg",
  };
});
</script>

<template>
  <svg :class="classes" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
    <path
      class="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
</template>
