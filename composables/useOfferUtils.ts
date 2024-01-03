/**
 * Allow usage of offer related utilities in the application.
 */
export default function useOfferUtils() {
  /**
   * Get the status color for an offer.
   *
   * @param { string } status - The status of the offer.
   */
  const getStatusColor = (status: string) => {
    if (!status) return "neutral";

    switch (status.toLowerCase()) {
      case "accepted":
        return "success";

      case "rejected":
        return "error";

      case "pending":
      case "sent":
        return "warning";

      case "active":
      case "contract":
        return "info";

      default:
        return "neutral";
    }
  };

  /**
   * Get the status text for an offer.
   *
   * @param status { string } - The status of the offer.
   */
  const getStatusText = (status: string) => {
    const { t } = useI18n();

    switch (status.toLowerCase()) {
      case "accepted":
        return t("general.offer.status.accepted");

      case "rejected":
        return t("general.offer.status.rejected");

      case "pending":
        return t("general.offer.status.pending");

      case "sent":
        return t("general.offer.status.sent");

      case "active":
        return t("general.offer.status.active");

      case "contract":
        return t("general.offer.status.contract");

      default:
        return status.toUpperCase();
    }
  };

  return {
    getStatusColor,
    getStatusText,
  };
}
