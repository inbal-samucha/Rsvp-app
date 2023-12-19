import express from 'express';
import { getApprovalForm, postApprovalForm } from '../controllers/approvalController.ts';

const approvalRoutes = express.Router();

// approvalRoutes.get('/:inviteedId', getApprovalForm);
// approvalRoutes.post('/:inviteedId', postApprovalForm);
approvalRoutes.get('/', getApprovalForm);
approvalRoutes.post('/', postApprovalForm);



export default approvalRoutes;