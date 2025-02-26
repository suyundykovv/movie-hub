// routes/user.js
import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile);
router.delete("/:id", protect, adminOnly, deleteUser); // Только админ может удалять пользователей

export default router;