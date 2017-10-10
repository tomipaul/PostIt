import ModelService from './ModelService';
import models from '../models';

/**
 * @class AdhocModelService
 */
class AdhocModelService {
  /**
   * Validate inputs when creating new model instances
   * @method
   * @static
   * @memberof AdhocModelService
   * @param {object} model
   * @param {object} fields
   * @returns {(Promise|undefined)} A promise that rejects with error
   * if a field is missing/undefined Or undefined if no missing field
   */
  static validateInputs(model, fields) {
    const error = new Error();
    error.code = 422;
    if (model.name === 'Group') {
      const { name } = fields;
      if (name === undefined) {
        error.message = 'Incomplete field; name is required';
      }
    } else if (model.name === 'User') {
      const { username, password, email, phoneNo } = fields;
      if ([username, password, email, phoneNo].includes(undefined)) {
        error.message = 'Username, password, email and phoneNo required';
      }
    } else if (model.name === 'Message') {
      const { text } = fields;
      if (text === undefined) {
        error.message = 'Incomplete field; text is required';
      }
    }
    return (error.message) ? Promise.reject(error) :
    Promise.resolve(true);
  }
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
   * @param {String|Array.<string>} userId
   * @param {String|Object} group primary key or instance of group
   * @returns {Promise} A promise that resolves with null on success
   */
  static addUserToGroup(userId, group) {
    return AdhocModelService.returnModelInstance('Group', group)
    .then((groupInstance) => {
      if (!userId) {
        const err = new Error('Username is invalid or not defined');
        err.code = 422;
        throw err;
      } else {
        return Promise.all([
          groupInstance.hasUser(userId),
          models.User.findById(userId)
        ])
        .then((isValid) => {
          if (isValid[0] || !isValid[1]) {
            const err = (isValid[0]) ?
            new Error('User already belong to group')
            : new Error('User does not exist');
            err.code = 422;
            throw err;
          }
          return groupInstance.addUser(userId)
          .then(() => { return isValid[1]; });
        });
      }
    })
    .catch((err) => {
      throw err;
    });
  }

  /**
   * Remove a user from a group
   * @method removeUserFromGroup
   * @memberof AdhocModelService
   * @static
   * @param {String|Array.<string>} userId
   * @param {String} group primary key or instance of group
   * @returns {Promise} A promise that resolves with null on success
   */
  static removeUserFromGroup(userId, group) {
    return AdhocModelService.returnModelInstance('Group', group)
    .then((groupInstance) => {
      return groupInstance.removeUser(userId)
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new Error('User does not exist in group');
        err.code = 422;
        throw err;
      });
    })
    .catch((err) => {
      throw err;
    });
  }

  /**
   * Get all users in a group
   * @method getAllGroupUsers
   * @memberof AdhocModelService
   * @static
   * @param {String|Object} group primary key or instance of group
   * @returns {Promise.array} resolves with an array of user instances
   */
  static getAllGroupUsers(group) {
    return AdhocModelService.returnModelInstance('Group', group)
    .then((groupInstance) => {
      return groupInstance.getUsers({
        attributes: {
          exclude: [
            'password',
            'createdAt',
            'updatedAt',
            'status'
          ]
        },
        joinTableAttributes: []
      });
    })
    .catch((err) => {
      throw err;
    });
  }

  /**
   * @method addMessageToGroup
   * @memberof AdhocModelService
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
      return AdhocModelService.validateInputs(models.Message, message)
      .then(() => {
        return groupInstance.createMessage(message);
      });
    })
    .catch((err) => {
      throw err;
    });
  }

  /**
   * Remove a message from a group
   * @method
   * @memberof AdhocModelService
   * @static
   * @param {String} messageId
   * @param {String|object} group primary key or instance of group
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
   * @memberof AdhocModelService
   * @static
   * @param {String|object} group primary key or instance of group
   * @returns {Promise} resolves with an array of message instances
   */
  static getGroupMessages(group) {
    return AdhocModelService.returnModelInstance('Group', group)
    .then((groupInstance) => {
      return groupInstance.getMessages({
        include: [{
          association: 'Author',
          attributes: ['photoURL', 'username']
        }],
        order: ['createdAt']
      });
    })
    .catch((err) => {
      throw err;
    });
  }

  /**
   * @method
   * @memberof AdhocModelService
   * @static
   * @param {String} userId
   * @returns {Promise} resolve with an array of group instances
   */
  static getUserGroups(userId) {
    return AdhocModelService.returnModelInstance('User', userId)
    .then((user) => {
      return user.getGroups({
        attributes: ['id', 'name', 'description', 'CreatorId']
      });
    })
    .catch((err) => {
      throw err;
    });
  }

  /**
   * get users that have read a particular message
   * @method
   * @memberof AdhocModelService
   * @static
   * @param {string} messageId
   * @returns {Promise} resolves on success with an array of users
   */
  static getUsersWithMessageRead(messageId) {
    return AdhocModelService.returnModelInstance('Message', messageId)
    .then((message) => {
      return message.getUsers({
        attributes: ['username'],
        joinTableAttributes: [
          'GroupId',
          'MessageId',
          'UserId',
          'read'
        ]
      });
    })
    .catch((err) => {
      throw err;
    });
  }

  /**
   * get the count of unread messages
   * in a particular group for a user
   * @method
   * @memberof AdhocModelService
   * @static
   * @param {string} attributes
   * @returns {Promise} resolves on success with an array of users
   */
  static getUnreadMessages(attributes) {
    return ModelService.getModelInstances({
      model: models.UserMessages,
      where: {
        ...attributes,
        read: false
      }
    })
    .catch((err) => {
      throw err;
    });
  }
}
export default AdhocModelService;
