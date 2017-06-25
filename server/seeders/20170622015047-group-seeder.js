module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Groups', [{
      id: 'cc4022a6-7b42-45cb-ac34-0076a22032d3',
      name: 'FirstGroup',
      description: 'The beginning',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '6c8b1858-604a-44f6-a37c-0cbd678b2800',
      name: 'FidelityGroup',
      description: 'We are a group, we keep our word',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '8a317435-f509-4cc2-9ebd-1a2190a30670',
      name: 'AccessGroup',
      description: 'Happy people, Happy Group',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '5223abfd-97ef-4bbf-ba67-a351e3e09faf',
      name: 'ZenithGroup',
      description: 'In your best interest, join our group',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '46b2e248-43a0-4868-ab94-7b5928c7f3f9',
      name: 'GTGroup',
      description: "Wouldn't you rather join our group?",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Groups', null, {});
  }
};
