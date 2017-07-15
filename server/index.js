import dotenv from 'dotenv';
import './CreateRSAKeyFile';
import app from './server';

dotenv.config();
dotenv.config({ path: `${__dirname}/key/rsapair.pem` });
const port = process.env.PORT || 8080;

app.listen(port, () => {
  //eslint-disable-next-line
  console.log(`Server started on ${port}`);
});

export default app;
