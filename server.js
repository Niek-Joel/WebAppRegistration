import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import path from 'path';
import {fileURLToPath} from 'node:url';

// Routes
import sectionsRouter from './routes/sections.js';
import registrationsRouter from './routes/registrations.js';
import termsRouter from './routes/terms.js';

const app = express();
const PORT = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the public folder

// API routes
app.use('/api/sections', sectionsRouter);
app.use('/api/registrations', registrationsRouter);
app.use('/api/terms', termsRouter);

// DB connection
let db = new sqlite3.Database('./store/jsu_sp26.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log("Connected to Database");
    }
});

// Make db available to routes
app.locals.db = db;

// Start server
app.listen(PORT, () => {
    console.log(`Scheduling server running on http://localhost:${PORT}`);
    console.log('API server on http://localhost:8080/api');
    console.log('Front end on http://localhost:3000/');
});

// When interrupted, close the database
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        else {
            console.log('Database closed.');
        }
    });
    process.exit(0);  // Successful exit
});
