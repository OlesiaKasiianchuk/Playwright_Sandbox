export type BookStoreUserCredentials = {
  username: string;
  password: string;
};

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} must be set to run the bookstore tests.`);
  }
  return value;
}

export function createBookStoreUserData(): BookStoreUserCredentials {
  return {
    username: `playwright_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
    password: requiredEnvironmentVariable('BOOKSTORE_TEST_PASSWORD'),
  };
}

export function getBookStoreUserData(): BookStoreUserCredentials {
  return {
    username: 'OKBooks',
    password: 'OKBooks2026!',
  };
}