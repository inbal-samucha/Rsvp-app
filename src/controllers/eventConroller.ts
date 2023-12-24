import { NextFunction, Request, Response } from "express";

import { convertObjToLowerCase } from "../utils/handlerFunction.ts";

import Event from "../models/Event.ts";

const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    let payload = {...req.body}
    convertObjToLowerCase(payload); //Note: just if the app in english
    const event = await Event.create(payload);

    return res.status(200).json(event);
}

//get all events with option to filter in query
const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
    let filterObj = { ...req.query }

    convertObjToLowerCase(filterObj); //Note: just if the app in english

    const events = await Event.find({...filterObj}); 

    return res.status(200).json(events);
}

const getOneEvent = async (req: Request, res: Response, next: NextFunction) => {
    const eventId = req.params.id;
    
    const event = await Event.findById(eventId); 
    if(!event){ //TODO: error handling
        throw new Error('No such event id')
    }

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