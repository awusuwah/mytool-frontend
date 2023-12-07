<template>
  <main class="flex flex-col gap-10 p-8">
    <div class="flex gap-6">
      <section>
        <Heading appearance="title3" render-as="h1">Call To Action</Heading>
        <div class="flex gap-3">
          <div class="flex flex-col gap-1">
            <div class="flex w-full gap-1">
              <div :class="classesVertical" class="color-strip bg-cta text-cta-contrast">cta</div>
              <div :class="classesVertical" class="color-strip bg-cta-hover text-cta-contrast">cta-hover</div>
              <div :class="classesVertical" class="color-strip bg-cta-active text-cta-contrast">cta-active</div>
            </div>
            <div>
              <div :class="classesHorizontal" class="color-strip w-full bg-cta-contrast text-cta">cta-contrast</div>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="flex w-full gap-1">
              <div :class="classesVertical" class="color-strip bg-cta-light text-cta-light-contrast">cta-light</div>
              <div :class="classesVertical" class="color-strip bg-cta-light-hover text-cta-light-contrast">cta-light-hover</div>
              <div :class="classesVertical" class="color-strip bg-cta-light-active text-cta-light-contrast">cta-light-active</div>
            </div>
            <div>
              <div :class="classesHorizontal" class="color-strip w-full bg-cta-light-contrast text-cta-light">cta-light-contrast</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Heading appearance="title3" render-as="h1">Theme</Heading>
        <div class="flex gap-3">
          <div class="flex flex-col gap-1">
            <div class="flex w-full gap-1">
              <div :class="classesVertical" class="color-strip bg-thm text-thm-contrast">thm</div>
              <div :class="classesVertical" class="color-strip bg-thm-hover text-thm-contrast">thm-hover</div>
              <div :class="classesVertical" class="color-strip bg-thm-active text-thm-contrast">thm-active</div>
            </div>
            <div>
              <div :class="classesHorizontal" class="color-strip w-full bg-thm-contrast text-thm">thm-contrast</div>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="flex w-full gap-1">
              <div :class="classesVertical" class="color-strip bg-thm-light text-thm-light-contrast">thm-light</div>
              <div :class="classesVertical" class="color-strip bg-thm-light-hover text-thm-light-contrast">thm-light-hover</div>
              <div :class="classesVertical" class="color-strip bg-thm-light-active text-thm-light-contrast">thm-light-active</div>
            </div>
            <div>
              <div :class="classesHorizontal" class="color-strip w-full bg-thm-light-contrast text-thm-light">thm-light-contrast</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Heading appearance="title3" render-as="h1">Highlight</Heading>
        <div class="flex gap-3">
          <div class="flex flex-col gap-1">
            <div class="flex w-full gap-1">
              <div :class="classesVertical" class="color-strip bg-hlt text-hlt-contrast">hlt</div>
              <div :class="classesVertical" class="color-strip bg-hlt-hover text-hlt-contrast">hlt-hover</div>
              <div :class="classesVertical" class="color-strip bg-hlt-active text-hlt-contrast">hlt-active</div>
            </div>
            <div>
              <div :class="classesHorizontal" class="w-full color-strip bg-hlt-contrast text-hlt">hlt-contrast</div>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="flex w-full gap-1">
              <div :class="classesVertical" class="color-strip bg-hlt-light text-hlt-light-contrast">hlt-light</div>
              <div :class="classesVertical" class="color-strip bg-hlt-light-hover text-hlt-light-contrast">hlt-light-hover</div>
              <div :class="classesVertical" class="color-strip bg-hlt-light-active text-hlt-light-contrast">hlt-light-active</div>
            </div>
            <div>
              <div :class="classesHorizontal" class="color-strip w-full bg-hlt-light-contrast text-hlt-light">hlt-light-contrast</div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="flex gap-8">
      <section>
        <Heading appearance="title3" render-as="h1">Text</Heading>
        <div class="flex flex-col gap-1">
          <div class="flex w-full gap-1">
            <div :class="classesVertical" class="color-strip bg-txt-100 text-txt-max">txt-100</div>
            <div :class="classesVertical" class="color-strip bg-txt-200 text-txt-max">txt-200</div>
            <div :class="classesVertical" class="color-strip bg-txt-300 text-txt-max">txt-300</div>
            <div :class="classesVertical" class="color-strip bg-txt-400 text-txt-max">txt-400</div>
            <div :class="classesVertical" class="color-strip bg-txt-500 text-txt-max">txt-500</div>
            <div :class="classesVertical" class="color-strip bg-txt-600 text-txt-min">txt-600</div>
            <div :class="classesVertical" class="color-strip bg-txt-700 text-txt-min">txt-700</div>
            <div :class="classesVertical" class="color-strip bg-txt-800 text-txt-min">txt-800</div>
            <div :class="classesVertical" class="color-strip bg-txt-900 text-txt-min">txt-900</div>
          </div>
          <div>
            <div :class="classesHorizontal" class="color-strip bg-txt text-txt-max">txt</div>
          </div>
        </div>
      </section>

      <section>
        <Heading appearance="title3" render-as="h1">Text (Named)</Heading>
        <div class="flex flex-col gap-1">
          <div class="flex w-full gap-1">
            <div :class="classesVertical" class="color-strip bg-txt-min text-txt-max">txt-min</div>
            <div :class="classesVertical" class="color-strip bg-txt-dim text-txt-max">txt-dim</div>
            <div :class="classesVertical" class="color-strip bg-txt-medium text-txt-max">txt-medium</div>
            <div :class="classesVertical" class="color-strip bg-txt-stress text-txt-min">txt-stress</div>
            <div :class="classesVertical" class="color-strip bg-txt-max text-txt-min">txt-max</div>
          </div>
          <div>
            <div :class="classesHorizontal" class="color-strip bg-txt text-txt-max">txt</div>
          </div>
        </div>
      </section>

      <section>
        <Heading appearance="title3" render-as="h1">Link</Heading>
        <div class="flex flex-col gap-1">
          <div class="flex w-full gap-1">
            <div :class="classesVertical" class="color-strip bg-txt-link text-txt-link-contrast">txt-link</div>
            <div :class="classesVertical" class="color-strip bg-txt-link-hover text-txt-link-contrast">txt-link-hover</div>
            <div :class="classesVertical" class="color-strip bg-txt-link-active text-txt-link-contrast">txt-link-active</div>
          </div>
          <div>
            <div :class="classesHorizontal" class="color-strip bg-txt-link-contrast text-txt-link">txt-link-contrast</div>
          </div>
        </div>
      </section>
    </div>

    <div class="flex gap-6">
      <section>
        <Heading appearance="title3" render-as="h1">Background</Heading>
        <div class="flex flex-col gap-1">
          <div class="flex w-full gap-1">
            <div :class="classesVertical" class="color-strip bg-bgr-100 text-txt-min">bgr-100</div>
            <div :class="classesVertical" class="color-strip bg-bgr-200 text-txt-min">bgr-200</div>
            <div :class="classesVertical" class="color-strip bg-bgr-300 text-txt-min">bgr-300</div>
            <div :class="classesVertical" class="color-strip bg-bgr-400 text-txt-min">bgr-400</div>
            <div :class="classesVertical" class="color-strip bg-bgr-500 text-txt-max">bgr-500</div>
            <div :class="classesVertical" class="color-strip bg-bgr-600 text-txt-max">bgr-600</div>
            <div :class="classesVertical" class="color-strip bg-bgr-700 text-txt-max">bgr-700</div>
            <div :class="classesVertical" class="color-strip bg-bgr-800 text-txt-max">bgr-800</div>
            <div :class="classesVertical" class="color-strip bg-bgr-900 text-txt-max">bgr-900</div>
          </div>
          <div>
            <div :class="classesHorizontal" class="color-strip bg-txt text-txt-max">bgr</div>
          </div>
        </div>
      </section>
    </div>

    <div class="flex gap-6">
      <section>
        <Heading appearance="title3" render-as="h1">Info</Heading>
        <div class="flex flex-col gap-1">
          <div class="flex w-full gap-1">
            <div :class="classesVertical" class="color-strip bg-inf text-inf-contrast">inf</div>
            <div :class="classesVertical" class="color-strip bg-inf-hover text-inf-contrast">inf-hover</div>
            <div :class="classesVertical" class="color-strip bg-inf-active text-inf-contrast">inf-active</div>
            <div :class="classesVertical" class="color-strip bg-inf-light text-inf">inf-light</div>
          </div>
          <div>
            <div :class="classesHorizontal" class="color-strip bg-inf-contrast text-inf">inf-contrast</div>
          </div>
        </div>
      </section>

      <section>
        <Heading appearance="title3" render-as="h1">Warning</Heading>
        <div class="flex flex-col gap-1">
          <div class="flex w-full gap-1">
            <div :class="classesVertical" class="color-strip bg-wrn text-wrn-contrast">wrn</div>
            <div :class="classesVertical" class="color-strip bg-wrn-hover text-wrn-contrast">wrn-hover</div>
            <div :class="classesVertical" class="color-strip bg-wrn-active text-wrn-contrast">wrn-active</div>
            <div :class="classesVertical" class="color-strip bg-wrn-light text-wrn">wrn-light</div>
          </div>
          <div>
            <div :class="classesHorizontal" class="w-full color-strip bg-wrn-contrast text-wrn">wrn-contrast</div>
          </div>
        </div>
      </section>

      <section>
        <Heading appearance="title3" render-as="h1">Success</Heading>
        <div class="flex flex-col gap-1">
          <div class="flex w-full gap-1">
            <div :class="classesVertical" class="color-strip bg-suc text-suc-contrast">suc</div>
            <div :class="classesVertical" class="color-strip bg-suc-hover text-suc-contrast">suc-hover</div>
            <div :class="classesVertical" class="color-strip bg-suc-active text-suc-contrast">suc-active</div>
            <div :class="classesVertical" class="color-strip bg-suc-light text-suc">suc-light</div>
          </div>
          <div>
            <div :class="classesHorizontal" class="w-full color-strip bg-suc-contrast text-suc">suc-contrast</div>
          </div>
        </div>
      </section>

      <section>
        <Heading appearance="title3" render-as="h1">Error</Heading>
        <div class="flex flex-col gap-1">
          <div class="flex w-full gap-1">
            <div :class="classesVertical" class="color-strip bg-err text-err-contrast">err</div>
            <div :class="classesVertical" class="color-strip bg-err-hover text-err-contrast">err-hover</div>
            <div :class="classesVertical" class="color-strip bg-err-active text-err-contrast">err-active</div>
            <div :class="classesVertical" class="color-strip bg-err-light text-err">err-light</div>
          </div>
          <div>
            <div :class="classesHorizontal" class="w-full color-strip bg-err-contrast text-err">err-contrast</div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { Heading, TextInput } from "webcc-ui-components";

