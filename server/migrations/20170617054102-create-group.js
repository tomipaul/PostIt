module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Groups', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        validate: {
          isUUID: {
            args: 4,
            msg: 'id must be uuid'
          }
        }
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Group name cannot be an empty string'
          },
          is: {
            args: /^[a-z1-9_]+$/i,
            msg: 'Name can contain only letters, numbers and underscores'
          }
        }
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      CreatorUsername: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'username'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('Groups', { cascade: true });
  }
};
