export default (sequelize, DataTypes) => {
  const UserMessages = sequelize.define('UserMessages', {
    GroupId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return UserMessages;
};
