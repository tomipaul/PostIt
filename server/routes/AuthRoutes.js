import express from 'express';
import UserController from '../controllers/UserController';

const authRouter = express.Router();
authRouter.post('/api/v0/user/password/reset', UserController.resetPassword());
authRouter.post('/api/v0/user/signup', [
  UserController.createUser(),
  UserController.authenticateUser()
]);
authRouter.route('/api/v0/user/signin')
.all(UserController.validateRequest())
.post(UserController.authenticateUser());
authRouter.use('/api/v0', [
  UserController.getClientAuthToken(),
  UserController.authorizeUser()
]);
authRouter.get('/api/v0/user/authorize', UserController.getUser());

export default authRouter;
