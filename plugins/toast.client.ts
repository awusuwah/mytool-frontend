import { defineNuxtPlugin } from "#app";
import * as toasty from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(toasty.default, {
    position: toasty.POSITION.BOTTOM_RIGHT,
    timeout: 4000,
  });

  return {
    provide: {
      toast: toasty.useToast(),
    },
  };
});
