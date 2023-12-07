import { defineStore } from "pinia";

/**
 * The store which stores the authentication state for the currently signed in user. This includes things like
 * the user's buying offices, his data, permissions, etc.
 */
export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null as string | null,
    user: null as User | null,
  }),
  getters: {
    /**
     * Get the authenticated user's access token.
     *
     * @returns { String | null } Returns the user's access token, or null.
     */
    getAccessToken(): string | null {
      return this.accessToken;
    },

    /**
     * Get the authenticated user's data.
     *
     * @returns { User | null } Returns the user's data, or null.
     */
    getUser(): User | null {
      return this.user;
    },

    /**
     * Get the authenticated user's buying offices.
     *
     * @returns { UserBuyingOffice[] } Returns the user's buying offices, or null.
     */
    getUserBuyingOffices(): UserBuyingOffice[] | null {
      return this.user?.buyingOffices ?? null;
    },

    /**
     * Get the authenticated user's country. It takes the value from the first buying office.
     *
     * @returns { String | null } Returns the user's country, or null.
     */
    getUserCountry(): string | null {
      return this.user?.buyingOffices[0].country ?? null;
    },
  },
  actions: {
    /**
     * Set the user's access token. This token will be used for any authenticated API calls.
     *
     * @param { String } accessToken - The access token for the authenticated user.
     */
    setAccessToken(accessToken: string | null): void {
      this.accessToken = accessToken;

      if (accessToken) {
        window.localStorage.setItem("accessToken", accessToken);
        return;
      }

      window.localStorage.removeItem("accessToken");
    },

    /**
     * Set the user's data.
     *
     * @param { User } user - The data for the authenticated user.
     */
    setUser(user: User | null): void {
      this.user = user;
      if (user) {
        window.localStorage.setItem("user", JSON.stringify(user));
        return;
      }

      window.localStorage.removeItem("user");
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
