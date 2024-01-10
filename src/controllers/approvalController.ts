import { Response, Request, NextFunction } from "express";
import Invitees from "../models/Invitees.ts";

const getApprovalForm = async(req: Request, res: Response, next: NextFunction) => {
    const inviteeId= req.params.id;

    try{
        const invitee = await Invitees.findById(inviteeId).populate('event','image');
        
        if(!invitee){
            throw new Error('No such invitee id')
        }
        
        res.render('example2', {inviteeId, invitee}); //TODO: לשנות את הטופס ככה שבמקום שיהיה שם פרטי ושם משפחה כקלט להעביר אותו כשם מלא מהבסיס נתונים
    }catch(err){
        console.log(err)
        throw new Error('No such invitee id')
    }

}

const postApprovalForm = async(req: Request, res: Response, next: NextFunction) => { //TODO: check if i can merge this function to updateOneInvitees in iniviteesControllers 
    try{
        let isComing = false;
        let numberOfPeopleArriving = 1;
        if(req.body.is_coming === 'true'){
            isComing = true;
            numberOfPeopleArriving = +(req.body.number_of_people_arriving)
        }else{
            numberOfPeopleArriving = 0;
        }
    
        const payload ={
            arrival_confirmed: isComing,
            number_of_people_arriving: numberOfPeopleArriving
        }
        const  invitee_id  = req.params.id;//invitee _id TODO: check if the invitee id exist
            
        const invitee = await Invitees.findByIdAndUpdate(invitee_id, payload , { new: true});

        res.render('thankyou')
    }catch(err){
        console.log(err);   
    }
}


export { getApprovalForm, postApprovalForm };