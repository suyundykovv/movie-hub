// routes/user.js
import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile);
<<<<<<< Updated upstream
=======
router.delete("/:id", protect, adminOnly, deleteUser); // Только админ может удалять пользователей
>>>>>>> Stashed changes

export default router;