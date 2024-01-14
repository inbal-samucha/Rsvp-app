import express from 'express';
import { getApprovalForm, postApprovalForm } from '../controllers/approvalController.ts';

const approvalRoutes = express.Router();

approvalRoutes.get('/:eventId/invitee/:id', getApprovalForm);
approvalRoutes.post('/:eventId/invitee/:id', postApprovalForm);


export default approvalRoutes;