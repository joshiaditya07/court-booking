const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Court = require("../models/Court");
const auth = require("../middleware/auth");

const router = express.Router();
router.use(auth);

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json({ success: true, count: users.length, data: users });
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  res.json({ success: true, data: user });
});

router.put("/:id", async (req, res) => {
  if (req.params.id !== req.userId) {
    return res.status(403).json({ success: false, message: "You can only update your own account" });
  }

  const updates = {};
  if (req.body.name) updates.name = req.body.name;
  if (req.body.phone) updates.phone = req.body.phone;
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }
    updates.password = await bcrypt.hash(req.body.password, 10);
  }

  const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  res.json({ success: true, message: "User updated", data: user });
});

router.delete("/:id", async (req, res) => {
  if (req.params.id !== req.userId) {
    return res.status(403).json({ success: false, message: "You can only delete your own account" });
  }

  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  await Court.deleteMany({ owner: req.userId });

  res.json({ success: true, message: "User and related data deleted" });
});

module.exports = router;
