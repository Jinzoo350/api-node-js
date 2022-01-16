import Sequelize from 'sequelize';
import path from 'path';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
    host: 'localhost',
    define: {
      freezeTableName: true,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    },
  },
);

const models = {
  Object: require(path.join(__dirname, 'object.js')).default(
    sequelize,
    Sequelize.DataTypes,
  ),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
