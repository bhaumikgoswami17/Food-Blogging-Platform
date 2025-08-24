import express from 'express';
import { registerUser, loginUser, verifyOtp, getUserProfile, updateProfile, getAllUsers ,upload } from '../controllers/authcontrollers.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-otp', verifyOtp);
router.get('/profile', authenticate, getUserProfile);
router.put('/update-profile', authenticate, upload.single('avatar'), updateProfile);
router.get('/all-users', authenticate, getAllUsers);


export default router;
