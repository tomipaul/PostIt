/* eslint no-unused-expressions: 0 */
import chaiHTTP from 'chai-http';
import chai from 'chai';
import sinon from 'sinon';
import models from '../../models';
import server from '../../index';
import dummyData from '../dummy.json';

let userToken;
chai.use(chaiHTTP);
const expect = chai.expect;
const {
  validUser,
  incompleteUser,
  emptyUsername,
  emptyEmail,
  emptyPassword,
  emptyPhoneNo,
} = dummyData.Users;

describe('/api/user/signup', () => {
  before(() => {
    return models.sequelize.truncate({ cascade: true });
  });
  it(`should take username, password, email and phoneNo and
  create a user`, (done) => {
    chai.request(server)
    .post('/api/user/signup')
    .send(validUser)
    .end((err, res) => {
      expect(res).to.have.status(201);
      expect(res).to.be.json;
      expect(res.body.user.username).to.equal(validUser.username);
      expect(res.body.user.phoneNo).to.equal(validUser.phoneNo);
      expect(res.body.user.email).to.equal(validUser.email);
      expect(res.body.user).to.have.own.property('updatedAt');
      return done();
    });
  });
  it('should return validation error if a field is missing', (done) => {
    chai.request(server)
    .post('/api/user/signup')
    .send(incompleteUser)
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.message).to.equal('Validation Error');
      return done();
    });
  });
  it('should return validation error if username exists', (done) => {
    chai.request(server)
    .post('/api/user/signup')
    .send(validUser)
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.message).to.equal('username is not available!');
      return done();
    });
  });
  it('should return validation error if email exists', (done) => {
    chai.request(server)
    .post('/api/user/signup')
    .send({ ...validUser, username: 'emailexists' })
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.message).to.equal('email already exists!');
      return done();
    });
  });
  it('should return validation error if username is empty',
  (done) => {
    chai.request(server)
    .post('/api/user/signup')
    .send(emptyUsername)
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.message).to.have
      .string('username cannot be an empty string');
      expect(res.body.message).to.have
      .string('username can only contain letters and numbers');
      expect(res.body.message).to.have
      .string('username cannot be longer than 25 characters');
      return done();
    });
  });
  it('should return validation error if email is empty',
  (done) => {
    chai.request(server)
    .post('/api/user/signup')
    .send(emptyEmail)
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.message).to.have
      .string('email is invalid');
      expect(res.body.message).to.have
      .string('email has invalid length');
      return done();
    });
  });
  it('should return validation error if password is empty',
  (done) => {
    chai.request(server)
    .post('/api/user/signup')
    .send(emptyPassword)
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.message).to.have
      .string('password must be at least six characters long');
      return done();
    });
  });
  it('should return validation error if phoneNo is empty',
  (done) => {
    chai.request(server)
    .post('/api/user/signup')
    .send(emptyPhoneNo)
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.message).to.have
      .string('mobile number cannot be an empty string');
      expect(res.body.message).to.have
      .string('mobile number is invalid');
      return done();
    });
  });
});

describe('/api/user/signin', () => {
  it('should sign in a user and return a token',
  (done) => {
    chai.request(server)
    .post('/api/user/signin')
    .send({
      username: validUser.username,
      password: validUser.password
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.token).to.be.a('string');
      expect(res.body.token).to.match(/^\S+.\S+.\S$/);
      userToken = res.body.token;
      if (err) { return done(err); }
      return done();
    });
  });
  it('should return error message if request method not `POST`',
  (done) => {
    chai.request(server)
    .put('/api/user/signin')
    .send({
      username: 'getrofili',
      password: '1234567'
    })
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.message).to.be
      .equal('POST request method expected');
      return done();
    });
  });
  it('should return error message if password is empty',
  (done) => {
    chai.request(server)
    .post('/api/user/signin')
    .send({
      username: 'getrofili',
      password: ''
    })
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.message).to.be
      .equal('non-empty username and password expected');
      return done();
    });
  });
  it('should return error message if username is empty',
  (done) => {
    chai.request(server)
    .post('/api/user/signin')
    .send({
      username: '',
      password: '123456'
    })
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.message).to.be
      .equal('non-empty username and password expected');
      return done();
    });
  });
  it('should return error message if user does not exist',
  (done) => {
    chai.request(server)
    .post('/api/user/signin')
    .send({
      username: 'fred',
      password: '123456'
    })
    .end((err, res) => {
      expect(res).to.have.status(401);
      expect(res).to.be.json;
      expect(res.body.message).to.have
      .string('User does not exist');
      return done();
    });
  });
  it('should return error message if password is wrong',
  (done) => {
    chai.request(server)
    .post('/api/user/signin')
    .send({
      username: validUser.username,
      password: '1234fggggr'
    })
    .end((err, res) => {
      expect(res).to.have.status(401);
      expect(res).to.be.json;
      expect(res.body.message).to.have
      .string('Invalid Password');
      return done();
    });
  });
});

