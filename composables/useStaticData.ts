/**
 * Allow usage of static data in the application. This is useful for data like
 * salutation options, accommodation types, etc. Things that are not likely to change.
 */
export default function useStaticData() {
  /**
   * Get the communication language options.
   */
  const getCommunicationLanguageOptions = () => {
    const { t } = useI18n();

    return [
      { value: "ca", label: t("general.language.ca") },
      { value: "cs", label: t("general.language.cs") },
      { value: "da", label: t("general.language.da") },
      { value: "de", label: t("general.language.de") },
      { value: "en", label: t("general.language.en") },
      { value: "es", label: t("general.language.es") },
      { value: "fi", label: t("general.language.fi") },
      { value: "fr", label: t("general.language.fr") },
      { value: "hr", label: t("general.language.hr") },
      { value: "hu", label: t("general.language.hu") },
      { value: "it", label: t("general.language.it") },
      { value: "nl", label: t("general.language.nl") },
      { value: "no", label: t("general.language.no") },
      { value: "pl", label: t("general.language.pl") },
      { value: "pt", label: t("general.language.pt") },
      { value: "ru", label: t("general.language.ru") },
      { value: "sv", label: t("general.language.sv") },
      { value: "tr", label: t("general.language.tr") },
    ];
  };

  /**
   * Get the payment period options.
   */
  const getPaymentPeriodOptions = () => {
    const { t } = useI18n();

    return [
      { value: "1", label: t("general.paymentPeriod.monthly") },
      { value: "3", label: t("general.paymentPeriod.quarterly") },
      { value: "6", label: t("general.paymentPeriod.halfYearly") },
      { value: "A", label: t("general.paymentPeriod.twoWeeksBefore") },
      { value: "B", label: t("general.paymentPeriod.fourWeeksBefore") },
      { value: "0", label: t("general.paymentPeriod.immediately") },
    ];
  };

  /**
   * Get the salutation options.
   */
  const getSalutationOptions = () => {
    const { t } = useI18n();

    return [
      { value: "0001", label: t("general.salutations.0001") },
      { value: "0002", label: t("general.salutations.0002") },
      { value: "0003", label: t("general.salutations.0003") },
      { value: "0004", label: t("general.salutations.0004") },
      { value: "0005", label: t("general.salutations.0005") },
    ];
  };

  return {
    getCommunicationLanguageOptions,
    getPaymentPeriodOptions,
    getSalutationOptions,
  };
}
