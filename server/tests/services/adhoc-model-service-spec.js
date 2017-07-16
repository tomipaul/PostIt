import chai from 'chai';
import sinon from 'sinon';
import models from '../../models';
import AdhocModelService from '../../services/AdhocModelService';
import dummyData from '../dummy.json';

const { Group, Message, User } = models;
const { Groups, Messages, Users } = dummyData;
const expect = chai.expect;

describe('AdhocModelService.validateInputs', () => {
  it('validates inputs when creating group', () => {
    return AdhocModelService.validateInputs(Group, {
      name: undefined
    })
    .catch((err) => {
      expect(err.message).to
      .equal('Incomplete field; name is required');
    });
  });
  it('validates inputs when creating group', () => {
    return AdhocModelService.validateInputs(Group, {
      name: Groups.twitter.name
    })
    .then((isValid) => {
      expect(isValid).to.equal(true);
    });
  });
  it('validates inputs when creating user', () => {
    return AdhocModelService.validateInputs(User, {
      username: Users.validUser.username,
      phoneNo: Users.validUser.phoneNo
    })
    .catch((err) => {
      expect(err.message).to
      .equal('Username, password, email and phoneNo required');
    });
  });
  it('validates inputs when creating user', () => {
    return AdhocModelService.validateInputs(User, Users.validUser)
    .then((isValid) => {
      expect(isValid).to.equal(true);
    });
  });
});

describe('AdhocModelService.addUserToGroup', () => {
  const groupId = Groups.validGroup.id;
  before(() => {
    return models.sequelize.truncate({ cascade: true })
    .then(() => {
      return Group.create(Groups.validGroup);
    })
    .then(() => {
      return User.bulkCreate([
        Users.validUser,
        Users.anotherValidUser,
        Users.thirdValidUser
      ], {
        individualHooks: true,
        validate: true
      });
    });
  });
  it('should add a user to a group', () => {
    const username = Users.validUser.username;
    return AdhocModelService.addUserToGroup(username, groupId)
    .then(() => {
      return Group.findById(groupId);
    })
    .then((group) => {
      return group.hasUser(username);
    })
    .then((hasUser) => {
      expect(hasUser).to.be.equal(true);
    });
  });
  it('should add multiple users to a group', () => {
    const usernames = [
      Users.anotherValidUser.username,
      Users.thirdValidUser.username
    ];
    return Promise.all([
      AdhocModelService.addUserToGroup(usernames[0], groupId),
      AdhocModelService.addUserToGroup(usernames[1], groupId)
    ])
    .then(() => {
      return Group.findById(groupId)
      .then((group) => {
        return group.hasUsers(usernames);
      });
    })
    .then((hasUsers) => {
      expect(hasUsers).to.be.equal(true);
    });
  });
  it('should throw error if group does not exist',
  () => {
    const username = Users.validUser.username;
    return AdhocModelService
    .addUserToGroup(username, Groups.anotherValidGroup.id)
    .catch((err) => {
      expect(err.code).to.equal(404);
      expect(err.message).to
      .equal('Error! Group does not exist');
    });
  });
  it('should throw error if username is undefined',
  () => {
    return AdhocModelService
    .addUserToGroup(undefined, groupId)
    .catch((err) => {
      expect(err.code).to.equal(400);
      expect(err.message).to
      .equal('Username is invalid or not defined');
    });
  });
  it('should throw error if username is already in group',
  () => {
    const username = Users.validUser.username;
    return AdhocModelService
    .addUserToGroup(username, groupId)
    .catch((err) => {
      expect(err.code).to.equal(400);
      expect(err.message).to
      .equal('User already belong to group');
    });
  });
  it('should throw error for failure', () => {
    const stub = sinon.stub(models.Group.prototype, 'addUser');
    stub.rejects();
    return AdhocModelService
    .addUserToGroup('fronesy01', groupId)
    .catch((err) => {
      // eslint-disable-next-line
      expect(err).to.exist;
      stub.restore();
    });
  });
});

