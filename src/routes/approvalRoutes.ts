import express from 'express';
import { getApprovalForm, putApprovalForm } from '../controllers/approvalController.ts';

const approvalRoutes = express.Router();

approvalRoutes.get('/:invitedId', getApprovalForm);
approvalRoutes.put('/:invitedId', putApprovalForm);
// approvalRoutes.get('/', getApprovalForm);
// approvalRoutes.post('/', postApprovalForm);



export default approvalRoutes;