const object = (sequelize, DataTypes) => {
  const Object = sequelize.define('object', {
    id: {
      primaryKey: true,
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
  });

  return Object;
};

export default object;
