import { Response, Request, NextFunction } from "express";
import Invitees from "../models/Invitees.ts";

const getApprovalForm = async(req: Request, res: Response, next: NextFunction) => {
    const invitedId= req.params.invitedId;

    try{
        const invited = await Invitees.findById(invitedId);
        if(!invited){
            throw new Error('No such invited id')
        }
        
        res.render('approval_form', {invitedId});
    }catch(err){
        console.log(err)
        throw new Error('No such invited id')
    }

}

const putApprovalForm = async(req: Request, res: Response, next: NextFunction) => { //TODO: check if i can merge this function to updateOneInvitees in iniviteesControllers 

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

    const  invited_id  = req.params.invitedId;
    
    const invited = await Invitees.findByIdAndUpdate(invited_id, payload , { new: true});

    res.send(invited) //TODO: redirect to thank you page
}


export { getApprovalForm, putApprovalForm };