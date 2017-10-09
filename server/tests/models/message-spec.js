import chai from 'chai';
import isUUID from 'chai-uuid';
import models from '../../models';

chai.use(isUUID);
const expect = chai.expect;
const Message = models.Message;

describe('Create a message with text', () => {
  const message = new Message({
    id: '1501cb03-26e0-4462-9bf1-5175fb3124f9',
    text: 'This is the first message',
    priority: 'urgent'
  });
  const anotherMessage = new Message({
    text: 'This is the second message',
  });
  it('should be an instance of message model', () => {
    expect(message).to.be.an.instanceof(Message);
  });
  it('should be an instance of Sequelize.Model', () => {
    expect(message).to.be.an.instanceof(models.Sequelize.Model);
  });
  it('should have an `id` property', () => {
    expect(message).to.have.property('id');
  });
  it('should have a `text` property', () => {
    expect(message).to.have.property('text');
  });
  it('should have a `priority` property', () => {
    expect(message).to.have.property('priority');
  });
  it('should have a `createdAt` property', () => {
    expect(message).to.have.property('createdAt');
  });
  it('should have an `updatedAt` property', () => {
    expect(message).to.have.property('updatedAt');
  });
  it('should have `GroupId` property', () => {
    expect(message).to.have.property('GroupId');
  });
  it('should have `AuthorId` property', () => {
    expect(message).to.have.property('AuthorId');
  });
  it('id should default to a UUID4 when undefined', () => {
    expect(anotherMessage.id).to.be.a.uuid('v4');
  });
  it('priority should default to `normal` when undefined',
  () => {
    expect(anotherMessage.priority).to.be.equal('normal');
  });
  it('should have association methods for `User` model',
  () => {
    expect(message.setUsers).to.be.a('function');
    expect(message.hasUser).to.be.a('function');
    expect(message.addUsers).to.be.a('function');
    expect(anotherMessage.setAuthor).to.be.a('function');
    expect(anotherMessage.createAuthor).to.be.a('function');
    expect(anotherMessage.getAuthor).to.be.a('function');
  });
  it('should define properties from argument to constructor',
  () => {
    expect(message.text).to.equal('This is the first message');
    expect(anotherMessage.text).to
    .equal('This is the second message');
    expect(message.priority).to.equal('urgent');
  });
});

describe('Create a message with invalid attributes', () => {
  it('should return validation error for invalid id', () => {
    return Message.create({
      id: '334',
      text: 'Why not get yourself a valid id?'
    })
    .catch((errors) => {
      expect(errors.name).to.equal('SequelizeValidationError');
      const error = errors.get('id');
      expect(error[0].type).to
      .equal('Validation error');
      expect(error[0].message).to
      .equal('id must be uuid');
    });
  });
  it('should return validation error for empty text', () => {
    return Message.create({
      id: '6c8b1858-604a-44f6-a37c-0cbd678b2800',
      text: ''
    })
    .catch((errors) => {
      expect(errors.name).to.equal('SequelizeValidationError');
      const error = errors.get('text');
      expect(error[0].type).to
      .equal('Validation error');
      expect(error[0].message).to
      .equal('Message cannot be empty');
    });
  });
  it(`should return validation error if priority is not normal, 
  urgent, or critical`, () => {
    return Message.create({
      id: '6c8b1858-604a-44f6-a37c-0cbd678b2800',
      text: 'We know our priorities!',
      priority: 'mystery'
    })
    .catch((errors) => {
      expect(errors.name).to.equal('SequelizeValidationError');
      const error = errors.get('priority');
      expect(error[0].type).to
      .equal('Validation error');
      expect(error[0].message).to
      .equal('priority is invalid');
    });
  });
});

describe('Create a valid message and save to database', () => {
  before(() => {
    return Message.truncate({ cascade: true, logging: false })
    .then(() => {
      return Message.create({
        id: '6c8b1858-604a-44f6-a37c-0cbd678b2800',
        text: 'Hello to Trello, we are fellows'
      });
    });
  });
  it('should be written to database without errors', () => {
    return Message.findById('6c8b1858-604a-44f6-a37c-0cbd678b2800')
    .then((fromDb) => {
      expect(fromDb.text).to
      .equal('Hello to Trello, we are fellows');
      expect(fromDb.priority).to.equal('normal');
    });
  });
  it('should return error if `id` exists', () => {
    return Message.create({
      id: '6c8b1858-604a-44f6-a37c-0cbd678b2800',
      text: 'Why choose one that has been chosen?'
    })
    .catch((errors) => {
      expect(errors.name).to.equal('SequelizeUniqueConstraintError');
      const error = errors.get('id');
      expect(error[0].type).to.equal('unique violation');
      expect(error[0].message).to
      .equal('id already exists!');
    });
  });
});
