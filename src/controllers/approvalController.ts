import { Response, Request, NextFunction } from "express";
import Invitees from "../models/Invitees.ts";

const getApprovalForm = async(req: Request, res: Response, next: NextFunction) => {
    const eventId= req.params.eventId;
    const inviteeId= req.params.id;

    try{

        const invitee = await Invitees.findOne({_id: inviteeId, event: eventId}).populate('event','image');
        
        if(!invitee){
            throw new Error('No such invitee id')
        }
        
        res.render('approval_form', {invitee, eventId}); //TODO: לשנות את הטופס ככה שבמקום שיהיה שם פרטי ושם משפחה כקלט להעביר אותו כשם מלא מהבסיס נתונים
    }catch(err){
        console.log(err)
        throw new Error('No such invitee id')
    }

}

const postApprovalForm = async(req: Request, res: Response, next: NextFunction) => { //TODO: check if i can merge this function to updateOneInvitees in iniviteesControllers 
    const eventId= req.params.eventId;
    const inviteeId= req.params.id;
    
    try{
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

        res.render('thankyou')
    }catch(err){
        console.log(err);   
    }
}


export { getApprovalForm, postApprovalForm };