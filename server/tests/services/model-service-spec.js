import chai from 'chai';
import sinon from 'sinon';
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
  it('should throw a validation error for invalid inputs',
  () => {
    return ModelService.createModelInstance(Message, {
      text: 'Priority is invalid',
      priority: 'crucial'
    })
    .catch((err) => {
      expect(err).to.be.an
      .instanceof(models.sequelize.ValidationError);
    });
  });
  it('should throw an appropriate error for failure', () => {
    const stub = sinon.stub(Message, 'create');
    stub.resolves();
    return ModelService.createModelInstance(Message, {
      text: 'The Guardians of the Galaxy',
    })
    .catch((err) => {
      expect(err.code).to.equal(500);
      expect(err.message).to
      .equal('Exception! operation create Message failed');
      stub.restore();
    });
  });
});

describe('ModelService.getModelInstance', () => {
  let messageId;
  it('should get a specified model instance', () => {
    return ModelService.createModelInstance(Message, {
      text: 'Create another model instance'
    })
    .then((instance) => {
      messageId = instance.id;
      return ModelService.getModelInstance(Message, {
        id: messageId
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
      expect(err.message).to.equal('Error! Message does not exist');
      expect(err.code).to.equal(404);
    });
  });
  it('should throw an appropriate error for failure', () => {
    const stub = sinon.stub(Message, 'findById');
    stub.rejects();
    return ModelService.getModelInstance(Message, {
      id: messageId
    })
    .catch((err) => {
      expect(err.code).to.equal(500);
      expect(err.message).to
      .equal('Exception! operation get Message failed');
      stub.restore();
    });
  });
});

describe('ModelService.getModelInstances', () => {
  it('should get specified multiple instances of a model',
  () => {
    return ModelService.getModelInstances({
      model: Message,
      where: {
        priority: 'normal'
      }
    })
    .then((fromDbArray) => {
      expect(fromDbArray).to.be.an('array');
      expect(fromDbArray).to.have.lengthOf(2);
    });
  });
  it('should throw an appropriate error for failure', () => {
    const stub = sinon.stub(Message, 'findAll');
    stub.rejects();
    return ModelService.getModelInstances(Message, {
      priority: 'Normal',
    })
    .catch((err) => {
      expect(err.code).to.equal(500);
      expect(err.message).to
      .equal('Exception! operation get Messages failed');
      stub.restore();
    });
  });
});

describe('ModelService.updateModelInstance', () => {
  let messageId;
  it('should get and update a model instance', () => {
    return ModelService.createModelInstance(Message, {
      text: 'Create a third model instance'
    })
    .then((instance) => {
      messageId = instance.id;
      return ModelService.updateModelInstance(Message, {
        id: messageId
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
  it('should throw an error if instance does not exist', () => {
    return ModelService.updateModelInstance(Message, {
      text: "I don't exist"
    }, { text: 'I tried to update this non-existent message' })
    .catch((err) => {
      expect(err.message).to.equal('Error! Message does not exist');
      expect(err.code).to.equal(404);
    });
  });
  it('should throw an appropriate error for failure', () => {
    const stub = sinon.stub(Message.prototype, 'update');
    stub.resolves();
    return ModelService.updateModelInstance(Message, {
      id: messageId
    }, { text: 'I updated this' })
    .catch((err) => {
      expect(err.code).to.equal(500);
      expect(err.message).to
      .equal('Exception! operation update Message failed');
      stub.restore();
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
  it('should throw an error if instance does not exist', () => {
    return ModelService.deleteModelInstance(Message, {
      text: "I don't exist"
    })
    .catch((err) => {
      expect(err.message).to.equal('Error! Message does not exist');
      expect(err.code).to.equal(404);
    });
  });
  it('should throw an appropriate error for failure', () => {
    const stub = sinon.stub(Message.prototype, 'destroy');
    stub.rejects();
    return ModelService.deleteModelInstance(Message, {
      priority: 'normal'
    })
    .catch((err) => {
      expect(err.code).to.equal(500);
      expect(err.message).to
      .equal('Exception! operation delete Message failed');
      stub.restore();
    });
  });
});
