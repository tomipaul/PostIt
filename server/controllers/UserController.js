import ModelService from '../services/ModelService';
import AdhocModelService from '../services/AdhocModelService';
import AuthService from '../services/AuthService';
import models from '../models';
import NotificationService from '../services/NotificationService.js';

const userModel = models.User;

/**
 * @class UserController
 */
class UserController {
  /**
   * extract user details
   * @method extractFromUserObject
   * @memberof UserController
   * @static
   * @param {object} userObject
   * @return {object} an object with username, email
   * phoneNo, status and photoURL
   */
  static extractFromUserObject(userObject) {
    const {
      id,
      username,
      email,
      phoneNo,
      status,
      photoURL
    } = userObject;
    return { id, username, email, phoneNo, status, photoURL };
  }

  /**
   * generate pagination metadata
   * @param {number} limit
   * @param {number} offset
   * @param {number} totalCount
   * @param {number} pageSize
   * @return {object} pagination metadata
   */
  static paginateUserSearch({ limit, offset, totalCount, pageSize }) {
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = Math.floor((offset + limit) / limit);
    const nextPage = (totalPages > currentPage) ?
    currentPage + 1 : null;
    return {
      currentPage,
      pageSize: (currentPage) ? pageSize : null,
      nextPage,
      totalPages
    };
  }
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
        err.code = 422;
        return next(err);
      } else if (!req.body.username || !req.body.password) {
        const err = new Error('non-empty username and password expected');
        err.code = 422;
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
        err.code = 422;
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
          const userInfo = UserController.extractFromUserObject(user);
          return res.status(200).json({
            user: {
              id: userInfo.id,
              username: userInfo.username,
              photoURL: userInfo.photoURL
            },
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
        const userInfo = UserController
        .extractFromUserObject(decodedPayload);
        req.userId = userInfo.id;
        req.userStatus = userInfo.status;
        req.username = userInfo.username;
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
   * @memberof UserController
   * @static
   * @return {function} Express middleware function which
   * permits only the authenticated user or
   * admin to utilize an endpoint
   */
  static permitOwnerAndAdmin() {
    return (req, res, next) => {
      if (req.userStatus === 'admin' ||
      req.params.userId === req.userId) {
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
   * @memberof UserController
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
      const { status, id, ...credentials } = req.body;
      AdhocModelService.validateInputs(userModel, credentials)
      .then(() => {
        return ModelService.createModelInstance(userModel, credentials);
      })
      .then((user) => {
        const userInfo = UserController.extractFromUserObject(user);
        req.user = userInfo;
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
   * @memberof UserController
   * @static
   * @returns {function} Express middleware function which deletes
   * user and sends response to client
   */
  static deleteUser() {
    return (req, res, next) => {
      ModelService.deleteModelInstance(userModel, {
        id: req.params.userId
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
   * @memberof UserController
   * @static
   * @returns {function} Express middleware function which updates
   * user details and sends response to client
   */
  static updateUser() {
    return (req, res, next) => {
      ModelService.updateModelInstance(userModel, {
        id: req.params.userId || req.userId
      }, req.body)
      .then((user) => {
        const userInfo = UserController.extractFromUserObject(user);
        return res.status(200).json({
          user: userInfo,
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
   * @memberof UserController
   * @static
   * @returns {function} Express middleware function which gets
   * a user and sends response to client
   */
  static getUser() {
    return (req, res, next) => {
      ModelService.getModelInstance(userModel, {
        id: req.params.userId || req.userId
      })
      .then((userObj) => {
        const userInfo = UserController
        .extractFromUserObject(userObj);
        return res.status(200).json({
          user: userInfo
        });
      })
      .catch((err) => {
        return next(err);
      });
    };
  }

  /**
   * Get all users
   * @method
   * @memberof UserController
   * @static
   * @returns {function} Express middleware function which gets
   * all users and sends response to client
   */
  static getAllUsers() {
    return (req, res, next) => {
      ModelService.getModelInstances({
        model: userModel,
        attributes: {
          exclude: ['password']
        }
      })
      .then((users) => {
        return res.status(200).json(users);
      })
      .catch((err) => {
        return next(err);
      });
    };
  }

  /**
   * Search users in the application
   * @method
   * @memberof UserController
   * @static
   * @returns {function} Express middleware function that search
   * users and sends response to client
   */
  static searchUsers() {
    return (req, res, next) => {
      const { limit, offset, searchString } = req.query;
      return userModel.findAndCountAll({
        limit,
        offset,
        where: {
          username: {
            $iLike: `%${searchString || ''}%`
          }
        },
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt']
        }
      })
      .then((users) => {
        const data = UserController.paginateUserSearch({
          limit,
          offset,
          totalCount: users.count,
          pageSize: users.rows.length
        });
        return res.status(200).json({
          ...data,
          totalCount: users.count,
          users: users.rows
        });
      })
      .catch((error) => {
        return next(error);
      });
    };
  }

  /**
   * Get all the groups a user belong to
   * @method
   * @memberof UserController
   * @static
   * @returns {function} Express middleware function which gets
   * user's groups and sends response to client
   */
  static getUserGroups() {
    return (req, res, next) => {
      AdhocModelService.getUserGroups(req.userId)
      .then((groups) => {
        return res.status(200).json({ groups });
      })
      .catch((err) => {
        return next(err);
      });
    };
  }

  /**
   * Send mail to reset user password
   * @method
   * @memberof UserController
   * @static
   * @returns {function} Express middleware function which sends
   * a password reset mail to user
   */
  static sendResetPasswordMail() {
    return (req, res, next) => {
      const { recipient } = req.body;
      ModelService.getModelInstance(userModel, {
        email: recipient
      })
      .then((userObject) => {
        const rsaKey = process.env.PRIVATE_KEY;
        return AuthService.generateToken(userObject, rsaKey, '12h')
        .then((token) => {
          const url = (process.env.NODE_ENV === 'production') ?
          process.env.PROD_URL : process.env.LOCAL_URL;
          const actionUrl = `${url}/password/reset/${token}`;
          return {
            username: userObject.username,
            email: recipient,
            action_url: actionUrl
          };
        });
      })
      .then((options) => {
        return new NotificationService().sendResetPasswordMail(options)
        .then((message) => {
          return res.status(200).json({ message });
        });
      })
      .catch((err) => {
        return next(err);
      });
    };
  }

  /**
   * Get the count of all unread messages per group
   * @method
   * @memberof UserController
   * @static
   * @return {function} Express middleware function
   * which gets the count of all unread messages per group
   * and send response to client
   */
  static getUnreadMessages() {
    return (req, res, next) => {
      return AdhocModelService.getUnreadMessages({
        UserId: req.userId
      })
      .then((unreadMessages) => {
        const unreadMessagesObject = unreadMessages
        .reduce((acc, unreadMessage) => {
          acc[unreadMessage.GroupId] = (acc[unreadMessage.GroupId]) ?
          (acc[unreadMessage.GroupId].concat(unreadMessage.MessageId))
          : [unreadMessage.MessageId];
          return acc;
        }, {});
        return res.status(200).json(unreadMessagesObject);
      })
      .catch((err) => {
        return next(err);
      });
    };
  }
}

export default UserController;
