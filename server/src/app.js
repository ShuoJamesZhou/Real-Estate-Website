const express = require("express");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const config = require("./config");

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 600,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
      const p = req.path || "";
      return p.startsWith("/assets/") || p.startsWith("/dist/") || p === "/health";
    }
  })
);

app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());

if (process.env.DATABASE_URL && config.SESSION_SECRET) {
  app.use(
    session({
      name: "qa_appRealEstate.sid",
      store: new pgSession({
        conString: process.env.DATABASE_URL,
        createTableIfMissing: true
      }),
      secret: config.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: config.SECURE_COOKIES,
        maxAge: 30 * 24 * 60 * 60 * 1000
      }
    })
  );
}

app.get("/health", (_req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.json({
    ok: true,
    env: config.APP_ENV,
    nodeEnv: config.NODE_ENV
  });
});

app.use("/api", require("./routes/api.routes"));

const publicDir = config.IS_PRODUCTION_LIKE
  ? path.join(__dirname, "public")
  : path.join(__dirname, "public-src");

app.use(express.static(publicDir));

const server = app.listen(config.PORT, config.BIND_HOST, () => {
  const tag = config.LOCAL_DEV
    ? " (local dev)"
    : config.IS_QA
      ? " (qa)"
      : config.APP_ENV === "production"
        ? " (prod)"
        : "";
  console.log(`appRealEstate listening on ${config.BIND_HOST}:${config.PORT}${tag}`);
  if (config.APP_URL) console.log(`  → APP_URL=${config.APP_URL}`);
});

server.on("error", (err) => {
  if (err && err.code === "EADDRINUSE") {
    console.error(
      `[FATAL] Port already in use: ${config.BIND_HOST}:${config.PORT}. Stop the existing process or set PORT=...`
    );
    process.exit(1);
  }
  console.error("[FATAL] Server failed to start:", err);
  process.exit(1);
});

