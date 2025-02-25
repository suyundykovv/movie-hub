// routes/auth.js
import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { getUserInfo } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getAllUsers } from "../controllers/userController.js";

const router = express.Router();
router.get("/me", verifyToken, getUserInfo);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/users", getAllUsers );

export default router;