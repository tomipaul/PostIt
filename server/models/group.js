export default (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      validate: {
        isUUID: {
          args: 4,
          msg: 'id must be uuid'
        }
      }
    },
    name: {
      type: DataTypes.STRING(20),
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
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate(models) {
        Group.hasMany(models.Message);
        Group.belongsToMany(models.User, { through: 'GroupUsers' });
      }
    }
  });
  Group.associate = function associate(models) {
    Group.hasMany(models.Message);
    Group.belongsToMany(models.User, { through: 'GroupUsers' });
  };
  return Group;
};
