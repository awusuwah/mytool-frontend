import { defineStore } from "pinia";

/**
 * The store which stores the data while creating a new offer. This includes all the data that is needed
 * throughout the creation process.
 */
export const useCreatingStore = defineStore("creating", {
  state: (): State => ({
    metadata: null,
    data: null,
  }),
  getters: {
    /**
     * Get the offer which is currently being created.
     *
     * @returns { any | null } Returns the offer which is currently being created, or null.
     */
    getCreatingOffer(): any | null {
      return this.data;
    },
  },
  actions: {
    /**
     * Set the offer which is currently being created. This is used each time data is being added to the offer.
     *
     * @param { any } offer - The offer which is currently being created.
     */
    setCreatingOffer(offer: any, metadata?: Metadata | null): void {
      if (metadata) this.metadata = metadata;
      this.data = offer;

      if (offer !== null) {
        window.localStorage.setItem("creatingOffer", JSON.stringify(this.data));
      } else {
        window.localStorage.removeItem("creatingOffer");
      }
    },

    /**
     * Set the attributes for the offer which is currently being created.
     *
     * @param { Attribute[] | Object } attributes - The attributes for the offer which is currently being created.
     */
    setCreatingOfferAttributes(attributes: Attribute[] | Object): void {
      this.data.attributes = attributes;

      window.localStorage.setItem("creatingOffer", JSON.stringify(this.data));
    },

    /**
     * Set the prices for the offer which is currently being created.
     *
     * @param { Price[] } prices - The prices for the offer which is currently being created.
     */
    setCreatingOfferPrices(prices: Price[]): void {
      this.data.prices = prices;

      window.localStorage.setItem("creatingOffer", JSON.stringify(this.data));
    },

    /**
     * Set the turnovers for the offer which is currently being created.
     *
     * @param { Turnover[] } turnovers - The turnovers for the offer which is currently being created.
     */
    setCreatingOfferTurnovers(turnovers: Turnover[]): void {
      this.data.turnovers = turnovers;

      window.localStorage.setItem("creatingOffer", JSON.stringify(this.data));
    },

    /**
     * Clear the offer which is currently being created. This resets the store to it's initial state
     * and clears the localStorage of all values which relate to the creation process.
     */
    clearCreatingOffer(): void {
      this.data = null;
      this.metadata = null;

      window.localStorage.removeItem("creatingOffer");
    },
  },
});

type State = {
  metadata?: Metadata | null;
  data?: any | null;
};

type Metadata = {
  id: string;
  currentStep: number;
};
