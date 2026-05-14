/*
 * Dammika's Note:
 * This is the main entry point for our Express backend. I've set it up to bring in
 * the database connection, configure CORS so our frontend can talk to it without 
 * security blocks, and route the `/api/books` and `/api/users` endpoints to their 
 * respective files. Let's get this server running!
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Library Admin Panel API' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
