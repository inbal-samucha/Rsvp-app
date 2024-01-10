import express from 'express';
import { createInvitees, deleteOneInvitee, getAllInvitees, updateOneInvitee} from '../controllers/inviteesController.ts';

const inviteesRoutes = express.Router();


inviteesRoutes.get('/:id/invitee', getAllInvitees);
inviteesRoutes.put('/:id/invitee/:inveteeId', updateOneInvitee);

inviteesRoutes.post('/:id/invitee/create', createInvitees);
inviteesRoutes.delete('/:id/invitee/:inveteeId', deleteOneInvitee);


export default inviteesRoutes;