import express from 'express';
import { getApprovalForm, postApprovalForm } from '../controllers/approvalController.ts';

import { Response, Request, NextFunction } from "express";
import Invitees from "../models/Invitees.ts";
import BadRequestError from '../utils/errors/BadRequestError.ts';

const approvalRoutes = express.Router();

// approvalRoutes.get('/:id', getApprovalForm);
// approvalRoutes.post('/:id', postApprovalForm);

approvalRoutes.get('/:eventId/invitee/:id', getApprovalForm);
approvalRoutes.post('/:eventId/invitee/:id', postApprovalForm);

approvalRoutes.get('/test/:id', async(req: Request, res: Response, next: NextFunction) => {
    console.log('innn');
    
    const inviteeId= req.params.id;
    const invitee = await Invitees.findOne({_id: inviteeId })

    if(!invitee) {
        throw new BadRequestError({code: 400, message: "Name is required!", logging: true});
      }
   
    return res.status(200).json(invitee);

  })



export default approvalRoutes;