require('dotenv').config();

const {
  DB_USERNAME,
  password,
  database,
  host
} = process.env;

module.exports = {
  development: {
    password,
    database,
    host,
    username: DB_USERNAME,
    dialect: 'postgres'
  },
  test: {
    use_env_variable: 'URL_TEST',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'URL',
    dialect: 'postgres'
  }
};
