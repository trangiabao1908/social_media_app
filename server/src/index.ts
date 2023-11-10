const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
import dotenv from "dotenv";
import configMongoose from "./database/config";

import morgan from "morgan";
import helmet from "helmet";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import postRoutes from "./routes/post";

// Mongodb config
dotenv.config();
configMongoose();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    withCredentials: true,
  })
);
app.use(cookieParser());
app.use("/assets", express.static("src/public/assets"));
// app.use("/assets", express.static(path.join(__dirname, "src/public/assets")));
/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listing on port ${PORT}`);
});
