import User from "../model/userModel.js";
import Course from "../model/coursesModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

// GET all users - admin only
export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  if (!users || users.length === 0) {
    return next(new AppError("No users found in the system.", 404));
  }

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

// DELETE user by ID - admin only
export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    message: "User deleted successfully.",
    data: null,
  });
});

// GET single user - admin only
export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

// UPDATE user - admin only (not for password)
export const updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("This route is not for password updates", 400));
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "User updated successfully.",
    data: {
      user: updatedUser,
    },
  });
});

// GET current user
export const getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

// UPDATE current user
export const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("This route is not for password updates", 400));
  }

  const allowedFields = { name: req.body.name, email: req.body.email };
  const updatedUser = await User.findByIdAndUpdate(req.user.id, allowedFields, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    message: "Your account was updated successfully.",
    data: {
      user: updatedUser,
    },
  });
});

// DEACTIVATE current user
export const deactivateMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    message: "Your account has been deactivated successfully.",
    data: null,
  });
});