export default {
  name: "ColorsPage",
  components: {
    Heading,
    TextInput,
  },
  data() {
    return {
      query: "",
      allColors: [],
    };
  },
  computed: {
    /**
     * Determine which classes need to be applied to the vertical color strips.
     */
    classesVertical() {
      return {
        "vert flex items-center justify-start p-2 w-11 h-36 font-semibold": true,
      };
    },

    /**
     * Determine which classes need to be applied to the horizontal color strips.
     */
    classesHorizontal() {
      return {
        "flex items-center justify-center p-2 h-11 text-sm font-semibold": true,
      };
    },
  },
  mounted() {
    this.calculateColors();
    this.fillColorlist();
  },
  methods: {
    /**
     * Calculate all the colors for all the color strips. This is done to get a list
     * of all the colors as well as show HEX values of each color when hovered.
     */
    calculateColors() {
      const computedColorsBgr = document.querySelectorAll(".color-strip");

      computedColorsBgr.forEach((item) => {
        const computedColor = window.getComputedStyle(item).backgroundColor;
        const hexColor = this.rgb2hex(computedColor);

        item.setAttribute("title", hexColor);
        this.allColors.push({
          elem: item,
          color: hexColor,
        });
      });
    },

    /**
     * Convert RGB to HEX.
     */
    rgb2hex(rgb) {
      const m = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      return m === null
        ? "#fff"
        : `#${m
            .slice(1)
            .map((n) => parseInt(n, 10).toString(16).padStart(2, "0"))
            .join("")}`;
    },

    /**
     * Handle when the user inputs the query. This will check which colors match
     * and which should be grayed out.
     */
    handleInput(value) {
      this.allColors.forEach((color) => {
        if (color.color.toLowerCase().includes(value.toLowerCase())) {
          color.elem.classList.add("grayscale-0");
          color.elem.classList.remove("grayscale");
          return;
        }

        color.elem.classList.add("grayscale");
        color.elem.classList.remove("grayscale-0");
      });
    },

    /**
     * Fill the datalist in the search input with all the colors.
     */
    fillColorlist() {
      // document.getElementById('search-query').setAttribute('list', 'colorlist')
      // ;[...new Set(this.allColors)].forEach((currentValue) => {
      //   const option = document.createElement('option')
      //   option.value = currentValue.color
      //   this.$refs.colorlist.appendChild(option)
      // })
    },
  },
};
</script>

<style scoped>
.vert {
  writing-mode: vertical-lr;
  transform: rotate(180deg);
}
</style>
