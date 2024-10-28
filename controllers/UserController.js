const asyncWrapper = require('../middleware/asyncWrapper');
const User = require('../models/UsersModel');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateJWT = require('../utils/generateJWT');
const { findById } = require('../models/CourseModel');
const { Result } = require('express-validator');
const { updateCourse } = require('./CoursesConstroller');

const getAllUsers = asyncWrapper(async (req, res) => {
  const query = req.query;

  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  // get all courses) from DB using Course Model
  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);

  res.json({
    status: httpStatusText.SUCCESS,
    Result: users.length,
    data: { users },
  });
});

const SignUp = asyncWrapper(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    // passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
  });

  // generate JWT token
  const token = await generateJWT({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role,
  });
  newUser.token = token;

  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { user: newUser } });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && !password) {
    const error = appError.create(
      'email and password are required',
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const user = await User.findOne({ email: email }).select('+password');

  if (!user) {
    const error = appError.create('user not found', 400, httpStatusText.FAIL);
    return next(error);
  }

  const matchedPassword = await bcrypt.compare(password, user.password);

  if (user && matchedPassword) {
    // logged in successfully

    const token = await generateJWT({
      email: user.email,
      id: user._id,
      role: user.role,
    });

    return res.json({ status: httpStatusText.SUCCESS, data: { token } });
  } else {
    const error = appError.create('something wrong', 500, httpStatusText.ERROR);
    return next(error);
  }
});

const GetOne = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.UserID);
  if (!user) {
    const error = appError.create('course not found', 404, httpStatusText.FAIL);
    return next(error);
  }
  return res.json({ status: httpStatusText.SUCCESS, data: { user } });
});

const DeleteOne = asyncWrapper(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.UserID);
  if (!user) {
    return next(new appError('No document found with that ID', 404));
  }
  res.status(204).json({
    status: httpStatusText.SUCCESS,
    data: null,
  });
});
const UpdateUser = asyncWrapper(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.UserID, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new appError('No document found with that ID', 404));
  }

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: user,
  });
});

const logout = asyncWrapper(async (req, res, next) => {
  // إعداد ملف تعريف الارتباط jwt ليكون 'loggedout'
  res.cookie('JWT', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000), // ينتهي بعد 10 ثوانٍ
    httpOnly: true, // يجعل ملف تعريف الارتباط غير قابل للوصول من JavaScript
    secure: process.env.NODE_ENV === 'production', // إرسال الملف عبر HTTPS فقط في بيئة الإنتاج
    sameSite: 'Strict', // منع إرسال الملف في الطلبات عبر المواقع
  });

  res
    .status(200)
    .json({ status: 'success', message: 'Logged out successfully' });
});

module.exports = {
  getAllUsers,
  SignUp,
  login,
  GetOne,
  DeleteOne,
  UpdateUser,
  logout,
};
