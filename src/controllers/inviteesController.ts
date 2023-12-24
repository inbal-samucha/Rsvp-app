import { NextFunction, Request, Response } from "express";

import Event from "../models/Event.ts";
import Invitees from "../models/Invitees.ts";




const createInvitees = async (req: Request, res: Response, next: NextFunction) => {
    const { first_name, last_name, email, phone, event_id} = req.body;
    
    const invitee = await Invitees.create({ first_name, last_name, email, phone, event_id });

    return res.status(200).json(invitee);
}

const getAllInvitees = async (req: Request, res: Response, next: NextFunction) => {
    const  eventId  = req.params.id; 
    
    const event = await Event.findById(eventId); 
    if(!event){ 
        throw new Error('No such event id')
    }

   
    const invitees = await Invitees.find({ eventId, ...req.query }); //find invitees by filter of req.query (like arrival_confirmed)

    return res.status(200).json(invitees);
}

const updateOneInvited = async (req: Request, res: Response, next: NextFunction) => {
    const  invitedId  = req.params.id;//invited _id

    const invited = await Invitees.findByIdAndUpdate(invitedId, { $set: req.body }, { new: true});

    return res.status(200).json(invited);
}

const deleteOneInvited = async (req: Request, res: Response, next: NextFunction) => {
    const  invitedId  = req.params.id; //invited_id
    
    const invited = await Invitees.findByIdAndDelete( invitedId );

    return res.status(200).json({ message: 'ivitess id deleted'});
}



export { createInvitees, getAllInvitees, updateOneInvited, deleteOneInvited };