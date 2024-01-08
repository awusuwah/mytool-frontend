<script setup lang="ts">
import { FormalTextInput, TableRow, Tooltip } from "webcc-ui-components";

const { t } = useI18n();
const { formatDate } = useDateUtils();

const emit = defineEmits(["marked:normal", "marked:shift", "update:price"]);

const props = defineProps({
  // The columns for the price matrix table
  columns: {
    type: Array as any,
    required: true,
  },

  // The price which is being displayed in the row
  price: {
    type: Object as PropType<Price>,
    required: true,
  },

  // Whether the row is marked by the user
  marked: {
    type: Boolean,
    default: false,
  },

  // The rent type which is being used (purchase or sales)
  rentType: {
    type: String,
    required: true,
  },

  // The price type which is being used (weekly or daily)
  priceType: {
    type: String,
    required: true,
  },

  // Mark the row as loading
  loading: {
    type: Boolean,
    default: false,
  },

  // Mark the row as invalid
  invalid: {
    type: Boolean,
    default: false,
  },
});

/**
 * The classes which are applied to the rows.
 */
const rowClasses = computed(() => ({
  "bg-thm": props.marked,
  "bg-bgr hover:bg-bgr-200": !props.marked,
}));

/**
 * Whether the purchase input should be disabled.
 */
const purchaseDisabled = computed(() => {
  return props.rentType === "sales" || props.marked;
});

/**
 * Whether the sales input should be disabled.
 */
const salesDisabled = computed(() => {
  return props.rentType === "purchase" || props.marked;
});

const updatePrice = (event: any) => {
  emit("update:price", (event.target as HTMLInputElement).value, props.price.period);
};
</script>

