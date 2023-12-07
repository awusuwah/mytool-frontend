import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event);

    // Check that the parameters are valid
    if (!email || !password) {
      return {
        code: "auth/invalid-parameters",
        error: {
          message: 'The "email" and "password" parameters are required',
          response: {
            email,
            password,
          },
        },
      };
    }

    // 1. Fetch the login token for the user
    // -------------------------------------
    const loginTokenResponse: LoginTokenResponse = await fetch("https://login-test.hotelplan.com/oauth/idp/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=password&client_id=localhost-login-test&client_secret=${process.env.OAUTH_CLIENT_SECRET}&username=${email}&password=${password}&resource=http://localhost:3000`,
    }).then((response) => response.json());

    // Show an error when no login token was returned
    if (!loginTokenResponse.access_token) {
      console.error("No login token found in response: ", loginTokenResponse);
      return {
        status: "auth/no-login-token",
        error: {
          message: "No login token found in response",
          data: loginTokenResponse,
        },
      };
    }

    // 2. Get the access token for the user
    // ------------------------------------
    const accessTokenResponse: AccessTokenResponse = await fetch(`${process.env.API_BASE_URL}/webcc-api/v1/easy2use/login`, {
      headers: {
        Authorization: `Bearer ${loginTokenResponse.access_token}`,
      },
    }).then((response) => response.json());

    // Show an error when no access token was returned
    if (!accessTokenResponse.JWT) {
      console.error("No access token found in response: ", accessTokenResponse);
      return {
        status: "auth/no-access-token",
        error: {
          message: "No access token found in response",
          data: accessTokenResponse,
        },
      };
    }

    // 3. Get the user data from the API
    // ---------------------------------
    const userResponse: UserResponse = await fetch(`${process.env.API_BASE_URL}/webcc-api/v1/easy2use/user`, {
      headers: {
        Authorization: `Bearer ${accessTokenResponse.JWT}`,
      },
    }).then((response) => response.json());

    // 4. Return the collected data back to the user
    // ---------------------------------------------
    return {
      status: "auth/success",
      body: {
        accessToken: accessTokenResponse.JWT,
        user: {
          username: userResponse.id.toLowerCase(),
          firstname: userResponse.firstname,
          lastname: userResponse.lastname,
          language: userResponse.language,
          email: userResponse.email,
          country: userResponse.country,
          brand: userResponse.brand,
          countryBo: userResponse.buyingOffices.find((bo) => bo.type === "BO" && bo.isMain) || null,
          purchaserBo: userResponse.buyingOffices.find((bo) => bo.type === "PA" && bo.isMain) || null,
        },
      },
    };
  } catch (error) {
    return {
      status: "auth/unexpected-error",
      error: {
        message: "Some unexpected error occurred while logging you in",
        data: error,
      },
    };
  }
});

type LoginTokenResponse = {
  token_type: string;
  access_token: string;
  expires_in: number;

  refresh_token: string;
  refresh_token_expires_in: number;
};

type AccessTokenResponse = {
  JWT: string;
};

type UserResponse = {
  id: string;
  firstname: string;
  lastname: string;
  language: string;
  email: string;
  country: string;
  brand: string;
  buyingOffices: UserBuyingOffice[];
};

type UserBuyingOffice = {
  code: string;
  type: "BO" | "PA";
  isMain: boolean;
};
