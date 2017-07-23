module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('UserReadMessages', {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      MessageId: {
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
          model: 'Messages',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      UserUsername: {
        primaryKey: true,
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'username'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      GroupId: {
        allowNull: false,
        type: Sequelize.UUID
      }
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('UserUnreadMessages');
  }
};
