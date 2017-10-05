import path from 'path';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import groupRouter from './routes/GroupRoutes';
import authRouter from './routes/AuthRoutes';
import userRouter from './routes/UserRoutes';
import errorHandler from './controllers/errorHandler';
import SSEMiddleware from './controllers/SSE';

const app = express();

// keep an array of response instances
app.locals.connections = [];

// Write to all saved connections at every 3 seconds interval
setInterval(() => {
  app.locals.connections
  .forEach((connection) => {
    connection.write(`: ${JSON.stringify('PING')}\n\n`);
  });
}, 3000);

// mount all middlewares and handlers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.static(path.resolve(__dirname, '../client/bin')));
app.get('/api/doc', (req, res) => {
  res.sendFile(path.resolve(__dirname,
  '../client/bin/build/index.html'));
});
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(SSEMiddleware);
app.use(authRouter);
app.use(userRouter);
app.use(groupRouter);
app.get('/api/stream', (req, res) => {
  res.sseSetup();
  app.locals.connections.push(res);
});
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/bin/index.html'));
});
app.use(errorHandler());

const server = http.createServer(app);
export default server;
