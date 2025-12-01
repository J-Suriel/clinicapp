const { Router } = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = Router();

/**
 * POST /api/doctor/search-patient
 * Body: { firstName?, lastName?, dob?, insuranceCard? }
 *
 * Valid search:
 *  - insuranceCard alone
 *  - OR firstName + lastName + dob
 */
router.post("/search-patient", async (req, res, next) => {
  try {
    const { firstName, lastName, dob, insuranceCard } = req.body || {};

    // basic validation
    if (!insuranceCard && !(firstName && lastName && dob)) {
      return res.status(400).json({
        error:
          "Provide either insuranceCard OR firstName, lastName, and dob.",
      });
    }

    // 🔹 Convert dob (string like "2001-01-01") -> JS Date for Prisma
    let dobFilter = undefined;
    if (dob) {
      const parsed = new Date(dob);
      if (!Number.isNaN(parsed.getTime())) {
        dobFilter = parsed; // Prisma accepts JS Date
      }
    }

    let where = {};

    if (insuranceCard) {
      // search directly by card
      where.insuranceCard = insuranceCard;
    } else {
      const fullNameGuess = `${firstName} ${lastName}`.trim();

      where = {
        AND: [
          fullNameGuess
            ? {
                fullName: {
                  contains: fullNameGuess,
                  mode: "insensitive",
                },
              }
            : {},
          dobFilter ? { dob: dobFilter } : {},
        ],
      };
    }

    const patients = await prisma.patient.findMany({
      where,
      include: {
        user: true, // assumes relation patient.user -> appUser
      },
    });

    const mapped = patients.map((p) => ({
      id: p.id,
      fullName: p.fullName,
      dob: p.dob,
      insuranceCard: p.insuranceCard,
      email: p.user?.email,
    }));

    res.json(mapped);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
