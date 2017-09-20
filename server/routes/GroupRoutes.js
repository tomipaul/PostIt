import express from 'express';
import GroupController from '../controllers/GroupController';
import sendNotifications from '../controllers/otherControllers';

const router = express.Router();
router.post('/api/v0/group',
  GroupController.createGroup()
);
router.route('/api/v0/group/:groupId/user')
.post(
  GroupController.permitOnlyGroupMembers(),
  GroupController.addUserToGroup()
)
.delete(
  GroupController.permitOnlyGroupOwner(),
  GroupController.removeUserFromGroup()
);
router.post('/api/v0/group/:groupId/message',
  GroupController.permitOnlyGroupMembers(),
  GroupController.addMessageToGroup(),
  sendNotifications
);
router.get('/api/v0/group/:groupId/messages',
  GroupController.permitOnlyGroupMembers(),
  GroupController.getGroupMessages()
);
router.post('/api/v0/group/:groupId/messages/read',
  GroupController.permitOnlyGroupMembers(),
  GroupController.readGroupMessages()
);
router.get('/api/v0/group/:groupId/message/:messageId/users',
  GroupController.permitOnlyGroupMembers(),
  GroupController.getUsersWithMessageRead()
);
router.get('/api/v0/group/:groupId/users',
  GroupController.permitOnlyGroupMembers(),
  GroupController.getGroupUsers()
);
router.use('/api/v0/group', GroupController.sendResponse());

export default router;
