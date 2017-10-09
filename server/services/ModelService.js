/**
 * @class ModelService
 */
class ModelService {
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
    const id = attributes.id;
    const promise = (id) ?
    model.findById(id) :
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
   * @param {Object.object} model
   * @param {Object.object} where scope of search
   * @param {Object.<object|array>} attributes list of attributes to select
   * or an object with include and exclude keys
   * @returns {Promise.array.object} A promise which resolves to
   * an array of matching model instances
   */
  static getModelInstances({ model, where, attributes, include }) {
    return model.findAll({
      where,
      attributes,
      include
    })
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
        err.code = 422;
      } else {
        err.code = 500;
        err.message = message;
      }
    }
    return err;
  }
}
export default ModelService;
