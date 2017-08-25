import ModelService from '../services/ModelService';
import AdhocModelService from '../services/AdhocModelService';
import models from '../models';

const groupModel = models.Group;
/**
 * @class GroupController
 */
class GroupController {

  /**
   * Restrict access to group owner only
   * @method permitOnlyGroupOwner
   * @memberof GroupController
   * @static
   * @return {function} Express middleware function which
   * permits only a group owner to utilize an endpoint
   */
  static permitOnlyGroupOwner() {
    return (req, res, next) => {
      const groupId = req.params.groupId;
      return ModelService.getModelInstance(groupModel, {
        id: groupId
      })
      .then((group) => {
        if (group.CreatorUsername === req.username ||
        req.userStatus === 'admin') {
          req.group = group;
          return next();
        }
        const msg = 'Access denied! You need group Ownership';
        const err = new Error(msg);
        err.code = 403;
        throw err;
      })
      .catch((err) => {
        return next(err);
      });
    };
  }

  /**
   * Restrict access to group members only
   * @method permitOnlyGroupMembers
   * @memberof GroupController
   * @static
   * @return {function} Express middleware function which
   * permits only group members to utilize an endpoint
   */
  static permitOnlyGroupMembers() {
    return (req, res, next) => {
      const groupId = req.params.groupId;
      return ModelService.getModelInstance(groupModel, {
        id: groupId
      })
      .then((group) => {
        return group.hasUser(req.username)
        .then((hasUser) => {
          if (hasUser || req.userStatus === 'admin') {
            req.group = group;
            return next();
          }
          const msg = 'Access denied! You need group membership';
          const err = new Error(msg);
          err.code = 403;
          throw err;
        });
      })
      .catch((err) => {
        return next(err);
      });
    };
  }

  /**
   * Create a broadcast group
   * @method
   * @memberof GroupController
   * @static
   * @return {function} Express middleware function which creates
   * a group and sends response to client
   */
  static createGroup() {
    return (req, res, next) => {
      return AdhocModelService.validateInputs(req.body)
      .then(() => {
        return groupModel.findOne({
          where: {
            name: req.body.name,
            CreatorUsername: req.username
          }
        });
      })
      .then((group) => {
        if (group) {
          const err = new Error();
          err.message = `You have an existing group ${req.body.name}`;
          err.code = 400;
          throw err;
        }
      })
      .then(() => {
        req.body.CreatorUsername = req.username;
        return ModelService.createModelInstance(groupModel, req.body)
        .then((group) => {
          return group.addUser(req.username)
          .then(() => {
            const { id, name, description, CreatorUsername } = group;
            req.res = {
              statusCode: 201,
              data: {
                group: { id, name, description, CreatorUsername },
                message: 'Group created'
              }
            };
            return next();
          });
        });
      })
      .catch((err) => {
        return next(err);
      });
    };
  }

  /**
   * Add a user to a group
   * @method
   * @memberof GroupController
   * @static
   * @return {function} Express middleware function which adds a
   * user to a group and sends response to client
   */
  static addUserToGroup() {
    return (req, res, next) => {
      const userName = req.body.username;
      return AdhocModelService.addUserToGroup(userName, req.group)
      .then((user) => {
        const { username, photoURL } = user;
        req.res = {
          data: {
            user: { userName, photoURL },
            message: `User ${username} added to group`
          }
        };
        return next();
      })
      .catch((err) => {
        return next(err);
      });
    };
  }

  /**
   * Post message to a group
   * @method
   * @memberof GroupController
   * @static
   * @return {function} Express middleware function which adds a
   * message to a group and sends response to client
   */
  static addMessageToGroup() {
    return (req, res, next) => {
      const message = {
        ...req.body,
        AuthorUsername: req.username
      };
      return AdhocModelService
      .addMessageToGroup(message, req.group)
      .then((createdMessage) => {
        return createdMessage.getAuthor()
        .then((author) => {
          createdMessage.dataValues.Author = {
            photoURL: author.photoURL
          };
          req.res = {
            data: {
              createdMessage,
              message: 'Message posted to group'
            }
          };
          return next();
        });
      })
      .catch((err) => {
        return next(err);
      });
    };
  }

  /**
   * Retrieve messages that have been posted to a group
   * @method
   * @memberof GroupController
   * @static
   * @return {function} Express middleware function which gets
   * group messages and sends response to client
   */
  static getGroupMessages() {
    return (req, res, next) => {
      return AdhocModelService.getGroupMessages(req.group)
      .then((messages) => {
        req.res = { data: { messages } };
        return next();
      })
      .catch((err) => {
        return next(err);
      });
    };
  }

  /**
   * Retrieve all users in a group
   * @method
   * @memberof GroupController
   * @static
   * @return {function} Express middleware function which gets
   * group users and sends response to client
   */
  static getGroupUsers() {
    return (req, res, next) => {
      return AdhocModelService.getAllGroupUsers(req.group)
      .then((users) => {
        req.res = { data: { users } };
        return next();
      })
      .catch((err) => {
        return next(err);
      });
    };
  }

  /**
   * Remove a user from a group
   * @method
   * @memberof GroupController
   * @static
   * @return {function} Express middleware function which removes a
   * user from a group and sends response to client
   */
  static removeUserFromGroup() {
    return (req, res, next) => {
      const username = req.body.username;
      return AdhocModelService
      .removeUserFromGroup(username, req.group)
      .then(() => {
        req.res = {
          data: {
            username,
            message: 'User removed from group'
          }
        };
        return next();
      })
      .catch((err) => {
        return next(err);
      });
    };
  }

  /**
   * Read a message posted to a group
   * @method
   * @memberof GroupController
   * @static
   * @return {function} Express middleware function
   * which adds a user to a message
   */
  static readGroupMessage() {
    return (req, res, next) => {
      const { messageId } = req.body;
      AdhocModelService
      .addUserToMessage(messageId, req.username, req.group.id)
      .then(() => {
        req.res = {
          data: {
            message: `Hi ${req.username}, you just read a message`
          }
        };
        return next();
      })
      .catch((err) => {
        return next(err);
      });
    };
  }

  /**
   * Get all users that have read a group message
   * @method
   * @memberof GroupController
   * @static
   * @return {function} Express middleware function
   * which gets all users that have read a group message
   * and send response to client
   */
  static getUsersThatReadMessage() {
    return (req, res, next) => {
      const { messageId } = req.params;
      AdhocModelService.getMessageUsers(messageId)
      .then((users) => {
        req.res = {
          data: { users }
        };
        return next();
      })
      .catch((err) => {
        return next(err);
      });
    };
  }
  /**
   * Send response to client and end the request response cycle
   * @method
   * @memberof GroupController
   * @static
   * @return {function} Express middleware function that
   * sends response to client and ends the request
   */
  static sendResponse() {
    return (req, res) => {
      const status = req.res.statusCode || 200;
      return res.status(status).json(req.res.data);
    };
  }
}

export default GroupController;
