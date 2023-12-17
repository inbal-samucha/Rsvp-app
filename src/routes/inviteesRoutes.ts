import express from 'express';
import { createInvitees, deleteOneInvited, getAllInvitees, updateOneInvited } from '../controllers/inviteesController.ts';

const inviteesRoutes = express.Router();

//TODO: get all invitees from specific event that we know that they are coming to the event
//TODO: get all invitees from specific event that we know they are not coming to the event
inviteesRoutes.get('/:id', getAllInvitees);// get all invitees with filter in query
inviteesRoutes.put('/:id', updateOneInvited);
inviteesRoutes.delete('/:id', deleteOneInvited);
inviteesRoutes.post('/create', createInvitees);


export default inviteesRoutes;