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
      throw new Error(`${model.name} does not exist`);
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
    return model.findAll({ where: attributes });
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
      throw new Error(`Error creating ${model.name}`);
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
      return modelInstance.update(newAttributes);
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
    });
  }
}
export default ModelService;
