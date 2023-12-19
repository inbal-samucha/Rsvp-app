import { NextFunction, Request, Response } from "express";
import Event from "../models/Event.ts";

const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    const { hosts_name, date, type } = req.body;
    
    const event = await Event.create({ hosts_name, date, type });

    return res.status(200).json(event);
}

//get all events with option to filter in query
const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.query)
    const events = await Event.find({...req.query}); //TODO: change the req.query to case sensitive

    return res.status(200).json(events);
}

const getOneEvent = async (req: Request, res: Response, next: NextFunction) => {
    const eventId = req.params.id;
    
    const event = await Event.findById(eventId); //TODO: if no such event id throw error (error handlling)

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

const checkToEjs = async (req: Request, res: Response, next: NextFunction) => {
    const eventId = req.params.id;
    const event = await Event.findById(eventId); 

    return res.render('home', {event});
}

export { createEvent, getAllEvents, getOneEvent, updateOneEvent, deleteOneEvent, checkToEjs };