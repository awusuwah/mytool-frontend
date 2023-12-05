import { defineStore } from "pinia";

/**
 * The store which stores the authentication state for the currently signed in user. This includes things like
 * the user's buying offices, his data, permissions, etc.
 */
export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null,
    user: null,
  }),
  getters: {
    /**
     * Get the authenticated user's access token.
     *
     * @returns { Boolean } Returns the user's access token, or null.
     */
    getAccessToken(): boolean {
      return this.accessToken;
    },

    /**
     * Get the authenticated user's data.
     *
     * @returns { Object } Returns the user's data, or null.
     */
    getUser(): User {
      return this.user;
    },

    /**
     * Get the authenticated user's buying offices.
     *
     * @returns { UserBuyingOffice[] } Returns the user's buying offices, or null.
     */
    getUserBuyingOffices(): UserBuyingOffice[] {
      return this.user?.buyingOffices ?? null;
    },

    /**
     * Get the authenticated user's country. It takes the value from the first buying office.
     *
     * @returns { String } Returns the user's country, or null.
     */
    getUserCountry(): string {
      return this.user?.buyingOffices[0].country ?? null;
    },
  },
  actions: {
    /**
     * Set the user's access token. This token will be used for any authenticated API calls.
     *
     * @param { String } accessToken - The access token for the authenticated user.
     */
    setAccessToken(accessToken: string): void {
      this.accessToken = accessToken;
    },

    /**
     * Set the user's data.
     *
     * @param { User } user - The data for the authenticated user.
     */
    setUser(user: User): void {
      this.user = user;
    },
  },
});

export type User = {
  username: string;
  fullname: string;
  email: string;
  buyingOffices: UserBuyingOffice[];
};

export type UserBuyingOffice = {
  id: number;
  country: string;
  countryBo: string;
  purchaserBo: string;
};
