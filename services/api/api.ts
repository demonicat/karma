import { ApisauceInstance, create } from "apisauce";

import { GeneralApiProblem, getGeneralApiProblem } from "./api-problem";

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance;

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup(): void {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: process.env.API_URL,
      timeout: 10000,
      headers: {
        Accept: "application/json",
      },
    });
  }

  async getUserInfo(
    accessToken: string
  ): Promise<{ kind: "ok"; data: Record<string, string> } | GeneralApiProblem> {
    try {
      const response = await this.apisauce.get<Record<string, string>>(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
      );

      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      return { kind: "ok", data: response.data };
    } catch (err) {
      return err.data;
    }
  }
}
