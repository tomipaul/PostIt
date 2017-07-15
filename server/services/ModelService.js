/**
 * @class ModelService
 */
class ModelService {
  /**
   * Validate inputs when creating new model instances
   * @method
   * @static
   * @memberof ModelService
   * @param {object} model
   * @param {object} fields
   * @returns {(Promise|undefined)} A promise that rejects with error
   * if a field is missing/undefined Or undefined if no missing field
   */
  static validateInputs(model, fields) {
    const error = new Error();
    error.code = 400;
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
    }
    return (error.message) ? Promise.reject(error) :
    Promise.resolve(true);
  }
  /**
   * Get a single instance of a model - equivalent of a database table row
   * @method
   * @static
   * @memberof ModelService
   * @param {Object} model
   * @param {Object} attributes
   * @returns {Promise.object} A promise which resolves to the
   * matching model instance
   */
  static getModelInstance(model, attributes) {
    const promise = (Object.keys(attributes).includes('id')) ?
    model.findById(attributes.id) :
    model.findOne({ where: attributes });
    return promise.then((modelInstance) => {
      if (modelInstance) {
        return modelInstance;
      }
      const err = new Error(`Error! ${model.name} does not exist`);
      err.code = 404;
      throw err;
    })
    .catch((err) => {
      const msg = `Exception! operation get ${model.name} failed`;
      throw ModelService.processError(msg, model, err);
    });
  }

  /**
   * Get instances of a model - equivalent of multiple rows in a
   * database table
   * @method
   * @static
   * @memberof ModelService
   * @param {Object} model
   * @param {Object} attributes
   * @returns {Promise.array.object} A promise which resolves to
   * an array of matching model instances
   */
  static getModelInstances(model, attributes) {
    return model.findAll({ where: attributes })
    .then((instanceArray) => {
      return instanceArray;
    })
    .catch((err) => {
      const msg = `Exception! operation get ${model.name}s failed`;
      throw ModelService.processError(msg, model, err);
    });
  }

  /**
   * Creates a model instance - equivalent of a database table row
   * @method
   * @static
   * @memberof ModelService
   * @param {Object} model
   * @param {Object} newAttributes
   * @returns {Promise.object} resolves wth created model instance
   */
  static createModelInstance(model, newAttributes) {
    return ModelService.validateInputs(model, newAttributes)
    .then(() => {
      return model.create(newAttributes)
      .then((modelInstance) => {
        if (modelInstance) {
          return modelInstance;
        }
        throw new Error();
      })
      .catch((err) => {
        const msg = `Exception! operation create ${model.name} failed`;
        throw ModelService.processError(msg, model, err);
      });
    });
  }

  /**
   * updates a model instance - equivalent of a database table row
   * @method
   * @static
   * @memberof ModelService
   * @param {Object} model
   * @param {Object} attributes
   * @param {Object} newAttributes
   * @returns {Promise.object} resolves with updated model instance
   */
  static updateModelInstance(model, attributes, newAttributes) {
    return ModelService.getModelInstance(model, attributes)
    .then((modelInstance) => {
      return modelInstance.update(newAttributes)
      .then((updatedInstance) => {
        if (updatedInstance) {
          return updatedInstance;
        }
        throw new Error();
      });
    })
    .catch((err) => {
      const msg = `Exception! operation update ${model.name} failed`;
      throw ModelService.processError(msg, model, err);
    });
  }

  /**
   * Deletes a model instance - equivalent of a database table row
   * @method
   * @static
   * @memberof ModelService
   * @param {Object} model
   * @param {Object} attributes
   * @returns {Promise} resolves with void on success
   */
  static deleteModelInstance(model, attributes) {
    return ModelService.getModelInstance(model, attributes)
    .then((modelInstance) => {
      return modelInstance.destroy();
    })
    .catch((err) => {
      const msg = `Exception! operation delete ${model.name} failed`;
      throw ModelService.processError(msg, model, err);
    });
  }

  /**
   * Refine the error object to be sent to client
   * @method
   * @static
   * @memberof ModelService
   * @param {String} message error message to client
   * @param {Object} model the operational model
   * @param {Object} err the error object
   * @returns {Object} the refined error object which is thrown
   */
  static processError(message, model, err) {
    if (!err.code) {
      if (err instanceof model.sequelize.ValidationError) {
        err.code = 400;
      } else {
        err.code = 500;
        err.message = message;
      }
    }
    return err;
  }
}
export default ModelService;
