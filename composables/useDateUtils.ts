import { format, parseISO } from "date-fns";

/**
 * Allow the usage of date utilities in the application.
 */
export default function useDateUtils() {
  const FORMAT = "dd.MM.yyyy";

  /**
   * Formats a date string to a human readable format.
   *
   * @param { string } date - The date string to format.
   * @param { boolean } withTime - If the time should be included in the formatted date.
   */
  const formatDate = (date: Date | string, formatTemplate: string = FORMAT, withTime: boolean = false) => {
    try {
      if (!date) return "";

      // Check if date is a string, if so, parse it
      const parsedDate = typeof date === "string" ? parseISO(date) : date;

      // If the time should be included or not
      const dateFormat = withTime ? `${formatTemplate} hh:mm:ss` : formatTemplate;

      // Format the date
      return format(parsedDate, dateFormat);
    } catch (error) {
      console.error("Error formatting date: ", error);
      return "";
    }
  };

  return { formatDate };
}
