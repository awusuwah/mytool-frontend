<template>
  <div class="flex flex-col leading-tight">
    <label class="text-txt-600 text-xs leading-tight truncate">
      {{ label }}
    </label>

    <div>
      <slot v-if="!isLoading">
        <output class="text-base leading-tight">{{ value }}</output>
      </slot>
      <div v-else class="skeleton mt-1"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  // The label of the data display.
  label: {
    type: String,
    default: null,
  },

  // The value of the data display.
  value: {
    type: [String, Number],
    default: null,
  },

  // Whether the data display is loading.
  isLoading: {
    type: Boolean,
    default: false,
  },
});
</script>
