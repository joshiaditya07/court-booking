const mongoose = require("mongoose");

const courtSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    sport: {
      type: String,
      enum: [
        "futsal",
        "basketball",
        "badminton",
        "cricket",
        "tennis",
        "table tennis",
        "swimming",
        "volleyball",
        "squash",
        "padel",
        "pickleball",
      ],
      required: true,
    },
    location: { type: String, required: true },
    pricePerHour: { type: Number, required: true, min: 0 },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Court", courtSchema);
