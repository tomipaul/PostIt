import express from 'express';
import UserController from '../controllers/UserController';

const authRouter = express.Router();
authRouter.post('/api/v1/password/mail',
UserController.sendResetPasswordMail());
authRouter.post('/api/v1/user/signup', [
  UserController.createUser(),
  UserController.authenticateUser()
]);
authRouter.route('/api/v1/user/signin')
.all(UserController.validateRequest())
.post(UserController.authenticateUser());
authRouter.use('/api/v1', [
  UserController.getClientAuthToken(),
  UserController.authorizeUser()
]);
authRouter.get('/api/v1/user/authorize', UserController.getUser());
authRouter.post('/api/v1/user/password/reset',
UserController.updateUser());

export default authRouter;
