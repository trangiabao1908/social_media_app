import express from "express";
import authController from "../controllers/authController";
import middlewareAuth from "../middlewares/middlewareAuth";
const router = express.Router();
import { upload } from "../utils/storage";

//register
router.post("/register", upload.single("picture"), authController.register);

//login
router.post("/login", authController.login);

// refresh Token
router.get("/refresh_token", authController.refreshToken);

//logout
router.get("/logout", middlewareAuth.verifyToken, authController.logout);
export default router;
