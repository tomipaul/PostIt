import chai from 'chai';
import isUUID from 'chai-uuid';
import models from '../../models';

chai.use(isUUID);
const expect = chai.expect;
const User = models.User;

describe('Create a user with name and description', () => {
  const user = new User({
    username: 'Katie01',
    email: 'katie01@aol.com',
    password: '12345678abc',
    phoneNo: '23456789012'
  });
  it('should be an instance of User model', () => {
    expect(user).to.be.an.instanceof(User);
  });
  it('should be an instance of Sequelize.Model', () => {
    expect(user).to.be.an.instanceof(models.Sequelize.Model);
  });
  it('should have a username property', () => {
    expect(user).to.have.property('username');
  });
  it('should have an email property', () => {
    expect(user).to.have.property('email');
  });
  it('should have a password property', () => {
    expect(user).to.have.property('password');
  });
  it('should have a phoneNo property', () => {
    expect(user).to.have.property('phoneNo');
  });
  it('should have a createdAt property', () => {
    expect(user).to.have.property('createdAt');
  });
  it('should have an updatedAt property', () => {
    expect(user).to.have.property('updatedAt');
  });
  it('should have method `verifyPassword`', () => {
    expect(user.verifyPassword).to.be.a('function');
  });
  it('should have association methods for `Message` model',
  () => {
    expect(user.getMessages).to.be.a('function');
    expect(user.createMessage).to.be.a('function');
    expect(user.addMessages).to.be.a('function');
  });
  it('should have association methods for `Group` model',
  () => {
    expect(user.setGroups).to.be.a('function');
    expect(user.hasGroup).to.be.a('function');
    expect(user.addGroups).to.be.a('function');
  });
  it('should define properties from argument to constructor',
  () => {
    expect(user.username).to.equal('Katie01');
    expect(user.email).to.equal('katie01@aol.com');
    expect(user.password).to.equal('12345678abc');
    expect(user.phoneNo).to.equal('23456789012');
  });
});

describe('Create a user with invalid attributes', () => {
  it('should return validation error if username is not aphanumeric',
  () => {
    return User.create({
      username: 'wendy@trendy',
      email: 'trendywendy@aol.com',
      password: '12345678abc',
      phoneNo: '2334444448771'
    })
    .catch((errors) => {
      expect(errors.name).to.equal('SequelizeValidationError');
      const error = errors.get('username');
      expect(error[0].type).to
      .equal('Validation error');
      expect(error[0].message).to
      .equal('username can only contain letters and numbers');
    });
  });
  it('should return validation error if length of username > 25',
  () => {
    return User.create({
      username: 'iiiiiissssssaaaaannnnnoooooottttttthhhh',
      email: 'trendywendy@aol.com',
      password: '12345678abc',
      phoneNo: '2334444448771'
    })
    .catch((errors) => {
      expect(errors.name).to.equal('SequelizeValidationError');
      const error = errors.get('username');
      expect(error[0].type).to
      .equal('Validation error');
      expect(error[0].message).to
      .equal('username cannot be longer than 25 characters');
    });
  });
  it('should return validation error if username is empty string',
  () => {
    return User.create({
      username: '',
      email: 'trendywendy@aol.com',
      password: '12345678abc',
      phoneNo: '2334444448771'
    })
    .catch((errors) => {
      expect(errors.name).to.equal('SequelizeValidationError');
      const error = errors.get('username');
      expect(error[0].type).to
      .equal('Validation error');
      expect(error[0].message).to
      .equal('username cannot be an empty string');
    });
  });
  it('should return validation error if email has invalid syntax',
  () => {
    return User.create({
      username: 'trendyWendy',
      email: 'trendywendyaolcom',
      password: '12345678abc',
      phoneNo: '2334444448771'
    })
    .catch((errors) => {
      expect(errors.name).to.equal('SequelizeValidationError');
      const error = errors.get('email');
      expect(error[0].type).to
      .equal('Validation error');
      expect(error[0].message).to
      .equal('email is invalid');
    });
  });
  it('should return validation error if length of email > 254',
  () => {
    return User.create({
      username: 'trendyWendy',
      email: `${'t'.repeat(256)}@aol.com`,
      password: '12345678abc',
      phoneNo: '2334444448771'
    })
    .catch((errors) => {
      expect(errors.name).to.equal('SequelizeValidationError');
      const error = errors.get('email');
      expect(error[0].type).to
      .equal('Validation error');
      expect(error[0].message).to
      .equal('email is invalid');
    });
  });
  it('should return validation error if email is empty string',
  () => {
    return User.create({
      username: 'trendyWendy',
      email: '',
      password: '12345678abc',
      phoneNo: '2334444448771'
    })
    .catch((errors) => {
      expect(errors.name).to.equal('SequelizeValidationError');
      const error = errors.get('email');
      expect(error[0].type).to
      .equal('Validation error');
      expect(error[0].message).to
      .equal('email is invalid');
    });
  });
  it('should return validation error if length of password < 6',
  () => {
    return User.create({
      username: 'trendyWendy',
      email: 'trendywendy@aol.com',
      password: '12ab',
      phoneNo: '2334444448771'
    })
    .catch((errors) => {
      expect(errors.name).to.equal('SequelizeValidationError');
      const error = errors.get('password');
      expect(error[0].type).to
      .equal('Validation error');
      expect(error[0].message).to
      .equal('password must be at least six characters long');
    });
  });
  it('should return validation error if phoneNo is not numeric',
  () => {
    return User.create({
      username: 'trendyWendy',
      email: 'trendywendy@aol.com',
      password: '12345678abc',
      phoneNo: '34452ggartts54'
    })
    .catch((errors) => {
      expect(errors.name).to.equal('SequelizeValidationError');
      const error = errors.get('phoneNo');
      expect(error[0].type).to
      .equal('Validation error');
      expect(error[0].message).to
      .equal('mobile number is invalid');
    });
  });
  it('should return validation error if phoneNo is empty string',
  () => {
    return User.create({
      username: 'trendyWendy',
      email: 'trendywendy@aol.com',
      password: '12345678abc',
      phoneNo: ''
    })
    .catch((errors) => {
      expect(errors.name).to.equal('SequelizeValidationError');
      const error = errors.get('phoneNo');
      expect(error[0].type).to
      .equal('Validation error');
      expect(error[0].message).to
      .equal('mobile number cannot be an empty string');
    });
  });
});

