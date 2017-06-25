import bcrypt from 'bcrypt';

const passwords = [
  'blockers',
  'shockers',
  'lockers',
  'dockers',
  'mockers'
];
const hashedPasswords = passwords.map((password) => {
  return bcrypt.hashSync(password, 10);
});
module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [{
      username: 'Tomi Paul',
      email: 'tomipaul95@gmail.com',
      password: hashedPasswords[0],
      phoneNo: '2348107976596',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Yaya Mark',
      email: 'yayamark@gmail.com',
      password: hashedPasswords[1],
      phoneNo: '2348107976597',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Makum Kaji',
      email: 'makumkaji@gmail.com',
      password: hashedPasswords[2],
      phoneNo: '2348107976598',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Phil Bone',
      email: 'philbone@gmail.com',
      password: hashedPasswords[3],
      phoneNo: '2348107976599',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Van Ejim',
      email: 'vanejim@gmail.com',
      password: hashedPasswords[4],
      phoneNo: '2348107976600',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
