import ModelService from './ModelService';
import models from '../models';

/**
 * @class AdhocModelService
 */
class AdhocModelService {
  /**
   * @method returnModelInstance
   * @memberof AdhocModelService
   * @static
   * @param {String} modelName Name of the Model
   * @param {String|Object} instance primary key
   * or the model instance
   * @returns {Promise} A promise that resolves with the instance
   */
  static returnModelInstance(modelName, instance) {
    const model = models[modelName];
    const modelInstancePromise = (typeof instance === 'string') ?
    ModelService.getModelInstance(model, { id: instance })
    : Promise.resolve(instance);
    return modelInstancePromise;
  }

  /**
   * Add a registered user to a group
   * @method addUserToGroup
   * @memberof AdhocModelService
   * @static
   * @param {String|Array.<string>} username
   * @param {String|Object} group primary key or instance of group
   * @returns {Promise} A promise that resolves with null on success
   */
  static addUserToGroup(username, group) {
    return AdhocModelService.returnModelInstance('Group', group)
    .then((groupInstance) => {
      if (!username) {
        const err = new Error('Username is invalid or not defined');
        err.code = 400;
        throw err;
      } else if (groupInstance.hasUser(username)) {
        const err = new Error('User already belong to group');
        err.code = 400;
        throw err;
      }
      return (Array.isArray(username)) ?
      groupInstance.addUsers(username)
      : groupInstance.addUser(username);
    })
    .catch((err) => {
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
    return AdhocModelService.returnModelInstance('Group', group)
    .then((groupInstance) => {
      return (Array.isArray(username)) ?
      groupInstance.removeUsers(username)
      : groupInstance.removeUser(username);
    })
    .catch((err) => {
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
    return AdhocModelService.returnModelInstance('Group', group)
    .then((groupInstance) => {
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
   * @returns {Promise} A promise that resolves on success
   */
  static addMessageToGroup(message, group) {
    return AdhocModelService.returnModelInstance('Group', group)
    .then((groupInstance) => {
      if (message.text === undefined) {
        const err = new Error();
        err.code = 400;
        err.message = 'Message text is required';
        throw err;
      }
      return Promise.all([
        groupInstance.createMessage(message),
        groupInstance.getUsers()
      ])
      .then((resolved) => {
        return resolved[0].addUsers(resolved[1])
        .then(() => {
          return resolved[0];
        });
      });
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
    return AdhocModelService.returnModelInstance('Group', group)
    .then((groupInstance) => {
      return (Array.isArray(messageId)) ?
      groupInstance.removeMessages(messageId)
      : groupInstance.removeMessage(messageId);
    })
    .catch((err) => {
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
    return AdhocModelService.returnModelInstance('Group', group)
    .then((groupInstance) => {
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
    return AdhocModelService.returnModelInstance('User', username)
    .then((user) => {
      return user.getGroups();
    })
    .catch((err) => {
      throw err;
    });
  }
}
export default AdhocModelService;
