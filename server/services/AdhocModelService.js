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
   * @param {String|Object} group primary key or instance of group
   * @returns {Promise} A promise that resolves with null on success
   */
  static addUserToGroup(username, group) {
    const groupModel = models.Group;
    const promise = (typeof group === 'string') ?
    ModelService.getModelInstance(groupModel, { id: group })
    : Promise.resolve(group);
    return promise.then((groupInstance) => {
      return (Array.isArray(username)) ?
      groupInstance.addUsers(username)
      : groupInstance.addUser(username);
    })
    .catch((err) => {
      if (!err.code) {
        err.message = 'Operation failed! Check provided username';
        err.code = 400;
      }
      throw err;
    });
  }

  /**
   * Remove a user from a group
   * @method removeUserFromGroup
   * @memberof ModelService
   * @static
   * @param {String|Array.<string>} username
   * @param {String} group primary key or instance of group
   * @returns {Promise} A promise that resolves with null on success
   */
  static removeUserFromGroup(username, group) {
    const groupModel = models.Group;
    const promise = (typeof group === 'string') ?
    ModelService.getModelInstance(groupModel, { id: group })
    : Promise.resolve(group);
    return promise.then((groupInstance) => {
      return (Array.isArray(username)) ?
      groupInstance.removeUsers(username)
      : groupInstance.removeUser(username);
    })
    .catch((err) => {
      if (!err.code) {
        err.message = 'Operation failed! Check provided username';
        err.code = 400;
      }
      throw err;
    });
  }

  /**
   * Get all users in a group
   * @method getAllGroupUsers
   * @memberof ModelService
   * @static
   * @param {String|Object} group primary key or instance of group
   * @returns {Promise.array} resolves with an array of user instances
   */
  static getAllGroupUsers(group) {
    const groupModel = models.Group;
    const promise = (typeof group === 'string') ?
    ModelService.getModelInstance(groupModel, { id: group })
    : Promise.resolve(group);
    return promise.then((groupInstance) => {
      return groupInstance.getUsers();
    })
    .catch((err) => {
      throw err;
    });
  }

  /**
   * @method postMessageToGroup
   * @memberof ModelService
   * @static
   * @param {Object} message
   * @param {Object.string} message.text
   * @param {Object.string} message.priority
   * @param {String|Object} group primary key or instance of group
   * @returns {Promise} A promise that resolves with null on success
   */
  static addMessageToGroup(message, group) {
    const groupModel = models.Group;
    const promise = (typeof group === 'string') ?
    ModelService.getModelInstance(groupModel, { id: group })
    : Promise.resolve(group);
    return promise.then((groupInstance) => {
      return groupInstance.createMessage(message);
    })
    .catch((err) => {
      throw err;
    });
  }

  /**
   * Remove a message from a group
   * @method
   * @memberof ModelService
   * @static
   * @param {String} messageId
   * @param {String} group primary key or instance of group
   * @returns {Promise} resolves with void on success
   */
  static removeMessageFromGroup(messageId, group) {
    const groupModel = models.Group;
    const promise = (typeof group === 'string') ?
    ModelService.getModelInstance(groupModel, { id: group })
    : Promise.resolve(group);
    return promise.then((groupInstance) => {
      return (Array.isArray(messageId)) ?
      groupInstance.removeMessages(messageId)
      : groupInstance.removeMessage(messageId);
    })
    .catch((err) => {
      if (!err.code) {
        err.message = 'Operation failed! Check provided message id';
        err.code = 400;
      }
      throw err;
    });
  }

  /**
   * @method
   * @memberof ModelService
   * @static
   * @param {String} group primary key or instance of group
   * @returns {Promise} resolves with an array of message instances
   */
  static getGroupMessages(group) {
    const groupModel = models.Group;
    const promise = (typeof group === 'string') ?
    ModelService.getModelInstance(groupModel, { id: group })
    : Promise.resolve(group);
    return promise.then((groupInstance) => {
      return groupInstance.getMessages();
    })
    .catch((err) => {
      throw err;
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
    })
    .catch((err) => {
      throw err;
    });
  }
}
export default AdhocModelService;
