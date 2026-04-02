const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const doctorRoutes = require("./routes/doctorRoutes");
const doctorDashboardRoutes = require("./routes/doctorDashboardRoutes");
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

// ensure the URI is set early so connectDB can use it
if (!process.env.MONGO_URI) {
  console.error("ERROR: MONGO_URI is not defined in .env");
  process.exit(1);
}

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/doctors", doctorRoutes);
app.use("/api/doctor", doctorDashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);

// 404 and error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// catch unhandled promise rejections and shut down gracefully
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // optionally attempt a graceful shutdown
});