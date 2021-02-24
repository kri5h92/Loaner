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


// Path for validation of unique email
userSchema.path('email').validate(async(value) => {
  const emailCount = await mongoose.model('User').count({email: value });
  return !emailCount; // if count greater than zero invalidate
}, 'Email already exists');

const User = new mongoose.model('User',userSchema);

module.exports = User;
