const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
    validate: (value) => validator.isEmail(value)
  },
  password: {
    type: String,
    maxLength: 14,
    minLength: 8,
    required: true
  }
},{timestamps: true});

// Virtual for User full name
userSchema
  .virtual('fullName')
  .get(() =>`${this.firstName}  ${this.lastName}`);

// Virutual for User url
userSchema
  .virtual('url')
  .get(()=>'catalog/user/'+this._id);

const User = new mongoose.model('User',userSchema);

module.exports = User;
