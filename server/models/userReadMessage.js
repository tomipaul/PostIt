export default (sequelize, DataTypes) => {
  const UserReadMessages = sequelize.define('UserReadMessages', {
    GroupId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  });
  return UserReadMessages;
};
