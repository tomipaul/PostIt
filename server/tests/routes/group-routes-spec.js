/* eslint no-unused-expressions: 0 */
import chaiHTTP from 'chai-http';
import chai from 'chai';
import models from '../../models';
import server from '../../index';
import dummyData from '../dummy.json';

chai.use(chaiHTTP);
let token;
const expect = chai.expect;
const user = dummyData.Users.thirdValidUser;
const {
  validGroup,
  twitter,
  emptyName,
  invalidName
} = dummyData.Groups;

describe('/api/group', () => {
  before(() => {
    return models.sequelize.truncate({ cascade: true })
    .then(() => {
      return models.User.create(user)
      .then(() => {
        return chai.request(server)
        .post('/api/user/signin')
        .send({
          username: user.username,
          password: user.password
        })
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          token = res.body;
        })
        .catch((err) => {
          throw err;
        });
      });
    });
  });
  it('should take an id, name and description and create a group',
  (done) => {
    chai.request(server)
    .post('/api/group')
    .set('Authorization', `Bearer ${token}`)
    .send(validGroup)
    .end((err, res) => {
      expect(res).to.have.status(201);
      expect(res).to.be.json;
      expect(res.body.id).to.equal(validGroup.id);
      expect(res.body.name).to.equal(validGroup.name);
      expect(res.body.description).to.equal(validGroup.description);
      expect(res.body).to.have.own.property('createdAt');
      return done();
    });
  });
  it('should define id if not passed in request', (done) => {
    chai.request(server)
    .post('/api/group')
    .set('Authorization', `Bearer ${token}`)
    .send(twitter)
    .end((err, res) => {
      expect(res).to.have.status(201);
      expect(res).to.be.json;
      expect(res.body.id).to.exist;
      expect(res.body.name).to.equal(twitter.name);
      expect(res.body.description).to.equal(twitter.description);
      return done();
    });
  });
  it('should return validation error if id exists', (done) => {
    chai.request(server)
    .post('/api/group')
    .set('Authorization', `Bearer ${token}`)
    .send(validGroup)
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.html;
      expect(res.text).to.equal('id already exists!');
      return done();
    });
  });
  it('should return validation error if name is empty', (done) => {
    chai.request(server)
    .post('/api/group')
    .set('Authorization', `Bearer ${token}`)
    .send(emptyName)
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.html;
      expect(res.text).to.have
      .string('Group name cannot be an empty string');
      expect(res.text).to.have
      .string('Name can contain only letters, numbers and underscores');
      return done();
    });
  });
  it('should return validation error if name is not alphanumeric',
  (done) => {
    chai.request(server)
    .post('/api/group')
    .set('Authorization', `Bearer ${token}`)
    .send(invalidName)
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.html;
      expect(res.text).to.have
      .string('Name can contain only letters, numbers and underscores');
      return done();
    });
  });
});

describe('/api/group/:groupId/user', () => {
  const user1 = dummyData.Users.validUser;
  before(() => {
    return models.User.create(user1);
  });
  it('should add a user to a group', (done) => {
    chai.request(server)
    .post(`/api/group/${validGroup.id}/user`)
    .set('Authorization', `Bearer ${token}`)
    .send({
      username: user1.username
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      return done();
    });
  });
});

describe('/api/group/:groupId/message', () => {
  it('should add a message to a group', (done) => {
    const message = dummyData.Messages.anotherValidMessage;
    chai.request(server)
    .post(`/api/group/${validGroup.id}/message`)
    .set('Authorization', `Bearer ${token}`)
    .send(message)
    .end((err, res) => {
      expect(res).to.have.status(200);
      return done();
    });
  });
  it('should add a message to a group', (done) => {
    const message = dummyData.Messages.thirdValidMessage;
    chai.request(server)
    .post(`/api/group/${validGroup.id}/message`)
    .set('Authorization', `Bearer ${token}`)
    .send(message)
    .end((err, res) => {
      expect(res).to.have.status(200);
      return done();
    });
  });
});

describe('/api/group/:groupId/messages', () => {
  it('should get all messages in a group', (done) => {
    chai.request(server)
    .get(`/api/group/${validGroup.id}/messages`)
    .set('Authorization', `Bearer ${token}`)
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.have.lengthOf(2);
      res.body.forEach((message) => {
        expect(message).to.have.own.property('text');
        expect(message).to.have.own.property('priority');
      });
      return done();
    });
  });
});
