import express from 'express';
import eventRoutes from './eventRoutes.ts';
import inviteesRoutes from './inviteesRoutes.ts';


const router = express.Router();

router.use("/event", eventRoutes);
router.use("/invitees", inviteesRoutes);

export default router;