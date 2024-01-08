import { defineStore } from "pinia";

/**
 * The store which stores the data for the application. This includes currently active data (offers,
 * suppliers & accommodations) and the data of the previously viewed offers, suppliers & accommodations.
 */
export const useDataStore = defineStore("data", {
  state: (): State => ({
    active: {
      offer: null,
      supplier: null,
      accommodation: null,
    },
    recent: {
      offers: [],
      suppliers: [],
      accommodations: [],
    },
  }),
  getters: {
    /**
     * Get the currently active offer.
     *
     * @returns { Offer | null } Returns the active offer or `null` if there is no active offer.
     */
    getActiveOffer(): Offer | null {
      return this.active.offer;
    },

    /**
     * Get the currently active supplier.
     *
     * @returns { Supplier | null } Returns the active supplier or `null` if there is no active supplier.
     */
    getActiveSupplier(): Supplier | null {
      return this.active.supplier;
    },

    /**
     * Get the currently active accommodation.
     *
     * @returns { any | null } Returns the active accommodation or `null` if there is no active accommodation.
     */
    getActiveAccommodation(): any | null {
      // TODO: Add type for accommodation once it's known
      return this.active.accommodation;
    },

    /**
     * Get the recently active offers.
     *
     * @returns { RecentOffer[] } Returns the recently active offers or an empty array if there are no recently active offers.
     */
    getRecentOffers(): RecentOffer[] {
      return this.recent.offers;
    },

    /**
     * Get the recently active suppliers.
     *
     * @returns { RecentSupplier[] } Returns the recently active suppliers or an empty array if there are no recently active suppliers.
     */
    getRecentSuppliers(): RecentSupplier[] {
      return this.recent.suppliers;
    },

    /**
     * Get the recently active accommodations.
     *
     * @returns { any[] } Returns the recently active accommodations or an empty array if there are no recently active accommodations.
     */
    getRecentAccommodations(): any[] {
      return this.recent.accommodations;
    },
  },
  actions: {
    /**
     * Set the currently active offer. This will also add the offer to the list of recently active offers.
     *
     * @param { Offer | null } offer - The offer which should be set as active.
     */
    setActiveOffer(offer: Offer | null) {
      this.active.offer = offer;
      if (offer === null) return;

      // Prepare the new recent offer object
      const recentOffer: RecentOffer = {
        id: offer.state,
        status: offer.state,

        country: offer.accommodation.country,
        region: offer.accommodation.region.name,
        place: offer.accommodation.place.name,

        supplier: {
          id: offer.supplier.id,
          name: `${offer.supplier.address.firstname} ${offer.supplier.address.lastname}`.trim(),
        },
      };

      // Remove the offer from the recent offers list if it already exists
      this.recent.offers = this.recent.offers.filter((recentOffer) => recentOffer.id !== recentOffer.id);
      this.recent.offers.unshift(recentOffer);

      // If the list is longer than 10 items, remove the last item
      if (this.recent.offers.length > 10) this.recent.offers.pop();

      window.localStorage.setItem("recentData", JSON.stringify(this.recent));
    },

    /**
     * Set the currently active supplier. This will also add the supplier to the list of recently active suppliers.
     *
     * @param { Supplier | null } supplier - The supplier which should be set as active.
     */
    setActiveSupplier(supplier: Supplier | null) {
      this.active.supplier = supplier;
      if (supplier === null) return;

      // Prepare the new recent supplier object
      const recentSupplier: RecentSupplier = {
        id: supplier.id,
        status: "",

        name: `${supplier.address.firstname} ${supplier.address.lastname}`.trim(),
        email: supplier.emails.find((email) => email.main === true)?.data ?? "No email address found",

        country: supplier.address.country,
        place: supplier.address.place,
        streetAndNumber: supplier.address.streetAndNumber,
        zip: supplier.address.zip,
      };

      // Remove the supplier from the recent suppliers list if it already exists
      this.recent.suppliers = this.recent.suppliers.filter((recentSupplier) => recentSupplier.id !== recentSupplier.id);
      this.recent.suppliers.unshift(recentSupplier);

      // If the list is longer than 10 items, remove the last item
      if (this.recent.suppliers.length > 10) this.recent.suppliers.pop();

      window.localStorage.setItem("recentData", JSON.stringify(this.recent));
    },

    /**
     * Set the currently active accommodation. This will also add the accommodation to the list of recently active accommodations.
     *
     * @param { any | null } accommodation - The accommodation which should be set as active.
     */
    setActiveAccommodation(accommodation: any | null) {
      this.active.accommodation = accommodation;
    },
  },
});

type State = {
  active: {
    offer: Offer | null;
    supplier: Supplier | null;
    accommodation: any | null;
  };
  recent: {
    offers: RecentOffer[];
    suppliers: RecentSupplier[];
    accommodations: any[];
  };
};

/**
 * Partial data of an offer. This is all the data which is needed to display an offer in the `recent` list.
 */
export type RecentOffer = {
  id: string;
  status: string;

  country: CodeName;
  region: string;
  place: string;

  supplier: {
    id: string;
    name: string;
  };
};

/**
 * Partial data of a supplier. This is all the data which is needed to display a supplier in the `recent` list.
 */
export type RecentSupplier = {
  id: string;
  status: string;

  name: string;
  email: string;

  country: string;
  streetAndNumber: string;
  zip: string;
  place: string;
};

export type CodeName = {
  code: string;
  name: string;
};

export type ValueLabel = {
  value: string;
  label: string;
  prefixIcon?: string;
  suffixText?: string;
};