<template>
  <TableRow :columns="columns" :entry="price" :row-classes="rowClasses" cell-padding="compact">
    <template #year>
      <div
        class="w-1 text-xs origin-bottom-right -rotate-90 text-txt-600"
        :title="t('components.priceMatrix.table.tooltips.year', { year: price.year })"
      >
        {{ price.year }}
      </div>
    </template>

    <!-- Price duration -->
    <template #duration>
      <div
        class="h-12 flex flex-col justify-center text-xs cursor-pointer select-none lg:flex-row lg:items-center sm:text-sm md:text-base md:leading-tight"
        @click.exact="emit('marked:normal', price, $event)"
        @click.shift="emit('marked:shift', price, $event)"
      >
        <time class="whitespace-nowrap" :datetime="price.from">
          {{ formatDate(price.from) }}
          <span class="mx-2 hidde md:inline">-</span>
        </time>
        <time class="whitespace-nowrap" :datetime="price.to">
          {{ formatDate(price.to) }}
        </time>
      </div>
    </template>

    <!-- Season -->
    <template #season>
      <div class="h-24 sm:h-12"></div>
      <div class="absolute top-0 bottom-0 right-0 flex flex-row items-center justify-start left-4 sm:left-2 gap-x-2">
        <Tooltip>
          {{ useSeasons(price.season)?.label }}

          <template #activator>
            <h4
              class="content-center hidden w-6 h-6 px-1 font-medium text-center sm:grid"
              :class="{
                'bg-season-low': price.season === 'L',
                'bg-season-mid': price.season === 'M',
                'bg-season-upperMid': price.season === 'U',
                'bg-season-high': price.season === 'H',
                'bg-season-superHigh': price.season === 'S',
              }"
            >
              {{ price.season }}
            </h4>
          </template>
        </Tooltip>

        <div class="grid grid-cols-1 grid-rows-4 sm:grid-rows-3 w-full max-w-[12rem] text-xs lg:hidden">
          <div class="flex items-center justify-start gap-x-4 sm:hidden">
            <h4
              :title="useSeasons(price.season).label"
              class="grid content-center w-5 h-5 px-1 text-sm font-medium text-center"
              :class="{
                'bg-season-low': price.season === 'L',
                'bg-season-mid': price.season === 'M',
                'bg-season-upperMid': price.season === 'U',
                'bg-season-high': price.season === 'H',
                'bg-season-superHigh': price.season === 'S',
              }"
            >
              {{ price.season }}
            </h4>
            <time class="text-sm font-medium ordinal slashed-zero tabular-nums whitespace-nowrap">
              {{ formatDate(price.from) }} - {{ formatDate(price.to) }}
            </time>
          </div>

          <!-- Compact margin -->
          <div class="flex justify-between gap-x-1">
            <label class="truncate text-txt-400 whitespace-nowrap">
              {{ $t("components.priceMatrix.table.margin") }}
            </label>
            <var class="not-italic text-right ordinal slashed-zero tabular-nums">{{ `${price.margin} %` }}</var>
          </div>

          <!-- Compact purchase smart -->
          <div class="flex justify-between gap-x-1">
            <label class="truncate text-txt-400 whitespace-nowrap">
              {{ $t("components.priceMatrix.table.purchaseSmart") }}
            </label>
            <var class="not-italic text-right ordinal slashed-zero tabular-nums">{{ (price.purchaseSmart as any)[priceType] }}</var>
          </div>

          <!-- Compact sales smart -->
          <div class="flex justify-between gap-x-1">
            <label class="truncate text-txt-400 whitespace-nowrap">
              {{ $t("components.priceMatrix.table.salesSmart") }}
            </label>
            <var class="not-italic text-right ordinal slashed-zero tabular-nums">{{ (price.salesSmart as any)[priceType] }}</var>
          </div>
        </div>
      </div>
    </template>

    <!-- Margin -->
    <template #margin>
      {{ `${price.margin} %` }}
    </template>

    <!-- Purchase Smart -->
    <template #purchaseSmart>
      <button v-if="rentType === 'purchase'" type="button" class="hover:underline" tabindex="-1">
        {{ (price.purchaseSmart as any)[priceType] }}
      </button>
      <span v-else>
        {{ (price.purchaseSmart as any)[priceType] }}
      </span>
    </template>

    <!-- Sales Smart -->
    <template #salesSmart>
      <button v-if="rentType === 'sales'" type="button" class="hover:underline" tabindex="-1">
        {{ (price.salesSmart as any)[priceType] }}
      </button>
      <span v-else>
        {{ (price.salesSmart as any)[priceType] }}
      </span>
    </template>

    <!-- Purchase Rent -->
    <template #purchaseRent>
      <FormalTextInput
        v-if="!loading"
        type="number"
        :model-value="(price.purchase as any)[priceType]"
        step=".1"
        text-align="right"
        class="mt-6 -mr-1.5 sm:m-auto"
        :class="{
          'outline outline-thm outline-4 outline-offset-2 rounded-sm': rentType === 'purchase' && marked,
          'max-w-[5rem] sm:max-w-none': rentType === 'sales',
          'min-w-[5rem]': rentType === 'purchase',
        }"
        :disabled="purchaseDisabled"
        :invalid="invalid && !purchaseDisabled"
        @blur="updatePrice"
      >
        <template #prefix>
          <div
            class="absolute flex items-center px-1 -top-7 -right-1 h-7 sm:h-auto sm:relative sm:top-auto sm:right-auto sm:text-sm"
            :class="purchaseDisabled ? 'text-txt-400' : 'text-txt'"
          >
            {{ price.currency }}
          </div>
        </template>
        <template #invalid>
          <div></div>
        </template>
      </FormalTextInput>
      <div v-else class="h-6 skeleton"></div>
    </template>

    <!-- Sales Rent -->
    <template #salesRent>
      <FormalTextInput
        v-if="!loading"
        type="number"
        :model-value="(price.sales as any)[priceType]"
        step=".1"
        text-align="right"
        class="mt-6 -mr-1.5 sm:m-auto"
        :class="{
          'outline outline-thm outline-4 outline-offset-2 rounded-sm': rentType === 'sales' && marked,
          'max-w-[5rem] sm:max-w-none': rentType === 'purchase',
          'min-w-[5rem]': rentType === 'sales',
        }"
        :disabled="salesDisabled"
        :invalid="invalid && !salesDisabled"
        @blur="updatePrice"
      >
        <template #prefix>
          <div
            class="absolute flex items-center px-1 -top-7 -right-1 h-7 sm:h-auto sm:relative sm:top-auto sm:right-auto sm:text-sm"
            :class="salesDisabled ? 'text-txt-400' : 'text-txt'"
          >
            {{ price.currency }}
          </div>
        </template>
        <template #invalid>
          <div></div>
        </template>
      </FormalTextInput>
      <div v-else class="h-6 skeleton"></div>
    </template>
  </TableRow>
</template>
