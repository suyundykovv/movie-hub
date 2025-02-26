// routes/resourceRoutes.js
import express from 'express';
import {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource
} from '../controllers/resourceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createResource)
  .get(protect, getResources);

router.route('/:id')
  .get(protect, getResourceById)
  .put(protect, updateResource)
  .delete(protect, deleteResource);

export default router;