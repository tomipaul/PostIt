import dotenv from 'dotenv';
import winston from 'winston';
import './CreateRSAKeyFile';
import app from './server';

dotenv.config();
dotenv.config({ path: `${__dirname}/key/rsapair.pem` });
const port = process.env.PORT || 8080;
winston.configure({
  transports: [
    new (winston.transports.File)({ filename: 'server.log' })
  ]
});

app.listen(port, () => {
  winston.log('info', `Server started on ${port}`);
});

export default app;
