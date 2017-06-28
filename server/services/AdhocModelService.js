import ModelService from './ModelService';
import models from '../models';

/**
 * @class ModelService
 */
class AdhocModelService {
  /**
   * Add a registered user to a group
   * @method addUserToGroup
   * @memberof ModelService
   * @static
   * @param {String|Array.<string>} username
   * @param {String} groupId
   * @returns {Promise} A promise that resolves with null on success
   */
  static addUserToGroup(username, groupId) {
    const groupModel = models.Group;
    return ModelService.getModelInstance(groupModel, { id: groupId })
    .then((group) => {
      return (Array.isArray(username)) ?
      group.addUsers(username) : group.addUser(username);
    });
  }

  /**
   * Remove a user from a group
   * @method removeUserFromGroup
   * @memberof ModelService
   * @static
   * @param {String|Array.<string>} username
   * @param {String} groupId
   * @returns {Promise} A promise that resolves with null on success
   */
  static removeUserFromGroup(username, groupId) {
    const groupModel = models.Group;
    return ModelService.getModelInstance(groupModel, { id: groupId })
    .then((group) => {
      return (Array.isArray(username)) ?
      group.removeUsers(username) : group.removeUser(username);
    });
  }

  /**
   * Get all users in a group
   * @method getAllGroupUsers
   * @memberof ModelService
   * @static
   * @param {String} groupId
   * @returns {Promise.array} resolves with an array of user instances
   */
  static getAllGroupUsers(groupId) {
    const groupModel = models.Group;
    return ModelService.getModelInstance(groupModel, { id: groupId })
    .then((group) => {
      return group.getUsers();
    });
  }

  /**
   * @method postMessageToGroup
   * @memberof ModelService
   * @static
   * @param {Object} message
   * @param {Object.string} message.text
   * @param {Object.string} message.priority
   * @param {*} groupId
   * @returns {Promise} A promise that resolves with null on success
   */
  static addMessageToGroup(message, groupId) {
    const groupModel = models.Group;
    return ModelService.getModelInstance(groupModel, { id: groupId })
    .then((group) => {
      return group.hasUser(message.AuthorUsername)
      .then((hasUser) => {
        if (hasUser) {
          return group.createMessage(message);
        }
        const msg = 'Access denied! You need group membership';
        const err = new Error(msg);
        err.code = 403;
        throw err;
      });
    });
  }

  /**
   * Remove a message from a group
   * @method
   * @memberof ModelService
   * @static
   * @param {String} messageId
   * @param {String} groupId
   * @returns {Promise} resolves with void on success
   */
  static removeMessageFromGroup(messageId, groupId) {
    const groupModel = models.Group;
    return ModelService.getModelInstance(groupModel, { id: groupId })
    .then((group) => {
      return group.removeMessage(messageId);
    });
  }

  /**
   * @method
   * @memberof ModelService
   * @static
   * @param {String} groupId
   * @returns {Promise} resolves with an array of message instances
   */
  static getGroupMessages(groupId) {
    const groupModel = models.Group;
    return ModelService.getModelInstance(groupModel, { id: groupId })
    .then((group) => {
      return group.getMessages();
    });
  }

  /**
   * @method
   * @memberof ModelService
   * @static
   * @param {String} username
   * @returns {Promise} resolve with an array of group instances
   */
  static getUserGroups(username) {
    const userModel = models.User;
    return ModelService.getModelInstance(userModel, { username })
    .then((user) => {
      return user.getGroups();
    });
  }
}
export default AdhocModelService;