describe('AdhocModelService.getAllGroupUsers', () => {
  it('should get all users in a group', () => {
    const groupId = Groups.validGroup.id;
    return AdhocModelService.getAllGroupUsers(groupId)
    .then((usersArray) => {
      expect(usersArray).to.have.lengthOf(3);
      usersArray.forEach((user) => {
        expect(user).to.be.an.instanceof(User);
      });
    });
  });
  it('should throw error if group does not exist',
  () => {
    return AdhocModelService
    .getAllGroupUsers(Groups.anotherValidGroup.id)
    .catch((err) => {
      expect(err.code).to.equal(404);
      expect(err.message).to
      .equal('Error! Group does not exist');
    });
  });
});

describe('AdhocModelService.getUsergroups', () => {
  before(() => {
    return Group.create(Groups.anotherValidGroup)
    .then((group) => {
      return User.findById(Users.validUser.username)
      .then((user) => {
        return user.addGroup(group);
      });
    });
  });
  it('should get all groups of a user', () => {
    const username = Users.validUser.username;
    return AdhocModelService.getUserGroups(username)
    .then((groups) => {
      expect(groups).to.have.lengthOf(2);
      groups.forEach((group) => {
        expect(group).to.be.an.instanceof(Group);
      });
    });
  });
  it('should throw error if user does not exist',
  () => {
    return AdhocModelService
    .getUserGroups('fronesy01')
    .catch((err) => {
      expect(err.code).to.equal(404);
      expect(err.message).to
      .equal('Error! User does not exist');
    });
  });
});

describe('AdhocModelService.removeUserFromGroup', () => {
  const groupId = Groups.validGroup.id;
  it('should remove a user from a group', () => {
    const username = Users.validUser.username;
    return AdhocModelService
    .removeUserFromGroup(username, groupId)
    .then(() => {
      return Group.findById(groupId);
    })
    .then((group) => {
      return group.hasUser(username);
    })
    .then((hasUser) => {
      expect(hasUser).to.equal(false);
    });
  });
  it('should remove multiple users from a group', () => {
    const usernames = [
      Users.anotherValidUser.username,
      Users.thirdValidUser.username
    ];
    return AdhocModelService
    .removeUserFromGroup(usernames, groupId)
    .then(() => {
      return Group.findById(groupId);
    })
    .then((group) => {
      return group.hasUsers(usernames);
    })
    .then((hasUsers) => {
      expect(hasUsers).to.be.equal(false);
    });
  });

  it('should throw error if group does not exist',
  () => {
    const username = Users.validUser.username;
    return AdhocModelService
    .removeUserFromGroup(username, Groups.emptyName.id)
    .catch((err) => {
      expect(err.code).to.equal(404);
      expect(err.message).to
      .equal('Error! Group does not exist');
    });
  });

  it('should throw error if user does not exist in group',
  () => {
    const username = Users.validUser.username;
    return AdhocModelService
    .removeUserFromGroup(username, groupId)
    .catch((err) => {
      expect(err.code).to.equal(400);
      expect(err.message).to
      .equal('User does not exist in group');
    });
  });

  it('should throw error for failure',
  () => {
    const stub = sinon.stub(models.Group.prototype, 'removeUser');
    stub.rejects();
    return AdhocModelService
    .removeUserFromGroup('fronesy01', groupId)
    .catch((err) => {
      // eslint-disable-next-line
      expect(err).to.exist;
      stub.restore();
    });
  });
});

