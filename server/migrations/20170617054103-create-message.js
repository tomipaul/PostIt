module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Messages', {
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
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Message cannot be empty'
          },
        }
      },
      priority: {
        type: Sequelize.STRING,
        defaultValue: 'normal',
        allowNull: false,
        validate: {
          isIn: {
            args: [['normal', 'urgent', 'critical']],
            msg: 'priority is invalid'
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      GroupId: {
        type: Sequelize.UUID,
        references: {
          model: 'Groups',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      AuthorUsername: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'username'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      }
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('Messages', { cascade: true });
  }
};
