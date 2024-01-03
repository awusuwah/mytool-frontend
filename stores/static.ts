import { defineStore } from "pinia";

/**
 * The store which stores the application static data. This includes things like reoccuring values (e.g. the list
 * of available countries, etc.).
 */
export const useStaticStore = defineStore("static", {
  state: () => ({
    countries: [] as CodeName[] | null,
  }),
  getters: {
    /**
     * Get a list of all the countries.
     *
     * @returns { Array } Returns a list of all the stored countries.
     */
    getCountries(): CodeName[] | null {
      return this.countries;
    },
  },
  actions: {
    /**
     * Set the list of countries.
     */
    setCountries(countries: CodeName[] | null) {
      this.countries = countries;
    },
  },
});
