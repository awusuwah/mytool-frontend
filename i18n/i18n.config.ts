import enButtons from "./en/buttons";
import enComponents from "./en/components";
import enGeneral from "./en/general";
import enInputs from "./en/inputs";
import enPages from "./en/pages";

export default {
  legacy: false,
  locale: "dev",
  messages: {
    en: {
      components: enComponents,
      pages: enPages,
      inputs: enInputs,
      buttons: enButtons,
      general: enGeneral,
    },
  },
};
