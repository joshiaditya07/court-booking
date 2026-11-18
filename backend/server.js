require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: true, message: "Court Discovery API is running" });
});

app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/users"));
app.use("/court", require("./routes/courts"));

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || "Server error";

  if (err.name === "ValidationError") status = 400;
  if (err.name === "CastError") {
    status = 400;
    message = "Invalid ID format";
  }
  if (err.code === 11000) {
    status = 409;
    message = err.keyPattern && err.keyPattern.slot ? "That slot is already booked" : "Duplicate value";
  }

  res.status(status).json({ success: false, message });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  });
