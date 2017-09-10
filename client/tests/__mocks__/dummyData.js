export const group = {
  name: 'first_group',
  description: 'This is the first group'
};
export const user = {
  username: 'tomipaul',
  email: 'tomi@paul.com',
  phoneNo: '353275632723',
  password: '123456',
  token: '12234432653553232'
};
export const message = {
  text: 'This is a message',
  priority: 'urgent'
};
export const usersThatHaveReadMessage = [
  {
    createdAt: '2017-08-28 12:30:00.377+01',
    updatedAt: '2017-08-30 16:51:23.131+01',
    MessageId: 1,
    UserUsername: 'tomipaul',
    GroupId: 1,
    read: true
  },
  {
    createdAt: '2017-08-28 12:30:00.377+01',
    updatedAt: '2017-08-30 16:51:23.131+01',
    MessageId: 1,
    UserUsername: 'alienyi01',
    GroupId: 2,
    read: true
  }
];
export const unreadMessages = {
  first: ['3', '4'],
  second: ['4', '3']
};
export const allUsers = [
  {
    username: 'tomipaul',
    email: 'tomi@paul.com',
    phoneNo: '00009992992',
    status: 'user'
  },
  {
    username: 'emeka',
    email: 'emeka@andela.com',
    phoneNo: '0567577785875',
    status: 'user'
  },
];
export const state = {
  unreadMessages,
  auth: {
    isAuthenticated: true,
    user: {
      username: 'tomipaul',
      email: 'tomi@paul.com',
      phoneNo: '00009992992',
      status: 'user'
    }
  },
  activeGroup: 'first',
  userGroups: {
    groups: {
      first: { id: 'first', name: 'group23', description: 'this is group 23' },
      second: { id: 'second', name: 'group24', description: 'this is group 24' }
    },
    groupsById: ['first', 'second']
  }
};
export const savedMessage = {
  id: '62abb38b-6ce9-4ce6-b9f1-e2bee5bb8550',
  text: 'we are here',
  priority: 'critical',
  AuthorUsername: 'alienyi01',
  GroupId: 'first',
  updatedAt: '2017-09-10T09:25:50.316Z',
  createdAt: '2017-09-10T09:25:50.316Z',
  Author: {
    photoURL: null
  }
};

