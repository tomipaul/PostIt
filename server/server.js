import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import groupRouter from './routes/GroupRoutes';
import authRouter from './routes/AuthRoutes';
import userRouter from './routes/UserRoutes';

const app = express();
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(authRouter);
app.use(userRouter);
app.use(groupRouter);

const server = http.createServer(app);
export default server;
