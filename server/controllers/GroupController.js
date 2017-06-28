import ModelService from '../services/ModelService';
import AdhocModelService from '../services/AdhocModelService';
import models from '../models';

const groupModel = models.Group;
/**
 * @class GroupController
 */
class GroupController {
  /**
   * Create a broadcast group
   * @method
   * @memberof GroupController
   * @static
   * @return {function} Express middleware function which creates
   * a group and sends response to client
   */
  static createGroup() {
    return (req, res) => {
      ModelService.createModelInstance(groupModel, req.body)
      .then((group) => {
        if (group) {
          res.status(201).send(group);
        }
      })
      .catch((err) => {
        res.status(400).send(err.message);
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
    return (req, res) => {
      const groupId = req.params.groupId;
      const username = req.body.username;
      AdhocModelService.addUserToGroup(username, groupId)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.status(400).send(err.message);
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
    return (req, res) => {
      const groupId = req.params.groupId;
      const message = { ...req.body, AuthorUsername: req.username };
      AdhocModelService.addMessageToGroup(message, groupId)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res = (err.code) ? res.status(err.code) : res;
        res.send(err.message);
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
    return (req, res) => {
      const groupId = req.params.groupId;
      AdhocModelService.getGroupMessages(groupId)
      .then((messages) => {
        res.status(200).json(messages);
      })
      .catch((err) => {
        res.send(err.message);
      });
    };
  }
}
export default GroupController;
