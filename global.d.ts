declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: string | undefined;
    dbPass: string
    TEST_HOST: string
    MONGO_URI: string
    CLIENT_ID: string
    SECRET_CLIENT: string
    EMAIL: string
    PASSWORD: string
  }
}