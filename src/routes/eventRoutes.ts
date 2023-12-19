import express from 'express';
import { checkToEjs, createEvent, deleteOneEvent, getAllEvents, getOneEvent, updateOneEvent } from '../controllers/eventConroller.ts';

const eventRoutes = express.Router();

eventRoutes.get('/', getAllEvents);
eventRoutes.get('/:id', getOneEvent);
eventRoutes.put('/:id', updateOneEvent);
eventRoutes.delete('/:id', deleteOneEvent);
eventRoutes.post('/create', createEvent);

eventRoutes.get('/check/:id', checkToEjs)


export default eventRoutes;