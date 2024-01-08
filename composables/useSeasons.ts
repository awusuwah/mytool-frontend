/**
 * Return all the data associated with a season.
 *
 * @param { OfferPriceSeason } season - The season whose data should be returned.
 */
export default function useSeason(season: PriceSeason): { code: PriceSeason; label: string } {
  const { t } = useI18n();

  return [
    { code: "L", label: t("general.seasons.S") },
    { code: "M", label: t("general.seasons.M") },
    { code: "U", label: t("general.seasons.U") },
    { code: "H", label: t("general.seasons.H") },
    { code: "S", label: t("general.seasons.S") },
  ];
}
