/**
 * Return all the data associated with a season.
 *
 * @param { OfferPriceSeason } season - The season whose data should be returned.
 */
export default function useSeason(season: OfferPriceSeason) {
  const { t } = useI18n();

  return [{ code: "L", label: t("general.seasons.S"), color: "" }];
}
