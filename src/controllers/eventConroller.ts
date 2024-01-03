import { NextFunction, Request, Response } from "express";
import moment from 'moment';
import { convertObjToLowerCase } from "../utils/handlerFunction.ts";

import Event from "../models/Event.ts";

const createEvent = async (req: Request, res: Response, next: NextFunction) => {

    if(req.body.date && moment(req.body.date, 'DD/MM/YYYY').isValid()){
        var momentDate = moment.utc(req.body.date, "DD/MM/YYYY").format();
        var newDate = new Date(momentDate)
        req.body.date = newDate;
    }else {
        return res.status(400).json({ error: 'Invalid date format' });
    }

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

    if(req.body.date && moment(req.body.date, 'DD/MM/YYYY').isValid()){
        var momentDate = moment.utc(req.body.date, "DD/MM/YYYY").format();
        var newDate = new Date(momentDate)
        req.body.date = newDate;
    }else {
        return res.status(400).json({ error: 'Invalid date format' });
    }
  
    
    const event = await Event.findByIdAndUpdate(eventId, {$set:req.body}, {new:true});

    return res.status(200).json(event);
}

const deleteOneEvent = async (req: Request, res: Response, next: NextFunction) => {
    const eventId = req.params.id;

    await Event.findByIdAndDelete(eventId);

    return res.status(200).json({message: 'event was deleted'});
}

const getfilterEvents = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { type, date, location, status, hosts_name } = req.query;
    
        const query : { [key: string]: any } = {};

        if (type) {
          query.type = type as string;
        }
        if (date) {
          const momentDate = moment.utc(date as string , "DD/MM/YYYY").format();
          query.date = { $eq: new Date(momentDate) };
        }
        if (location) {
          query.location = location as string;
        }
        if (status) {
          query.status = status as string;
        }
        if (hosts_name) {
            query.hosts_name = hosts_name as string;
        }

        console.log(query);
    

        const filteredEvents = await Event.find(query);
    
        res.json(filteredEvents);
      } catch (error) {
        res.status(500).json({ error });
      }
}



export { createEvent, getAllEvents, getOneEvent, updateOneEvent, deleteOneEvent, getfilterEvents };