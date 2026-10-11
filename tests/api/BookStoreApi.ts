import { APIRequestContext } from '@playwright/test';

export class BookStoreApi {
  constructor(private readonly request: APIRequestContext) {}

  async createUser(username: string, password: string): Promise<string> {
    const response = await this.request.post('/Account/v1/User', {
      data: { userName: username, password },
    });

    if (response.status() !== 201) {
      throw new Error(`Book Store user creation failed with status ${response.status()}.`);
    }

    const responseBody: unknown = await response.json();
    if (
      typeof responseBody !== 'object' ||
      responseBody === null ||
      !('userID' in responseBody) ||
      typeof responseBody.userID !== 'string'
    ) {
      throw new Error('Book Store user creation response did not include a user ID.');
    }

    return responseBody.userID;
  }

  async deleteUser(
    userID: string,
    username: string,
    password: string
  ): Promise<void> {
    const loginResponse = await this.request.post('/Account/v1/Login', {
      data: { userName: username, password },
    });

    if (!loginResponse.ok()) {
      throw new Error(`Book Store API login for cleanup failed with status ${loginResponse.status()}.`);
    }

    const loginBody: unknown = await loginResponse.json();
    if (
      typeof loginBody !== 'object' ||
      loginBody === null ||
      !('token' in loginBody) ||
      typeof loginBody.token !== 'string'
    ) {
      throw new Error('Book Store API login response did not include an auth token.');
    }

    const deleteResponse = await this.request.delete(
      `/Account/v1/User/${userID}`,
      {
        headers: { Authorization: ['Bearer', loginBody.token].join(' ') },
      }
    );

    if (!deleteResponse.ok()) {
      throw new Error(`Book Store user cleanup failed with status ${deleteResponse.status()}.`);
    }
  }
}
