import chai from 'chai';
import isUUID from 'chai-uuid';
import ModelService from '../../services/ModelService';
import models from '../../models';

chai.use(isUUID);
const expect = chai.expect;
const { Message } = models;

describe('ModelService.createModelInstance', () => {
  before(() => {
    return models.sequelize.truncate({ cascade: true });
  });
  it('should create a model instance', () => {
    return ModelService.createModelInstance(Message, {
      text: 'Create a model instance'
    })
    .then((instance) => {
      expect(instance).to.be.an('object');
      expect(instance.text).to.equal('Create a model instance');
      expect(instance.id).to.be.a.uuid('v4');
    });
  });
});

describe('ModelService.getModelInstance', () => {
  it('should get a specified model instance', () => {
    return ModelService.createModelInstance(Message, {
      text: 'Create another model instance'
    })
    .then((instance) => {
      return ModelService.getModelInstance(Message, {
        id: instance.id
      })
      .then((fromDb) => {
        expect(fromDb.id).to.equal(instance.id);
        expect(fromDb.text).to.equal(instance.text);
        expect(fromDb.priority).to.equal(instance.priority);
      });
    });
  });
  it('should throw an error if instance does not exist', () => {
    return ModelService.getModelInstance(Message, {
      text: "I don't exist"
    })
    .catch((err) => {
      expect(err.message).to.equal('Message does not exist');
    });
  });
});

describe('ModelService.getModelInstances', () => {
  it('should get specified multiple instances of a model',
  () => {
    return ModelService.getModelInstances(Message, {
      priority: 'normal'
    })
    .then((fromDbArray) => {
      expect(fromDbArray).to.be.an('array');
      expect(fromDbArray).to.have.lengthOf(2);
    });
  });
});

describe('ModelService.updateModelInstance', () => {
  it('should get and update a model instance', () => {
    return ModelService.createModelInstance(Message, {
      text: 'Create a third model instance'
    })
    .then((instance) => {
      return ModelService.updateModelInstance(Message, {
        id: instance.id
      }, {
        priority: 'urgent',
        text: 'the third was updated!'
      });
    })
    .then((updated) => {
      expect(updated.priority).to.equal('urgent');
      expect(updated.text).to.equal('the third was updated!');
    });
  });
});

describe('ModelService.deleteModelInstance', () => {
  it('should get and delete a model instance', () => {
    return ModelService.deleteModelInstance(Message, {
      priority: 'urgent'
    })
    .then(() => {
      return ModelService.getModelInstances(Message);
    })
    .then((fromDbArray) => {
      expect(fromDbArray).to.have.lengthOf(2);
      expect(fromDbArray[0].priority).to.equal('normal');
      expect(fromDbArray[1].priority).to.equal('normal');
    });
  });
});
