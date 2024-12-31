import express from 'express';
import morgan from 'morgan';
import connect from './database/db.js';
import userRoutes from './routes/user.routes.js';

connect()

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);

app.get('/', (req, res)=> {
    res.send('Good Morning!');
});

export default app;