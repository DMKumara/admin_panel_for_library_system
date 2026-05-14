const mongoose = require('mongoose');

/*
 * Dammika's Note:
 * This is the Mongoose Schema for our books. I made sure to add 'trim: true' everywhere 
 * so we don't save accidental blank spaces in the database. I also set up some 
 * specific enums for the 'status' field so people can't invent random book statuses!
 */
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['Available', 'Borrowed', 'Reserved'],
    default: 'Available'
  },
  publishedYear: {
    type: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
