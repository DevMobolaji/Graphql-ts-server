declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: string | undefined;
    dbPass: string
    TEST_HOST: string
  }
}