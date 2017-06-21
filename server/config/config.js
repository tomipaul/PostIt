import dotenv from 'dotenv';

dotenv.config();
const { URL, USERNAME, PASSWORD, DATABASE_NAME, HOST } = process.env;
export default {
  development: {
    database_url: URL,
    username: 'postgres',
    password: 'admin',
    database: 'PostIt',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    database_url: URL,
    username: 'postgres',
    password: null,
    database: 'PostIt_test',
    host: '127.0.0.1',
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
