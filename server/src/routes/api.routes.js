const express = require("express");
const { z } = require("zod");
const { prisma } = require("../db");
const { sanitizePlainText } = require("../lib/sanitize");

const router = express.Router();

const ContactSchema = z.object({
  website: z.string().optional().default(""), // honeypot
  first_name: z.string().min(2).max(120),
  last_name: z.string().min(2).max(120),
  email: z.string().email().max(250),
  phone: z.string().min(6).max(40),
  message: z.string().min(10).max(4000)
});

router.post("/contact", async (req, res) => {
  const parsed = ContactSchema.safeParse(req.body || {});
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "invalid_form" });
  }

  // Honeypot: bots fill this.
  if (String(parsed.data.website || "").trim()) {
    return res.status(200).json({ ok: true });
  }

  const body = parsed.data;
  const ip =
    (req.headers["cf-connecting-ip"] && String(req.headers["cf-connecting-ip"])) ||
    (req.headers["x-forwarded-for"] && String(req.headers["x-forwarded-for"]).split(",")[0].trim()) ||
    (req.ip ? String(req.ip) : null);

  const userAgent = req.headers["user-agent"] ? String(req.headers["user-agent"]).slice(0, 400) : null;

  // DB is optional for local/static usage; if DATABASE_URL isn’t set, just accept.
  if (!process.env.DATABASE_URL) {
    return res.status(200).json({ ok: true });
  }

  await prisma.contactEnquiry.create({
    data: {
      firstName: sanitizePlainText(body.first_name),
      lastName: sanitizePlainText(body.last_name),
      email: sanitizePlainText(body.email),
      phone: sanitizePlainText(body.phone),
      message: sanitizePlainText(body.message),
      ip: ip ? sanitizePlainText(ip).slice(0, 80) : null,
      userAgent: userAgent ? sanitizePlainText(userAgent) : null
    }
  });

  return res.status(200).json({ ok: true });
});

module.exports = router;

