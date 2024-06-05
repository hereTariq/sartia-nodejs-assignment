const express = require('express');
require('dotenv').config();
const { PORT } = require('./constants/common');
const seedDatabase = require('./utils/dbSeeder');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

//error middleware
app.use(errorMiddleware);

seedDatabase()
    .then((pool) => {
        console.info('db connected');
        app.locals.db = pool;
        app.listen(PORT, () =>
            console.info('server is up on http://localhost:' + PORT)
        );
    })
    .catch((err) => {
        console.error('Failed to initialize database: ', err);
    });
