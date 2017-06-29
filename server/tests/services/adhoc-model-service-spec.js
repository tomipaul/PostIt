import chai from 'chai';
import models from '../../models';
import AdhocModelService from '../../services/AdhocModelService';
import dummyData from '../dummy.json';

const { Group, Message, User } = models;
const { Groups, Messages, Users } = dummyData;
const expect = chai.expect;

describe('AdhocModelService.addUserToGroup', () => {
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
    const [username, groupId] = [
      Users.validUser.username,
      Groups.validGroup.id
    ];
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
    const groupId = Groups.validGroup.id;
    const usernames = [
      Users.anotherValidUser.username,
      Users.thirdValidUser.username
    ];
    return AdhocModelService.addUserToGroup(usernames, groupId)
    .then(() => {
      return Group.findById(groupId);
    })
    .then((group) => {
      return group.hasUsers(usernames);
    })
    .then((hasUsers) => {
      expect(hasUsers).to.be.equal(true);
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
});
