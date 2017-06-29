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
      throw err;
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
      if (instanceArray.length !== 0) {
        return instanceArray;
      }
      const err = new Error(`Error! No matching ${model.name} found`);
      err.code = 404;
      throw err;
    })
    .catch((err) => {
      throw err;
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
      const err = new Error(
        `Exception! operation create ${model.name} failed`
      );
      err.code = 500;
      throw err;
    })
    .catch((err) => {
      throw err;
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
        const err = new Error(
          `Exception! operation update ${model.name} failed`);
        err.code = 500;
        throw err;
      });
    })
    .catch((err) => {
      throw err;
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
      throw err;
    });
  }
}
export default ModelService;
