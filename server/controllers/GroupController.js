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
            return res.status(201).json({
              group: { id, name, description, CreatorUsername },
              message: 'Group created'
            });
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
      const username = req.body.username;
      return AdhocModelService.addUserToGroup(username, req.group)
      .then(() => {
        return res.status(200).json({
          username,
          message: `User ${username} added to group`
        });
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
      return ModelService.getModelInstance(models.User, {
        username: message.AuthorUsername
      })
      .then((user) => {
        return AdhocModelService
        .addMessageToGroup(message, req.group)
        .then((createdMessage) => {
          createdMessage.dataValues = {
            ...createdMessage.dataValues,
            AuthorImageLink: user.photoURL
          };
          return res.status(200).json({
            createdMessage,
            message: 'Message posted to group'
          });
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
        return res.status(200).json({ messages });
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
        return res.status(200).json({ users });
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
        return res.status(200).json({
          username,
          message: 'User removed from group'
        });
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
        return res.status(200).json({
          message: `Hi ${req.username}, you just read a message`
        });
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
        return res.status(200).json({ users });
      })
      .catch((err) => {
        return next(err);
      });
    };
  }
}

export default GroupController;
