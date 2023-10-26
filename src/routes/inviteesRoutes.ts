import express from 'express';
import { createInvitees, deleteOneInvited, getAllInvitees, getOneInvited, updateOneInvited } from '../controllers/inviteesController.ts';

const inviteesRoutes = express.Router();

inviteesRoutes.get('/', getAllInvitees);
inviteesRoutes.get('/:id', getOneInvited);
inviteesRoutes.put('/:id', updateOneInvited);
inviteesRoutes.delete('/:id', deleteOneInvited);
inviteesRoutes.post('/create', createInvitees);


export default inviteesRoutes;