export default (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      validate: {
        isUUID: {
          args: 4,
          msg: 'id must be uuid'
        }
      }
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Message cannot be empty'
        },
      }
    },
    priority: {
      type: DataTypes.STRING,
      defaultValue: 'normal',
      validate: {
        isIn: {
          args: [['normal', 'urgent', 'critical']],
          msg: 'priority is invalid'
        }
      }
    },
  });
  Message.associate = function associate(models) {
    Message.belongsTo(models.User, {
      as: 'Author',
      onDelete: 'SET NULL'
    });
    Message.belongsToMany(models.User, {
      through: 'UserUnreadMessages'
    });
  };
  return Message;
};
