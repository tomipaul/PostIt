import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

router.post('/signup', UserController.createUser());
router.post('/signin', [
  UserController.validateRequest(),
  UserController.authenticateUser()
]);
router.get('/:username/groups', UserController.getUserGroups());

export default router;
