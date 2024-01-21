import express from 'express';
import authRoutes from './authRoutes.ts';
import eventRoutes from './eventRoutes.ts';
import inviteesRoutes from './inviteesRoutes.ts';
import approvalRoutes from './approvalRoutes.ts';


const router = express.Router();

router.use("/auth", authRoutes);
router.use("/event", eventRoutes);
router.use("/event", inviteesRoutes);
router.use("/approval", approvalRoutes);

export default router;