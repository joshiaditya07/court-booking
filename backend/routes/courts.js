const express = require("express");
const Court = require("../models/Court");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  const filter = {};
  if (req.query.sport) filter.sport = req.query.sport;
  if (req.query.owner) filter.owner = req.query.owner;
  if (req.query.search) filter.name = { $regex: req.query.search, $options: "i" };
  if (req.query.maxPrice) filter.pricePerHour = { $lte: Number(req.query.maxPrice) };

  const courts = await Court.find(filter).populate("owner", "name phone").sort({ createdAt: -1 });
  res.json({ success: true, count: courts.length, data: courts });
});

router.get("/:id", async (req, res) => {
  const court = await Court.findById(req.params.id).populate("owner", "name phone");
  if (!court) return res.status(404).json({ success: false, message: "Court not found" });
  res.json({ success: true, data: court });
});

router.post("/", auth, async (req, res) => {
  const { name, sport, location, pricePerHour, description } = req.body;
  const court = await Court.create({
    name,
    sport,
    location,
    pricePerHour,
    description,
    owner: req.userId,
  });
  res.status(201).json({ success: true, message: "Court added", data: court });
});

router.put("/:id", auth, async (req, res) => {
  const court = await Court.findById(req.params.id);
  if (!court) return res.status(404).json({ success: false, message: "Court not found" });
  if (court.owner.toString() !== req.userId) {
    return res.status(403).json({ success: false, message: "Only the owner can edit this court" });
  }

  ["name", "sport", "location", "pricePerHour", "description", "isActive"].forEach((key) => {
    if (req.body[key] !== undefined) court[key] = req.body[key];
  });
  await court.save();

  res.json({ success: true, message: "Court updated", data: court });
});

router.delete("/:id", auth, async (req, res) => {
  const court = await Court.findById(req.params.id);
  if (!court) return res.status(404).json({ success: false, message: "Court not found" });
  if (court.owner.toString() !== req.userId) {
    return res.status(403).json({ success: false, message: "Only the owner can delete this court" });
  }

  await court.deleteOne();
  res.json({ success: true, message: "Court deleted" });
});

module.exports = router;
