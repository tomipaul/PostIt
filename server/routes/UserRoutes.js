import express from 'express';
import UserController from '../controllers/UserController';

const userRouter = express.Router();
userRouter.post('/api/user/signup', UserController.createUser());
userRouter.route('/api/user/signin')
.use(UserController.validateRequest())
.post(UserController.authenticateUser());
userRouter.use('/api', [
  UserController.getClientAuthToken(),
  UserController.authorizeUser()
]);
userRouter.route('/api/user')
.put(UserController.updateUser())
.delete(UserController.deleteUser());
userRouter.get('/api/user/groups', UserController.getUserGroups());
userRouter.get('/api/user/:username', UserController.getUser());

export default userRouter;
