// routes/user.js
import express from 'express';
import { deleteUser, getUserProfile, updateUserProfile,updateUser } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile);
router.delete('/profile/:id', verifyToken, deleteUser);
router.put("/users/:id", verifyToken, updateUser); 

export default router;