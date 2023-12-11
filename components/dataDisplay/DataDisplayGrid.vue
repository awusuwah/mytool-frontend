<template>
  <component :is="as" class="@container/datagrid">
    <div class="grid gap-x-8 gap-y-4 @md/datagrid:gap-y-6 @md/datagrid:grid-cols-2 @xl/datagrid:grid-cols-4">
      <slot />
    </div>
  </component>
</template>

<script setup lang="ts">
defineProps({
  // Render the main element as a certain HTML tag.
  as: {
    type: String,
    default: "div",
  },
});
</script>
