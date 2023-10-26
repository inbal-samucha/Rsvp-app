import { NextFunction, Request, Response } from "express";
import Event from "../models/Event.ts";

const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    const { name, date } = req.body;
    
    const event = await Event.create({ name, date });

    return res.status(200).json(event);
}

const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {

    const events = await Event.find();

    return res.status(200).json(events);
}

const getOneEvent = async (req: Request, res: Response, next: NextFunction) => {
    const eventId = req.params.id;
    
    const event = await Event.findById(eventId);

    return res.status(200).json(event);
}

const updateOneEvent = async (req: Request, res: Response, next: NextFunction) => {
    const eventId = req.params.id;

    const event = await Event.findByIdAndUpdate(eventId, {$set:req.body}, {new:true});

    return res.status(200).json(event);
}

const deleteOneEvent = async (req: Request, res: Response, next: NextFunction) => {
    const eventId = req.params.id;

    await Event.findByIdAndDelete(eventId);

    return res.status(200).json({message: 'event was deleted'});
}

export { createEvent, getAllEvents, getOneEvent, updateOneEvent, deleteOneEvent };