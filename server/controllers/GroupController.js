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
        if (group.CreatorUsername === req.username) {
          req.group = group;
          return next();
        }
        const msg = 'Access denied! You need group Ownership';
        const err = new Error(msg);
        err.code = 403;
        throw err;
      })
      .catch((err) => {
        next(err);
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
          if (hasUser) {
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
        next(err);
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
      req.body.CreatorUsername = req.username;
      ModelService.createModelInstance(groupModel, req.body)
      .then((group) => {
        return group.addUser(req.username)
        .then(() => {
          res.status(201).send(group);
        });
      })
      .catch((err) => {
        next(err);
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
        return res.sendStatus(200);
      })
      .catch((err) => {
        next(err);
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
      .then(() => {
        return res.sendStatus(200);
      })
      .catch((err) => {
        next(err);
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
        return res.status(200).json(messages);
      })
      .catch((err) => {
        next(err);
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
        return res.sendStatus(200);
      })
      .catch((err) => {
        next(err);
      });
    };
  }
}

export default GroupController;
