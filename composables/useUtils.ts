/**
 * Allow usage of general utility functions in the application.
 */
export default function useUtils() {
  /**
   * Convert an array of code/name objects to an array of label/value objects.
   *
   * @param { Array<CodeName> } codeNameArray - The array of code/name objects.
   */
  const convertCodeNameToLabelValue = (codeNameArray: CodeName[] | undefined): ValueLabel[] => {
    if (!codeNameArray) return [];

    return codeNameArray.map((codeName) => {
      return {
        label: codeName.name,
        value: codeName.code,
      };
    });
  };

  /**
   * Convert an array of code/name objects to an array of label/value objects. This will also populate the
   * `prefixIcon` property with the given icons.
   *
   * @param { Array<CodeName> } codeNameArray - The array of code/name objects.
   */
  const convertCodeNameToLabelValueWithIcons = (codeNameArray: CodeName[] | undefined): ValueLabel[] => {
    if (!codeNameArray) return [];

    return codeNameArray.map((codeName) => {
      return {
        label: codeName.name,
        value: codeName.code,
        prefixIcon: codeName.code.toLowerCase(),
      };
    });
  };

  /**
   * Convert an array of season models to an array of label/value objects.
   *
   * @param { Array<SeasonModel> } seasonModelsArray - The array of season models.
   */
  const convertSeasonModelsToLabelValue = (seasonModelsArray: SeasonModel[] | undefined): ValueLabel[] => {
    if (!seasonModelsArray) return [];

    return seasonModelsArray.map((seasonModel) => {
      return {
        label: seasonModel.name,
        value: seasonModel.id,
        suffixText: seasonModel.code,
      };
    });
  };

  /**
   * Get the country flag for the given country code. This works well with dropdowns, where
   * both a string and label/value object are valid.
   */
  const getCountryFlag = (country: string | ValueLabel) => {
    if (!country) return "global";
    if (typeof country !== "string" && !country.value) return "global";

    const countryCode = typeof country === "string" ? country : country.value;
    return countryCode.toLowerCase();
  };

  /**
   * Get the name for the given country code.
   *
   * @param { String } countryCode - The country code to get the name for.
   */
  const getCountryName = (countryCode: string): string => {
    const allCountries = useStaticStore().getCountries;
    if (!allCountries) return "No Country";

    return allCountries.find((country) => country.code.toLowerCase() === countryCode.toLowerCase())?.name ?? "";
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
    convertCodeNameToLabelValueWithIcons,
    convertSeasonModelsToLabelValue,
    getCountryFlag,
    getCountryName,
    getSalutationLabel,
    extractValue,
  };
}
