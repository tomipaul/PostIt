import express from 'express';
import UserController from '../controllers/UserController';

const userRouter = express.Router();
userRouter.get('/api/user/groups', UserController.getUserGroups());
userRouter.route('/api/user/:username')
.get(UserController.getUser())
.put(UserController.permitOwnerAndAdmin(), UserController.updateUser())
.delete(UserController.permitAdmin(), UserController.deleteUser());

export default userRouter;
