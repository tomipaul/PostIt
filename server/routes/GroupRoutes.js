import express from 'express';
import GroupController from '../controllers/GroupController';

const router = express.Router();
router.post('/api/group', GroupController.createGroup());
router.post('/api/group/:groupId/user',
 GroupController.addUserToGroup());
router.post('/api/group/:groupId/message',
 GroupController.addMessageToGroup());
router.get('/api/group/:groupId/messages',
 GroupController.getGroupMessages());

export default router;
