import express from 'express';
import UserController from '../controllers/UserController';

const userRouter = express.Router();
userRouter.post('/api/user/signup', UserController.createUser());
userRouter.post('/api/user/signin', [
  UserController.validateRequest(),
  UserController.authenticateUser()
]);
userRouter.use('/api', [
  UserController.getClientAuthToken(),
  UserController.authorizeUser()
]);
userRouter.get('/api/user/:id', UserController.getUser());
userRouter.put('/api/user', UserController.updateUser());
userRouter.delete('/api/user', UserController.deleteUser());
userRouter.get('/api/user/groups', UserController.getUserGroups());

export default userRouter;
