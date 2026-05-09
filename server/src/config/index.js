require("dotenv").config();

function must(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

const NODE_ENV = process.env.NODE_ENV || "development";
const APP_ENV_RAW = (process.env.APP_ENV || "").trim().toLowerCase();
const APP_ENV_ALLOWED = new Set(["development", "qa", "production"]);
const APP_ENV = APP_ENV_ALLOWED.has(APP_ENV_RAW)
  ? APP_ENV_RAW
  : NODE_ENV === "production"
    ? "production"
    : "development";

const IS_QA = APP_ENV === "qa";
const IS_PRODUCTION_LIKE = NODE_ENV === "production" || IS_QA;
const LOCAL_DEV = process.env.LOCAL_DEV === "true";

function defaultPort() {
  if (LOCAL_DEV) return 5106;
  if (IS_QA) return 5006;
  if (APP_ENV === "production") return 3006;
  return 5106;
}

module.exports = {
  NODE_ENV,
  APP_ENV,
  IS_QA,
  IS_PRODUCTION_LIKE,
  LOCAL_DEV,

  PORT: Number(process.env.PORT || defaultPort()),
  BIND_HOST: String(process.env.BIND_HOST || (LOCAL_DEV ? "127.0.0.1" : "0.0.0.0")),

  APP_URL: process.env.APP_URL || null,
  DATABASE_URL: process.env.DATABASE_URL ? must("DATABASE_URL") : null,
  SESSION_SECRET: process.env.SESSION_SECRET || (LOCAL_DEV ? "dev-secret" : null),
  SECURE_COOKIES: String(process.env.SECURE_COOKIES || "").toLowerCase() === "true"
};

