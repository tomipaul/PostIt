import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import groupRoutes from './routes/GroupRoutes';
import userRoutes from './routes/UserRoutes';

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use('/api/group', groupRoutes);
app.use('/api/user', userRoutes);

const server = http.createServer(app);
export default server;
