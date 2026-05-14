const mongoose = require('mongoose');

/*
 * Dammika's Note:
 * I pulled the database connection logic out into this file to keep `server.js` clean.
 * We're connecting to MongoDB Atlas here. Notice how if the connection fails, 
 * it triggers `process.exit(1)`? That's intentional—no point in running the backend 
 * if we don't have a database to talk to!
 */
const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/library_admin';
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
