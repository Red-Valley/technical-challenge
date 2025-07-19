import express from 'express';
import morgan from 'morgan';

/**
 * Server
 */
const app = express();

/**
 * Settings
 */
const port = process.env.PORT || 3000;

/**
 * Middlewares
 */
app.use(morgan('dev'));
app.use(express.json());

/**
 * Routes
 */
app.get('/api/greet', (req, res) => {
    res.json('Hello, TypeScript Express!');
});

/**
 * Execution
 */
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
