module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('GroupUsers', {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      GroupId: {
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
          model: 'Groups',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      UserId: {
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('GroupUsers');
  }
};
