const mongoose = require('mongoose');

/*
 * Dammika's Note:
 * This is the blueprint for our Users in the database. I included a 'role' field 
 * (Admin, Librarian, Member) so we can handle permissions later on. I also forced 
 * emails to be lowercase just to make searching and logging in foolproof.
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Librarian', 'Member'],
    default: 'Member'
  },
  membershipDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'Suspended', 'Expired'],
    default: 'Active'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
