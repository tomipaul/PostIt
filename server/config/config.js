import dotenv from 'dotenv';

dotenv.config();
const {
  username,
  password,
  database,
  host
} = process.env;

export default {
  development: {
    username,
    password,
    database,
    host,
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
