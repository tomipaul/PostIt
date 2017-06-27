import express from 'express';
import UserController from '../controllers/UserController';

const userRouter = express.Router();
userRouter.route('/api/user')
.put(UserController.updateUser())
.delete(UserController.deleteUser());
userRouter.get('/api/user/groups', UserController.getUserGroups());
userRouter.get('/api/user/:username', UserController.getUser());

export default userRouter;
