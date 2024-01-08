<script setup lang="ts">
import { Button, Card, Heading, Icon, IconButton, Table, TableRow, Tooltip } from "webcc-ui-components";

const emit = defineEmits(["refresh:turnovers"]);
const props = defineProps({
  // The turnovers which have been fetched from the API
  turnovers: {
    type: Object as PropType<Turnover[] | null>,
    default: null,
  },

  // Whether the component is loading or not.
  loading: {
    type: Boolean,
    default: false,
  },

  // The year which is currently being viewed
  selectedYear: {
    type: Object as PropType<ValueLabel>,
    default: () => ({ label: "", value: "" }),
  },
});

const { t } = useI18n();
const turnoverCollapsedOnMobile = ref(true);

/**
 * Clamp the turnovers down to the selected year.
 */
const turnoversForSelectedYear = computed(() => {
  return props.turnovers?.filter((to) => to.year.toString() === props.selectedYear.value);
});

/**
 * The columns for the turnover table.
 */
const columns = computed(() => {
  const cellClasses = ` pr-2 w-4 md:w-auto align-text-top
       after:font-normal after:text-xs after:text-txt-500`;

  return [
    {
      key: "category",
      label: props.selectedYear?.label,
      class: "w-full md:w-auto",
    },
    {
      key: "days",
      label: t("components.priceMatrix.turnover.table.days"),
    },
    {
      key: "purchase",
      label: t("components.priceMatrix.turnover.table.potentialTurnover"),
      class: `${cellClasses} type-purchase`,
    },
    {
      key: "purchaseNet",
      label: t("components.priceMatrix.turnover.table.potentialTurnoverNet"),
      class: `${cellClasses} type-purchase`,
      tooltip: t("components.priceMatrix.turnover.table.tooltips.potentialTurnoverNet"),
    },
    {
      key: "sales",
      label: t("components.priceMatrix.turnover.table.turnover"),
      class: `${cellClasses} type-sales`,
    },
  ];
});
</script>

<template>
  <div class="flex-1">
    <Card
      class="w-full flex items-center justify-between gap-x-2 md:hidden"
      :class="{ hidden: !turnoverCollapsedOnMobile }"
      compact
      @click="turnoverCollapsedOnMobile = !turnoverCollapsedOnMobile"
    >
      <Heading appearance="title5" render-as="h3" class="relative flex justify-between">
        {{ $t("components.priceMatrix.turnover.title") }} {{ selectedYear?.label }}
      </Heading>

      <Icon graphic="arrow-down" class="w-5 h-5" />
    </Card>

    <Table
      :data="turnoversForSelectedYear || []"
      :columns="columns"
      cell-padding="compact"
      class="overflow-visible"
      :class="{ 'hidden md:block': turnoverCollapsedOnMobile }"
      :style="{
        'turnovertype-purchase': t('components.priceMatrix.turnover.table.purchase'),
        'turnovertype-sales': t('components.priceMatrix.turnover.table.sales'),
      }"
    >
      <template #toolbar>
        <div class="w-full flex flex-row items-center justify-between gap-x-2">
          <Heading appearance="title5" render-as="h3">
            {{ $t("components.priceMatrix.turnover.title", { year: selectedYear.label }) }}
          </Heading>

          <div class="flex gap-x-2">
            <Button variant="neutral" @click="emit('refresh:turnovers')">
              {{ t("components.priceMatrix.turnover.table.buttons.refresh") }}

              <template #suffix>
                <Tooltip>
                  <div class="sm:w-72">{{ $t("components.priceMatrix.turnover.table.buttons.refreshTooltip") }}</div>
                </Tooltip>
              </template>
            </Button>

            <IconButton
              type="button"
              icon="close"
              variant="transparent"
              class="md:hidden"
              @click.stop="turnoverCollapsedOnMobile = !turnoverCollapsedOnMobile"
            />
          </div>
        </div>
      </template>

      <template #tbody="{ filteredData }">
        <TableRow
          class="text-xs md:text-sm"
          cell-padding="compact"
          :columns="columns"
          :entry="filteredData.find((to: Turnover) => to.category === 'H')"
        >
          <div slot="category" class="inline-flex items-center gap-1 -my-1 text-xs leading-3 text-txt-400">
            Just Highseason

            <Tooltip>
              <div class="sm:w-72">{{ $t("components.priceMatrix.turnover.table.tooltips.justHighseason") }}</div>
            </Tooltip>
          </div>
        </TableRow>

        <TableRow
          class="text-xs md:text-sm"
          cell-padding="compact"
          :columns="columns"
          :entry="filteredData.find((to: Turnover) => to.category === 'S')"
        >
          <div slot="category" class="inline-flex items-center gap-1 -my-1 text-xs leading-3 text-txt-400">
            Standard

            <Tooltip>
              <div class="sm:w-72">{{ $t("components.priceMatrix.turnover.table.tooltips.standard") }}</div>
            </Tooltip>
          </div>
        </TableRow>

        <TableRow
          class="text-xs md:text-sm"
          cell-padding="compact"
          :columns="columns"
          :entry="filteredData.find((to: Turnover) => to.category === 'T')"
        >
          <div slot="category" class="inline-flex items-center gap-1 -my-1 text-xs leading-3 text-txt-400">
            Top 25%

            <Tooltip>
              <div class="sm:w-72">{{ $t("components.priceMatrix.turnover.table.tooltips.top25") }}</div>
            </Tooltip>
          </div>
        </TableRow>
      </template>

      <template v-if="loading" #tfoot>
        <tfoot class="bg-bgr">
          <tr v-for="i in 3" :key="i">
            <td colspan="4" class="px-4 py-1">
              <div class="w-full h-4 skeleton"></div>
            </td>
          </tr>
        </tfoot>
      </template>

      <template v-if="loading" #nofound>
        <div></div>
      </template>
    </Table>

    <component :is="'style'">
      .type-purchase::after{content:'{{ $t("components.priceMatrix.turnover.table.purchase") }}'} .type-sales::after{content:'{{
        $t("components.priceMatrix.turnover.table.sales")
      }}'}
    </component>
  </div>
</template>
