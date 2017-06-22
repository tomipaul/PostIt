module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Messages', [{
      id: '1501cb03-26e0-4462-9bf1-5175fb3124f9',
      text: 'Who will bell the cat',
      priority: 'normal',
      AuthorUsername: 'Tomi Paul',
      GroupId: '46b2e248-43a0-4868-ab94-7b5928c7f3f9',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '83b6f91f-b8af-48e9-8305-a7757f6f862e',
      text: 'The devil is in the details',
      priority: 'normal',
      AuthorUsername: 'Makum Kaji',
      GroupId: '5223abfd-97ef-4bbf-ba67-a351e3e09faf',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'ab9cedf5-c5e6-4936-909b-e717f8527b2e',
      text: 'He who comes to equity',
      priority: 'normal',
      AuthorUsername: 'Yaya Mark',
      GroupId: '8a317435-f509-4cc2-9ebd-1a2190a30670',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '13cab63f-6ddd-4dfc-9b14-a5c408768d0b',
      text: 'Like a woman scorned',
      priority: 'critical',
      AuthorUsername: 'Van Ejim',
      GroupId: '6c8b1858-604a-44f6-a37c-0cbd678b2800',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '49d8baac-a006-4bce-acc3-45c942f695a2',
      text: "Couldn't put Humpty together again",
      priority: 'urgent',
      AuthorUsername: 'Phil Bone',
      GroupId: 'cc4022a6-7b42-45cb-ac34-0076a22032d3',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Messages', null, {});
  }
};
