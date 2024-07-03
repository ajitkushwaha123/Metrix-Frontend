import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/connection.js';
import router from './router/route.js';

const app = express();

app.use(express.json({ limit: '50mb' })); // Parse JSON body first
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors()); // Enable CORS
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 8000;

app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});

// API routes
app.use('/api', router);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

connect().then(() => {
    app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
    });
}).catch(error => {
    console.log("Invalid database connection!");
});
