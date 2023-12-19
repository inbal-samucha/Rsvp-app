import { Response, Request, NextFunction } from "express";
import Invitees from "../models/Invitees.ts";

const getApprovalForm = async(req: Request, res: Response, next: NextFunction) => {
    const inviteedId= req.params.inviteedId;
    
    res.render('approval_form', {inviteedId});
}

const postApprovalForm = async(req: Request, res: Response, next: NextFunction) => { //TODO: check if i can merge this function to updateOneInvitees in iniviteesControllers
    console.log(req.body)

        // const  invited_id  = req.params.inviteedId;//invited _id
        // console.log(invited_id);
        
        // const invited = await Invitees.findByIdAndUpdate(invited_id, { $set: req.body }, { new: true});
        res.send('success')
}


export { getApprovalForm, postApprovalForm };