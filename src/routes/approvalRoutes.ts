import express from 'express';
import { getApprovalForm, postApprovalForm } from '../controllers/approvalController.ts';

const approvalRoutes = express.Router();

approvalRoutes.get('/:id', getApprovalForm);
approvalRoutes.post('/:id', postApprovalForm);
// approvalRoutes.get('/', getApprovalForm);
// approvalRoutes.post('/', postApprovalForm);



export default approvalRoutes;