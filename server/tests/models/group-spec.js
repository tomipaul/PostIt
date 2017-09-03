import chai from 'chai';
import isUUID from 'chai-uuid';
import models from '../../models';

chai.use(isUUID);
const expect = chai.expect;
const Group = models.Group;

describe('Create a group with name and description', () => {
  const group = new Group({
    name: 'Twitter',
    description: 'When shall I be big?'
  });
  it('should be an instance of Group model', () => {
    expect(group).to.be.an.instanceof(Group);
  });
  it('should be an instance of Sequelize.Model', () => {
    expect(group).to.be.an.instanceof(models.Sequelize.Model);
  });
  it('should have an id property', () => {
    expect(group).to.have.property('id');
  });
  it('should have a createdAt property', () => {
    expect(group).to.have.property('createdAt');
  });
  it('should have an updatedAt property', () => {
    expect(group).to.have.property('updatedAt');
  });
  it('id should default to a UUID4 when undefined', () => {
    expect(group.id).to.be.a.uuid('v4');
  });
  it('should have properties name and description', () => {
    expect(group).to.have.property('name');
    expect(group).to.have.property('description');
  });
  it('should have association methods for `Message` model',
  () => {
    expect(group.getMessages).to.be.a('function');
    expect(group.createMessage).to.be.a('function');
    expect(group.addMessages).to.be.a('function');
  });
  it('should have association methods for `User` model',
  () => {
    expect(group.setUsers).to.be.a('function');
    expect(group.hasUser).to.be.a('function');
    expect(group.addUsers).to.be.a('function');
  });
  it('should define properties from argument to constructor',
  () => {
    expect(group.name).to.equal('Twitter');
    expect(group.description).to.equal('When shall I be big?');
  });
});

describe('Create a group with invalid attributes', () => {
  it('should return validation error for invalid id', () => {
    return Group.create({
      id: '334',
      name: 'Pletora',
      description: 'of sacrifices'
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
  it('should return validation error for empty name', () => {
    return Group.create({
      id: '6c8b1858-604a-44f6-a37c-0cbd678b2800',
      name: '',
      description: 'of sacrifices'
    })
    .catch((errors) => {
      expect(errors.name).to.equal('SequelizeValidationError');
      const error = errors.get('name');
      expect(error[0].type).to
      .equal('Validation error');
      expect(error[0].message).to
      .equal('Group name cannot be an empty string');
    });
  });
  it('should return validation error for invalid name', () => {
    return Group.create({
      id: '6c8b1858-604a-44f6-a37c-0cbd678b2800',
      name: 'Nations pledge',
      description: 'of sacrifices'
    })
    .catch((errors) => {
      expect(errors.name).to.equal('SequelizeValidationError');
      const error = errors.get('name');
      expect(error[0].type).to
      .equal('Validation error');
      expect(error[0].message).to
      .equal('Name can contain only letters, numbers and underscores');
    });
  });
  it('should return all validation errors for invalid id and name',
  () => {
    return Group.create({
      id: 'adrf',
      name: '',
      description: 'of sacrifices'
    })
    .catch((errors) => {
      expect(errors.errors).to.have.lengthOf(2);
      expect(errors.get('id')).to.have.lengthOf(1);
      expect(errors.get('name')).to.have.lengthOf(1);
    });
  });
});

describe('Create a valid group and save to database', () => {
  before(() => {
    return Group.truncate({ cascade: true, logging: false })
    .then(() => {
      return Group.create({
        id: '6c8b1858-604a-44f6-a37c-0cbd678b2800',
        name: 'Nations_pledge',
        description: 'Our heroes past'
      });
    });
  });
  it('should be written to database without errors', () => {
    return Group.findById('6c8b1858-604a-44f6-a37c-0cbd678b2800')
    .then((fromDb) => {
      expect(fromDb.name).to.equal('Nations_pledge');
      expect(fromDb.description).to.equal('Our heroes past');
    });
  });
  it('should return error if `id` exists', () => {
    return Group.create({
      id: '6c8b1858-604a-44f6-a37c-0cbd678b2800',
      name: 'Nations_anthem',
      description: 'Her honour and glory'
    })
    .catch((errors) => {
      expect(errors.name).to.equal('SequelizeUniqueConstraintError');
      const error = errors.get('id');
      expect(error[0].type).to.equal('unique violation');
      expect(error[0].message).to.equal('id already exists!');
    });
  });
});
