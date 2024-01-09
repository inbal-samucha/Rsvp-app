import { Response, Request, NextFunction } from "express";
import Invitees from "../models/Invitees.ts";

const getApprovalForm = async(req: Request, res: Response, next: NextFunction) => {
    const invitedId= req.params.id;

    try{
        const invited = await Invitees.findById(invitedId).populate('event','image');
        
        if(!invited){
            throw new Error('No such invited id')
        }
        
        res.render('example2', {invitedId, invited}); //TODO: לשנות את הטופס ככה שבמקום שיהיה שם פרטי ושם משפחה כקלט להעביר אותו כשם מלא מהבסיס נתונים
    }catch(err){
        console.log(err)
        throw new Error('No such invited id')
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
        const  invited_id  = req.params.id;//invited _id TODO: check if the inviteed id exist
            
        const invited = await Invitees.findByIdAndUpdate(invited_id, payload , { new: true});

        res.render('thankyou')
    }catch(err){
        console.log(err);   
    }
}


export { getApprovalForm, postApprovalForm };