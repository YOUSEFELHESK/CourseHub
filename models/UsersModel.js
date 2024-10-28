const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../utils/userRoles');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'filed must be a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please, Provide a password'],
    minlength: [8, 'Minlength is 8 characters!!'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please, Confirm your password'],
    validate: {
      // this only works with CREATE & SAVE!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
    select: false,
  },
  token: {
    type: String,
  },
  role: {
    type: String, // ["USER", "ADMIN", "MANGER"]
    enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANGER],
    default: userRoles.USER,
  },
  avatar: {
    type: String,
    default: 'uploads/profile.png',
  },
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

module.exports = mongoose.model('User', userSchema);
