import express from 'express';
import User from '../models/user.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
