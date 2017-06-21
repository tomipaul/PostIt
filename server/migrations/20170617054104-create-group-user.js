export default {
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
      UserUsername: {
        primaryKey: true,
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'username'
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
