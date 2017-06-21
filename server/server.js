import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import groupRouter from './routes/GroupRoutes';
import userRouter from './routes/UserRoutes';

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(userRouter);
app.use(groupRouter);

const server = http.createServer(app);
export default server;
