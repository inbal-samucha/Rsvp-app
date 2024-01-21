import express from 'express';
import {  createEvent, deleteOneEvent, getAllEvents, getCreateEvent, getFormFilterEvents, getOneEvent, getfilterEvents, updateOneEvent } from '../controllers/eventConroller.ts';
import { authUser, requireUser } from '../middleware/auth.ts';

const eventRoutes = express.Router();

eventRoutes.get('/', getAllEvents);

eventRoutes.get('/form', authUser, requireUser, getFormFilterEvents);
eventRoutes.get('/filter',authUser, requireUser, getfilterEvents);
eventRoutes.get('/create', getCreateEvent);


eventRoutes.get('/:id', getOneEvent);
eventRoutes.put('/:id', updateOneEvent);
eventRoutes.delete('/:id', deleteOneEvent);
eventRoutes.post('/create', createEvent);

export default eventRoutes;