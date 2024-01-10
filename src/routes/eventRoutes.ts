import express from 'express';
import {  createEvent, deleteOneEvent, getAllEvents, getCreateEvent, getFormFilterEvents, getOneEvent, getfilterEvents, updateOneEvent } from '../controllers/eventConroller.ts';

const eventRoutes = express.Router();

eventRoutes.get('/', getAllEvents);

eventRoutes.get('/form', getFormFilterEvents);
eventRoutes.get('/filter', getfilterEvents);
eventRoutes.get('/create', getCreateEvent);


eventRoutes.get('/:id', getOneEvent);
eventRoutes.put('/:id', updateOneEvent);
eventRoutes.delete('/:id', deleteOneEvent);
eventRoutes.post('/create', createEvent);

export default eventRoutes;