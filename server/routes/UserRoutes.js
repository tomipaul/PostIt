import express from 'express';
import UserController from '../controllers/UserController';

const userRouter = express.Router();
userRouter.get('/api/v0/users', UserController.getAllUsers());
userRouter.get(
  '/api/v0/messages/unread',
  UserController.getUnreadMessages()
);
userRouter.get('/api/v0/user/groups', UserController.getUserGroups());
userRouter.route('/api/v0/user/:username')
.get(UserController.getUser())
.put(UserController.permitOwnerAndAdmin(), UserController.updateUser())
.delete(UserController.permitAdmin(), UserController.deleteUser());

export default userRouter;
