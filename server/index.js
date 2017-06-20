import dotenv from 'dotenv';
import './CreateRSAKeyFile';
import models from './models';
import app from './server';

dotenv.config();
dotenv.config({ path: `${__dirname}/key/rsapair.pem` });
const port = process.env.PORT || 8080;
if (process.env.NODE_ENV === 'development') {
  models.sequelize.sync({ force: true })
  .then(() => {
    app.listen(port, () => {
      //eslint-disable-next-line
      console.log(`Server started on ${port}`);
    });
  });
} else {
  app.listen(port, () => {
    //eslint-disable-next-line
    console.log(`Server started on ${port}`);
  });
}

