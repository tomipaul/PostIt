import dotenv from 'dotenv';

dotenv.config();
const { URL, USERNAME, PASSWORD, DATABASE_NAME, HOST } = process.env;
const {
  USERNAME_TEST,
  PASSWORD_TEST,
  DATABASE_NAME_TEST,
  HOST_TEST
} = process.env;

export default {
  development: {
    username: 'postgres',
    password: 'admin',
    database: 'PostIt',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: USERNAME_TEST,
    password: PASSWORD_TEST,
    database: DATABASE_NAME_TEST,
    host: HOST_TEST,
    dialect: 'postgres'
  },
  production: {
    database_url: URL,
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE_NAME,
    host: HOST,
    dialect: 'postgres'
  }
};
