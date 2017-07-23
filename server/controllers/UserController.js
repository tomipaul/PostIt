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
        const err = new Error('POST request method expected');
        err.code = 400;
        return next(err);
      } else if (!req.body.username || !req.body.password) {
        const err = new Error('non-empty username and password expected');
        err.code = 400;
        return next(err);
      }
      return next();
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
        const err = new Error('No Access token provided!');
        err.code = 400;
        return next(err);
      }
      const matched = /^Bearer (\S+)$/.exec(token);
      req.token = (matched) ? matched[1] : token;
      return next();
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
    return (req, res, next) => {
      const userName = req.body.username || req.user.username;
      return ModelService.getModelInstance(userModel, {
        username: userName
      })
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
          const { username, email, phoneNo } = user;
          return res.status(200).json({
            user: { username, email, phoneNo },
            token,
            message: 'Authentication Successful'
          });
        });
      })
      .catch((err) => {
        if (!err.code) { err.code = 401; }
        return next(err);
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
        req.username = decodedPayload.username;
        req.userStatus = decodedPayload.status;
        return next();
      })
      .catch(() => {
        const err = new Error('Invalid token sent in request');
        err.code = 401;
        return next(err);
      });
    };
  }

  /**
   * Restrict access to profile owner and admin only
   * @method permitUserorAdmin
   * @memberof GroupController
   * @static
   * @return {function} Express middleware function which
   * permits only the authenticated user or
   * admin to utilize an endpoint
   */
  static permitOwnerAndAdmin() {
    return (req, res, next) => {
      if (req.userStatus === 'admin' ||
      req.params.username === req.username) {
        return next();
      }
      const msg = "Access denied! You don't have appropriate privileges";
      const err = new Error(msg);
      err.code = 403;
      return next(err);
    };
  }

  /**
   * Restrict access to admin only
   * @method permitAdmin
   * @memberof GroupController
   * @static
   * @return {function} Express middleware function which
   * permits only the admin to utilize an endpoint
   */
  static permitAdmin() {
    return (req, res, next) => {
      if (req.userStatus === 'admin') {
        return next();
      }
      const msg = "Access denied! You don't have appropriate privileges";
      const err = new Error(msg);
      err.code = 403;
      return next(err);
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
      const { status, ...credentials } = req.body;
      AdhocModelService.validateInputs(userModel, credentials)
      .then(() => {
        return ModelService.createModelInstance(userModel, credentials);
      })
      .then((user) => {
        req.user = {
          username: user.username,
          email: user.email,
          phoneNo: user.phoneNo,
          status: user.status
        };
        return next();
      })
      .catch((err) => {
        return next(err);
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
        username: req.params.username
      })
      .then(() => {
        return res.sendStatus(204);
      })
      .catch((err) => {
        return next(err);
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
        username: req.params.username
      }, req.body)
      .then((user) => {
        const { username, email, phoneNo, status } = user;
        return res.status(200).json({
          user: { username, email, phoneNo, status },
          message: 'User updated'
        });
      })
      .catch((err) => {
        return next(err);
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
      .then((userObj) => {
        const { username, email, phoneNo, status } = userObj;
        return res.status(200).json({
          user: { username, email, phoneNo, status }
        });
      })
      .catch((err) => {
        return next(err);
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
        return res.status(200).json({ groups });
      })
      .catch((err) => {
        return next(err);
      });
    };
  }
}
export default UserController;