describe('AdhocModelService.addMessageToGroup', () => {
  const groupId = Groups.validGroup.id;
  it('should create a message and add to group', () => {
    const message = Messages.validMessage;
    return AdhocModelService
    .addMessageToGroup(message, groupId)
    .then(() => {
      return Group.findById(groupId);
    })
    .then((group) => {
      return group.hasMessage(message.id);
    })
    .then((hasMessage) => {
      expect(hasMessage).to.equal(true);
    });
  });
  it('should create a message and add to group', () => {
    const message = Messages.anotherValidMessage;
    return AdhocModelService
    .addMessageToGroup(message, groupId)
    .then(() => {
      return Group.findById(groupId);
    })
    .then((group) => {
      return group.hasMessage(message.id);
    })
    .then((hasMessages) => {
      expect(hasMessages).to.equal(true);
    });
  });
  it('should create a message and add to group', () => {
    const message = Messages.thirdValidMessage;
    return AdhocModelService
    .addMessageToGroup(message, groupId)
    .then(() => {
      return Group.findById(groupId);
    })
    .then((group) => {
      return group.hasMessage(message.id);
    })
    .then((hasMessages) => {
      expect(hasMessages).to.equal(true);
    });
  });
  it('should throw error if group does not exist',
  () => {
    const message = Messages.thirdValidMessage;
    return AdhocModelService
    .addMessageToGroup(message, Groups.emptyName.id)
    .catch((err) => {
      expect(err.code).to.equal(404);
      expect(err.message).to
      .equal('Error! Group does not exist');
    });
  });
  it('should throw error if message does not have text',
  () => {
    const message = { text: undefined };
    return AdhocModelService
    .addMessageToGroup(message, groupId)
    .catch((err) => {
      expect(err.code).to.equal(400);
      expect(err.message).to
      .equal('Incomplete field; text is required');
    });
  });
});

describe('AdhocModelService.getGroupMessages', () => {
  it('should get all messages in a group', () => {
    return AdhocModelService.getGroupMessages(Groups.validGroup.id)
    .then((messageArray) => {
      expect(messageArray).to.have.lengthOf(3);
      messageArray.forEach((message) => {
        expect(message).to.be.an.instanceof(Message);
      });
    });
  });
  it('should throw error if group does not exist',
  () => {
    return AdhocModelService
    .getGroupMessages(Groups.emptyName.id)
    .catch((err) => {
      expect(err.code).to.equal(404);
      expect(err.message).to
      .equal('Error! Group does not exist');
    });
  });
});

describe('AdhocModelService.removeMessageFromGroup', () => {
  const groupId = Groups.validGroup.id;
  it('should remove a message from a group', () => {
    const messageId = Messages.validMessage.id;
    return AdhocModelService
    .removeMessageFromGroup(messageId, groupId)
    .then(() => {
      return Group.findById(groupId);
    })
    .then((group) => {
      return group.hasMessage(messageId);
    })
    .then((hasMessage) => {
      expect(hasMessage).to.equal(false);
    });
  });
  it('should remove multiple messages from a group', () => {
    const messageIds = [
      Messages.anotherValidMessage.id,
      Messages.thirdValidMessage.id
    ];
    return AdhocModelService
    .removeMessageFromGroup(messageIds, groupId)
    .then(() => {
      return Group.findById(groupId);
    })
    .then((group) => {
      return group.hasMessages(messageIds);
    })
    .then((hasMessages) => {
      expect(hasMessages).to.be.equal(false);
    });
  });
  it('should throw error if group does not exist',
  () => {
    const messageId = Messages.validMessage.id;
    return AdhocModelService
    .removeMessageFromGroup(messageId, Groups.emptyName.id)
    .catch((err) => {
      expect(err.code).to.equal(404);
      expect(err.message).to
      .equal('Error! Group does not exist');
    });
  });
  it('should throw error for failure',
  () => {
    const stub = sinon.stub(models.Group.prototype, 'removeMessage');
    stub.rejects();
    const messageId = Messages.fourthValidMessage.id;
    return AdhocModelService
    .removeMessageFromGroup(messageId, groupId)
    .catch((err) => {
      // eslint-disable-next-line
      expect(err).to.exist;
      stub.restore();
    });
  });
});
