const { Router } = require("express");
const { PrismaClient, Role } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { z } = require("zod");

const prisma = new PrismaClient();
const router = Router();

// ------------------------
// Validation schemas
// ------------------------
const credsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// 👇 match the frontend keys: firstName, lastName, insuranceCard
const registerSchema = credsSchema.extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dob: z.string().optional(),            // "YYYY-MM-DD"
  insuranceCard: z.string().optional(),  // can be empty
});

// helper to strip sensitive fields if we ever send a full user
function publicUser(user) {
  if (!user) return null;
  const { passwordHash, ...rest } = user;
  return rest;
}

// ------------------------
// POST /api/auth/register
// ------------------------
router.post("/register", async (req, res, next) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const body = registerSchema.parse(req.body);

    const emailLower = body.email.toLowerCase();

    // 1) Check if email is already used
    const existing = await prisma.appUser.findUnique({
      where: { emailLower },
    });
    if (existing) {
      return res.status(409).json({ error: "Email in use" });
    }

    // 2) Hash password
    const passwordHash = await bcrypt.hash(body.password, 12);

    // 3) Create AppUser with role patient
    const user = await prisma.appUser.create({
      data: {
        email: body.email,
        emailLower,
        passwordHash,
        role: Role.patient,
      },
    });

    // 4) Build names and DOB
    let fullName = `${body.firstName} ${body.lastName}`.trim();
    if (!fullName) {
      fullName = "Unknown"; // fullName is required in schema
    }

    let dobValue = null;
    if (body.dob) {
      const parsed = new Date(body.dob);
      if (!Number.isNaN(parsed.getTime())) {
        dobValue = parsed;
      }
    }

    // 5) Create Patient profile linked to this user via userId
    await prisma.patient.create({
      data: {
        userId: user.id,

        fullName,
        firstName: body.firstName || null,
        lastName: body.lastName || null,
        dob: dobValue,
        insuranceCard: body.insuranceCard || null,
      },
    });

    // 6) Log them in via session
    req.session.user = {
      id: user.id,
      role: user.role,
      email: user.email,
    };

    return res.status(201).json(req.session.user);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log("ZOD ERROR:", err.issues); // 👈 use issues, not errors
      return res
        .status(400)
        .json({ error: "Invalid input", details: err.issues });
    }
    console.error("Register error:", err);
    return next(err);
  }
});

// ------------------------
// POST /api/auth/login
// ------------------------
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = credsSchema.parse(req.body);
    const emailLower = email.toLowerCase();

    const user = await prisma.appUser.findUnique({
      where: { emailLower },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    req.session.user = {
      id: user.id,
      role: user.role,
      email: user.email,
    };

    return res.json(req.session.user);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log("ZOD LOGIN ERROR:", err.issues);
      return res
        .status(400)
        .json({ error: "Invalid input", details: err.issues });
    }
    console.error("Login error:", err);
    return next(err);
  }
});

// ------------------------
// POST /api/auth/logout
// ------------------------
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.status(204).end();
  });
});

// ------------------------
// GET /api/auth/me
// ------------------------
router.get("/me", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const user = await prisma.appUser.findUnique({
    where: { id: req.session.user.id },
    include: {
      patient: true,
      doctor: true,
    },
  });

  if (!user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  return res.json(publicUser(user));
});

module.exports = router;
