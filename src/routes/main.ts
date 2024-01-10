import express from 'express';
import eventRoutes from './eventRoutes.ts';
import inviteesRoutes from './inviteesRoutes.ts';
import approvalRoutes from './approvalRoutes.ts';


const router = express.Router();

router.use("/event", eventRoutes);
router.use("/event", inviteesRoutes);
router.use("/approval", approvalRoutes);

export default router;