import { Response, Request, NextFunction } from "express";

import ExeptionError, { HttpCode } from "../utils/errors/ExeptionError.ts";

import Invitees from "../models/Invitees.ts";


const getApprovalForm = async(req: Request, res: Response, next: NextFunction) => {
    const eventId= req.params.eventId;
    const inviteeId= req.params.id;

        const invitee = await Invitees.findOne({_id: inviteeId, event: eventId}).populate('event','image');
        
        if(!invitee){
            throw new ExeptionError({code: HttpCode.NOT_FOUND, message: "Invitee dont found", logging: true});
        }
        
        res.render('approval_form', {invitee, eventId}); //TODO: לשנות את הטופס ככה שבמקום שיהיה שם פרטי ושם משפחה כקלט להעביר אותו כשם מלא מהבסיס נתונים
}

const postApprovalForm = async(req: Request, res: Response, next: NextFunction) => { //TODO: check if i can merge this function to updateOneInvitees in iniviteesControllers 
    const eventId= req.params.eventId;
    const inviteeId= req.params.id;
    
        let isComing = false;
        let numberOfPeopleArriving = 0;
        if(req.body.is_coming === 'true'){
            isComing = true;
            numberOfPeopleArriving = +(req.body.number_of_people_arriving) + 1; //the person + number of people arriving
        }
    
        const payload ={
            arrival_confirmed: isComing,
            number_of_people_arriving: numberOfPeopleArriving
        }
            
        const invitee = await Invitees.findOneAndUpdate({_id: inviteeId, event: eventId}, payload , { new: true});
        
        if(!invitee){
            throw new ExeptionError({code: HttpCode.NOT_FOUND, message: "Invitee dont found", logging: true});
        }

        res.render('thankyou')
    
}


export { getApprovalForm, postApprovalForm };