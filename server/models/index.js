import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import config from '../config/config';

dotenv.config();
const env = process.env.NODE_ENV || 'development';
const basename = path.basename(module.filename);
const envConfig = config[env];
const db = {};

const sequelize = (envConfig.use_env_variable) ?
new Sequelize(process.env[envConfig.use_env_variable])
: new Sequelize(
  envConfig.database, envConfig.username, envConfig.password, envConfig);

fs
.readdirSync(__dirname)
.filter((file) => {
  return (file.indexOf('.') !== 0) &&
  (file !== basename) &&
  (file.slice(-3) === '.js');
})
.forEach((file) => {
  const model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
