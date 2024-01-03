/**
 * Allow usage of general utility functions in the application.
 */
export default function useUtils() {
  /**
   * Convert an array of code/name objects to an array of label/value objects.
   *
   * @param { Array<CodeName> } codeNameArray - The array of code/name objects.
   */
  const convertCodeNameToLabelValue = (codeNameArray: CodeName[]) => {
    if (!codeNameArray) return [];

    return codeNameArray.map((codeName) => {
      return {
        label: codeName.name,
        value: codeName.code,
      };
    });
  };

  /**
   * Get the country flag for the given country code. This works well with dropdowns, where
   * both a string and label/value object are valid.
   */
  const getCountryFlag = (country: string | ValueLabel) => {
    if (!country) return "global";

    const countryCode = typeof country === "string" ? country : country.value;
    return countryCode.toLowerCase();
  };

  /**
   * Get the salutation label for a given salutation code.
   *
   * @param { string } salutationCode - The salutation code.
   */
  const getSalutationLabel = (salutationCode: string) => {
    if (!salutationCode) return "No Salutation";

    const { t } = useI18n();

    switch (salutationCode) {
      case "0001":
        return t("general.salutations.0001");

      case "0002":
        return t("general.salutations.0002");

      case "0003":
        return t("general.salutations.0003");

      case "0004":
        return t("general.salutations.0004");

      case "0005":
        return t("general.salutations.0005");
    }
  };

  /**
   * Extract the value from a label/value object which can also be a string.
   */
  const extractValue = (item: ValueLabel | string): string => {
    return typeof item === "string" ? item : item.value;
  };

  return {
    convertCodeNameToLabelValue,
    getCountryFlag,
    getSalutationLabel,
    extractValue,
  };
}
