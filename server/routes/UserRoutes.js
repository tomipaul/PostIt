import express from 'express';
import UserController from '../controllers/UserController';

const userRouter = express.Router();
userRouter.get('/api/v1/users', UserController.getAllUsers());
userRouter.get(
  '/api/v1/messages/unread',
  UserController.getUnreadMessages()
);
userRouter.get('/api/v1/user/groups', UserController.getUserGroups());
userRouter.route('/api/v1/user/:username')
.get(UserController.getUser())
.put(UserController.permitOwnerAndAdmin(), UserController.updateUser())
.delete(UserController.permitAdmin(), UserController.deleteUser());

export default userRouter;
