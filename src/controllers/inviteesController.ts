import { NextFunction, Request, Response } from "express";

import Invitees from "../models/Invitees.ts";



const createInvitees = async (req: Request, res: Response, next: NextFunction) => {
    const { first_name, last_name, email, phone, event_id} = req.body;
    
    const invitee = await Invitees.create({ first_name, last_name, email, phone, event_id });

    return res.status(200).json(invitee);
}

const getAllInvitees = async (req: Request, res: Response, next: NextFunction) => {
    const  event_id  = req.params.id; //TODO: check if there is such event id if no throw error
 
    //TODO: req. quuery need to be case sensitive
    const invitees = await Invitees.find({ event_id, ...req.query }); //find invitees by filter of req.query (like arrival_confirmed)

    return res.status(200).json(invitees);
}

const updateOneInvited = async (req: Request, res: Response, next: NextFunction) => {
    const  invited_id  = req.params.id;//invited _id

    const invited = await Invitees.findByIdAndUpdate(invited_id, { $set: req.body }, { new: true});

    return res.status(200).json(invited);
}

const deleteOneInvited = async (req: Request, res: Response, next: NextFunction) => {
    const  invited_id  = req.params.id; //invited_id
    
    const invited = await Invitees.findByIdAndDelete( invited_id );

    return res.status(200).json({ message: 'ivitess id deleted'});
}



export { createInvitees, getAllInvitees, updateOneInvited, deleteOneInvited };