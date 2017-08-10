import express from 'express';
import UserController from '../controllers/UserController';

const authRouter = express.Router();
authRouter.post('/api/user/password/reset', UserController.resetPassword());
authRouter.post('/api/user/signup', [
  UserController.createUser(),
  UserController.authenticateUser()
]);
authRouter.route('/api/user/signin')
.all(UserController.validateRequest())
.post(UserController.authenticateUser());
authRouter.use('/api', [
  UserController.getClientAuthToken(),
  UserController.authorizeUser()
]);
authRouter.get('/api/user/authorize', UserController.getUser());

export default authRouter;
