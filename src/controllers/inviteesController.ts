import { NextFunction, Request, Response } from "express";

import { HttpCode } from "../utils/errors/CustomError.ts";
import ExeptionError from "../utils/errors/ExeptionError.ts";

import Event from "../models/Event.ts";
import Invitees from "../models/Invitees.ts";


const createInvitees = async (req: Request, res: Response, next: NextFunction) => {
    const  eventId  = req.params.id; 
    const { first_name, last_name, email, phone} = req.body;
    
    const invitee = await Invitees.create({ first_name, last_name, email, phone, event: eventId });
    if(!invitee){
        throw new ExeptionError({code: HttpCode.BAD_REQUEST, message: "Something went worng when created invitee", logging: true});
    }

    return res.status(200).json(invitee);
}

const getAllInvitees = async (req: Request, res: Response, next: NextFunction) => {
    const  eventId  = req.params.id; 
    
    const event = await Event.findById(eventId); 
    if(!event){ 
        throw new ExeptionError({code: HttpCode.BAD_REQUEST, message: "No such event id", logging: true});
    }

    const invitees = await Invitees.find({ event:eventId, ...req.query }); //find invitees by filter of req.query (like arrival_confirmed)

    return res.status(200).json(invitees);
}

const updateOneInvitee = async (req: Request, res: Response, next: NextFunction) => {
    const  inviteeId  = req.params.inveteeId;//invitee _id
    const  eventId  = req.params.id;//event id

    const invitee = await Invitees.findOneAndUpdate({_id: inviteeId, event: eventId}, { $set: req.body }, { new: true});
    if(!invitee){ 
        throw new ExeptionError({code: HttpCode.BAD_REQUEST, message: "No such event id or invitee id", logging: true});
    }

    return res.status(200).json(invitee);
}

const deleteOneInvitee = async (req: Request, res: Response, next: NextFunction) => {
    const  inviteeId  = req.params.inveteeId; //invitee
    const  eventId  = req.params.id; //event

    const invitee = await Invitees.findOneAndDelete( {_id: inviteeId, event: eventId});
    if(!invitee){ 
        throw new ExeptionError({code: HttpCode.BAD_REQUEST, message: "No such event id or invitee id", logging: true});
    }

    return res.status(200).json({ invitee, message: 'invitee deleted'});
}



export { createInvitees, getAllInvitees, updateOneInvitee, deleteOneInvitee };