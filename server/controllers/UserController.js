import ModelService from '../services/ModelService';
import AdhocModelService from '../services/AdhocModelService';
import AuthService from '../services/AuthService';
import models from '../models';

const userModel = models.User;

/**
 * @class GroupController
 */
class UserController {
  /**
   * Check if authentication request is valid
   * @method
   * @memberof UserController
   * @static
   * @return {function} Express middleware function that checks
   * request method and payload for every authentication request
   */
  static validateRequest() {
    return (req, res, next) => {
      if (req.method !== 'POST') {
        res.status(400).send('POST request method expected');
      } else if (!req.body.username || !req.body.password) {
        res.status(400).send('non-empty username and password expected');
      } else {
        next();
      }
    };
  }

  /**
   * Get Token sent in client request
   * @method
   * @memberof UserController
   * @static
   * @return {function} Express middleware function that gets
   * authorization token from request body, query, header or cookies
   * and passes request to next middleware function.
   */
  static getClientAuthToken() {
    return (req, res, next) => {
      const token = req.get('Authorization') || req.body.token
      || req.cookies.token || req.query.token;
      if (!token) {
        return res.status(400).send('No Access token provided!');
      }
      const matched = /^Bearer (\S+)$/.exec(token);
      req.token = (matched) ? matched[1] : token;
      next();
    };
  }

  /**
   * Authenticate a user with username and password
   * @method
   * @memberof UserController
   * @static
   * @return {function} Express middleware function that
   * validates username and password  and sends token to client
   */
  static authenticateUser() {
    return (req, res) => {
      const username = req.body.username;
      return ModelService.getModelInstance(userModel, { username })
      .then((user) => {
        return user.verifyPassword(req.body.password)
        .then((passwordIsValid) => {
          if (passwordIsValid) {
            const rsaKey = process.env.PRIVATE_KEY;
            return AuthService.generateToken(user, rsaKey);
          }
          throw new Error('Invalid Password');
        })
        .then((token) => {
          return res.status(200).json(token);
        });
      })
      .catch((err) => {
        return res.status(401).send(err.message);
      });
    };
  }

  /**
   * Verify user token and authorize user to access requested route
   * @method
   * @memberof UserController
   * @static
   * @return {function} Express middleware function that
   * validates user token and pass request to route handler
   */
  static authorizeUser() {
    return (req, res, next) => {
      const rsaKey = process.env.PUBLIC_KEY;
      return AuthService.verifyTokenGetPayload(req.token, rsaKey)
      .then((decodedPayload) => {
        req.username = decodedPayload.key;
        next();
      })
      .catch((err) => {
        return res.status(401).send(err.message);
      });
    };
  }

  /**
   * Create a user
   * @method
   * @memberof UserController
   * @static
   * @return {function} Express middleware function that creates
   * new user and sends response to client
   */
  static createUser() {
    return (req, res, next) => {
      ModelService.createModelInstance(userModel, req.body)
      .then((user) => {
        return res.status(201).send(user);
      })
      .catch((err) => {
        next(err);
      });
    };
  }

  /**
   * Delete a user
   * @method
   * @memberof ModelService
   * @static
   * @returns {function} Express middleware function which deletes
   * user and sends response to client
   */
  static deleteUser() {
    return (req, res, next) => {
      ModelService.deleteModelInstance(userModel, {
        username: req.username
      })
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        next(err);
      });
    };
  }

  /**
   * Update user profile
   * @method
   * @memberof ModelService
   * @static
   * @returns {function} Express middleware function which updates
   * user details and sends response to client
   */
  static updateUser() {
    return (req, res, next) => {
      ModelService.updateModelInstance(userModel, {
        username: req.username
      }, req.body)
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => {
        next(err);
      });
    };
  }

  /**
   * Get a user
   * @method
   * @memberof ModelService
   * @static
   * @returns {function} Express middleware function which gets
   * a user and sends response to client
   */
  static getUser() {
    return (req, res, next) => {
      ModelService.getModelInstance(userModel, {
        username: req.params.username
      })
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => {
        next(err);
      });
    };
  }

  /**
   * Get all the groups a user belong to
   * @method
   * @memberof ModelService
   * @static
   * @returns {function} Express middleware function which gets
   * user's groups and sends response to client
   */
  static getUserGroups() {
    return (req, res, next) => {
      AdhocModelService.getUserGroups(req.username)
      .then((groups) => {
        res.status(200).send(groups);
      })
      .catch((err) => {
        next(err);
      });
    };
  }
}
export default UserController;