describe('Create a valid User and save to database', () => {
  before(() => {
    return User.truncate({ cascade: true, logging: false })
    .then(() => {
      return User.create({
        username: 'tomipaul',
        email: 'tomipaul@aol.com',
        password: '12345678abc',
        phoneNo: '23456789012'
      });
    });
  });
  it('should be written to database without errors', () => {
    return User.findOne({ where: { username: 'tomipaul' } })
    .then((fromDb) => {
      expect(fromDb.email).to.equal('tomipaul@aol.com');
      expect(fromDb.phoneNo).to.equal('23456789012');
    });
  });
  it('should run beforeCreate hook on create', () => {
    return User.findOne({ where: { username: 'tomipaul' } })
    .then((fromDb) => {
      return fromDb.verifyPassword('12345678abc')
      .then((isValid) => {
        expect(isValid).to.be.equal(true);
      });
    });
  });
  it('should return error if `username` exists', () => {
    return User.create({
      username: 'tomipaul',
      email: 'taada@aol.com',
      password: '12345678abc',
      phoneNo: '23456789012'
    })
    .catch((errors) => {
      expect(errors.name).to.equal('SequelizeUniqueConstraintError');
      const error = errors.get('username');
      expect(error[0].type).to.equal('unique violation');
      expect(error[0].message).to
      .equal('username is not available!');
    });
  });
  it('should return error if `email` exists', () => {
    return User.create({
      username: 'elementDev',
      email: 'tomipaul@aol.com',
      password: '12345678abc',
      phoneNo: '23456789012'
    })
    .catch((errors) => {
      expect(errors.name).to.equal('SequelizeUniqueConstraintError');
      const error = errors.get('email');
      expect(error[0].type).to.equal('unique violation');
      expect(error[0].message).to
      .equal('email already exists!');
    });
  });
  it('should run beforeUpdate hook on update', () => {
    return User.findOne({ where: { username: 'tomipaul' } })
    .then((fromDb) => {
      return fromDb.update({ password: '12345678def' });
    })
    .then((fromDb) => {
      return fromDb.verifyPassword('12345678def')
      .then((isValid) => {
        expect(isValid).to.be.equal(true);
      });
    });
  });
});
