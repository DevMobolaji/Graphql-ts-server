import * as path from "path";
import * as dotenv from "dotenv";

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, "../config.env") });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
  dbPass: string | undefined;
  TEST_HOST: string | undefined;
  MONGO_URI: string | undefined;
  CLIENT_ID: string | undefined;
  SECRET_CLIENT: string | undefined;
  EMAIL: string | undefined;
  PASSWORD: string | undefined;
  SESSION_NAME: string | undefined;
}

interface Config {
  NODE_ENV: string;
  PORT: number;
  dbPass: string;
  TEST_HOST: string;
  MONGO_URI: string;
  CLIENT_ID: string;
  SECRET_CLIENT: string;
  EMAIL: string;
  PASSWORD: string;
  SESSION_NAME: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    dbPass: process.env.dbPass,
    TEST_HOST: process.env.TEST_HOST || undefined,
    MONGO_URI: process.env.MONGO_URI,
    CLIENT_ID: process.env.CLIENT_ID,
    SECRET_CLIENT: process.env.SECRET_CLIENT,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
    SESSION_NAME: process.env.SESSION_NAME
  };
};

// Throwing an Error if any field was undefined we don't 
// want our app to run if it can't connect to DB and ensure 
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type 
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;