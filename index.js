const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config({ path: "./.env" });
const connectDb = require("./db/db");
const UserRouter = require("./routes/userRoutes");
const cors = require("cors");
const port = process.env.PORT || 3000;
connectDb();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/v1", UserRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res
    .status(statusCode)
    .json({ message: err.message || "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
