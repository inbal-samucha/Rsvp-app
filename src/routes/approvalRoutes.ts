import express from 'express';
import { getApprovalForm, postApprovalForm } from '../controllers/approvalController.ts';

const approvalRoutes = express.Router();

approvalRoutes.get('/:invitedId', getApprovalForm);
approvalRoutes.post('/:invitedId', postApprovalForm);
// approvalRoutes.get('/', getApprovalForm);
// approvalRoutes.post('/', postApprovalForm);



export default approvalRoutes;