describe('/api/user/:username', () => {
  it('should get an existing user', (done) => {
    chai.request(server)
    .get(`/api/user/${validUser.username}`)
    .set('Authorization', `Bearer ${userToken}`)
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.user).to.include({
        username: validUser.username,
        email: validUser.email,
        phoneNo: validUser.phoneNo
      });
      return done();
    });
  });
  it('should return error if no matching username', (done) => {
    chai.request(server)
    .get('/api/user/dende05')
    .set('Authorization', `Bearer ${userToken}`)
    .end((err, res) => {
      expect(res).to.have.status(404);
      expect(res).to.be.json;
      expect(res.body.message).to.equal('Error! User does not exist');
      return done();
    });
  });
  it('should return error if no token', (done) => {
    chai.request(server)
    .get(`/api/user/${validUser.username}`)
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.message).to.equal('No Access token provided!');
      return done();
    });
  });
  it('should return error message if invalid token', (done) => {
    chai.request(server)
    .get(`/api/user/${validUser.username}`)
    .set('Authorization', 'Bearer abcdefeighhth12332444200999')
    .end((err, res) => {
      expect(res).to.have.status(401);
      expect(res).to.be.json;
      expect(res.body.message).to.equal('jwt malformed');
      return done();
    });
  });
});

describe('/api/user/groups', () => {
  before(() => {
    return models.Group.bulkCreate([
      dummyData.Groups.validGroup,
      dummyData.Groups.anotherValidGroup
    ], {
      individualHooks: true,
      validate: true
    })
    .then((groups) => {
      return models.User.findById(validUser.username)
      .then((user) => {
        return user.addGroups(groups);
      });
    });
  });
  it('should return all the groups a user belong to',
  (done) => {
    chai.request(server)
    .get('/api/user/groups')
    .set('Authorization', `Bearer ${userToken}`)
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.groups).to.be.an('array');
      expect(res.body.groups).to.have.a.lengthOf(2);
      return done();
    });
  });
  it('should return error message if request has no token',
  (done) => {
    chai.request(server)
    .get('/api/user/groups')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.message).to.equal('No Access token provided!');
      return done();
    });
  });
  it('should return error message on exceptions', (done) => {
    const stub = sinon.stub(models.User.prototype, 'getGroups');
    stub.rejects();
    chai.request(server)
    .get('/api/user/groups')
    .set('Authorization', `Bearer ${userToken}`)
    .end((err, res) => {
      stub.restore();
      expect(res).to.have.status(500);
      expect(res).to.be.json;
      expect(res.body.message).to.equal('Exception 500! Operation failed.');
      return done();
    });
  });
});

describe('/api/user', () => {
  it('should return error message if request has no token',
  (done) => {
    chai.request(server)
    .put('/api/user/')
    .send({
      email: 'updatedmail@tomipaul.com'
    })
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.message).to.equal('No Access token provided!');
      return done();
    });
  });
  it('should return error message if request has no token',
  (done) => {
    chai.request(server)
    .delete('/api/user/')
    .send({
      email: 'updatedmail@tomipaul.com'
    })
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.message).to.equal('No Access token provided!');
      return done();
    });
  });
  it('should return error message on exceptions', (done) => {
    const stub = sinon.stub(models.User.prototype, 'update');
    stub.rejects();
    chai.request(server)
    .put('/api/user/')
    .set('Authorization', `Bearer ${userToken}`)
    .send({
      email: 'updatedmail@tomipaul.com'
    })
    .end((err, res) => {
      stub.restore();
      expect(res).to.have.status(500);
      expect(res).to.be.json;
      expect(res.body.message).to.equal('Exception 500! Operation failed.');
      return done();
    });
  });
  it('should return error message on exceptions', (done) => {
    const stub = sinon.stub(models.User.prototype, 'destroy');
    stub.rejects();
    chai.request(server)
    .delete('/api/user/')
    .set('Authorization', `Bearer ${userToken}`)
    .send({
      email: 'updatedmail@tomipaul.com'
    })
    .end((err, res) => {
      stub.restore();
      expect(res).to.have.status(500);
      expect(res).to.be.json;
      expect(res.body.message).to.equal('Exception 500! Operation failed.');
      return done();
    });
  });
  it('should update an existing authenticated user',
  (done) => {
    chai.request(server)
    .put('/api/user')
    .send({
      token: userToken,
      email: 'updatedmail@tomipaul.com'
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.message).to.equal('User updated');
      expect(res.body.user.email).to
      .equal('updatedmail@tomipaul.com');
      return done();
    });
  });
  it('should delete an existing authenticated user',
  (done) => {
    chai.request(server)
    .delete('/api/user')
    .send({
      token: userToken
    })
    .end((err, res) => {
      expect(res).to.have.status(204);
      return done();
    });
  });
});

