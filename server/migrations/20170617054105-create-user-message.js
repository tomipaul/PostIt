module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('UserMessages', {
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
      UserId: {
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      GroupId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('UserMessages');
  }
};
