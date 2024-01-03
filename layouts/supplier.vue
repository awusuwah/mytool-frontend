<template>
  <div id="app-layout">
    <Navigation />

    <main :class="mainClasses">
      <div class="@container/main flex flex-col gap-2 p-4">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Navigation from "@/navigation/Navigation.vue";

import { useAppStore } from "~/stores/app";

const route = useRoute();
const appStore = useAppStore();
const activeStore = useDataStore();

const supplier = ref<Supplier | undefined>(undefined);
const isLoading = ref(false);

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

/**
 * Fetch the supplier from the API and manage the loading state.
 */
const fetchSupplier = async () => {
  isLoading.value = true;
  supplier.value = await useSupplierDetail(route.params.id as string);
  isLoading.value = false;
};

onBeforeMount(async () => {
  await fetchSupplier();
});
</script>
