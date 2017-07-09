module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: {
          args: true,
          msg: 'username is not available!'
        },
        validate: {
          notEmpty: {
            msg: 'username cannot be an empty string'
          },
          isAlphanumeric: {
            msg: 'username can only contain letters and numbers'
          },
          len: {
            args: [3, 25],
            msg: 'username cannot be longer than 25 characters'
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'email is invalid',
          },
          len: {
            args: [5, 254],
            msg: 'email has invalid length'
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 255],
            msg: 'password must be at least six characters long'
          }
        }
      },
      phoneNo: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'mobile number cannot be an empty string'
          },
          isNumeric: {
            msg: 'mobile number is invalid'
          }
        }
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'user'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('Users');
  }
};
