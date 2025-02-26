// routes/user.js
import express from 'express';
import { deleteUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile);
router.delete('/profile/:id', verifyToken, deleteUser);

export default router;