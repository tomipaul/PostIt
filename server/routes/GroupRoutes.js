import express from 'express';
import GroupController from '../controllers/GroupController';

const router = express.Router();
router.post('/', GroupController.createGroup());
router.post('/:groupId/user', GroupController.addUserToGroup());
router.post('/:groupId/message', GroupController.addMessageToGroup());
router.get('/:groupId/messages', GroupController.getGroupMessages());

export default router;
