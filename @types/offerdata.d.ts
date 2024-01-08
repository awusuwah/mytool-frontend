/**
 * An attribute as its returned from the API.
 */
type Attribute = {
  desc: string;
  name: string;
  value: string;
  type: AttributeType;
  options?: ValueLabel[];
};

/**
 * The type an attribute can have.
 */
type AttributeType = "BOOLEAN" | "DECIMAL" | "ENUMERATION" | "INTEGER";

/**
 * A single price element.
 */
type Price = {
  currency: string;
  season: PriceSeason;
  period: number;
  margin: number;
  from: string;
  to: string;
  year: number;

  purchase: DailyWeekly;
  purchaseSmart: DailyWeekly;
  sales: DailyWeekly;
  salesSmart: DailyWeekly;
};

type PriceSeason = "L" | "M" | "U" | "H" | "S";

/**
 * Represents a single pricing with daily and weekly prices.
 */
type DailyWeekly = {
  daily: number;
  weekly: number;
};

/**
 * A single turnover element.
 */
type Turnover = {
  category: "H" | "S" | "T";
  days: number;
  year: number;
  sales: string;
  purchase: string;
  purchaseNet: string;
};
