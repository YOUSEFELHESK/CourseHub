import express from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getMe,
  updateMe,
  deactivateMe,
} from "../controllers/userControllers.js";

import {
  signup,
  login,
  protect,
  restrictTo,
} from "../controllers/authControllers.js";

const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/login", login);

// Routes for logged in users
router.use(protect); // All the routes below will be protected (logged-in users only)

router.get("/me", getMe, getUser); // Get the current user's data
router.patch("/updateMe", updateMe); // Update current user's data
router.delete("/deactivateMe", deactivateMe); // Deactivate the current user's account

// Admin-only routes
router.use(restrictTo("admin")); // All the routes below will be for admin users only

// Routes to get all users and manage specific users
router.route("/").get(getAllUsers); // Get all users

router
  .route("/:id")
  .get(getUser) // Get specific user
  .patch(updateUser) // Update user data (only for admin)
  .delete(deleteUser); // Delete a user (only for admin)

// Middleware to ensure the user is trying to update their own data
router.patch("/updateMe", protect, async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return res.status(403).json({
      status: "fail",
      message: "You can only update your own profile!",
    });
  }
  next();
});

// Middleware to ensure the user is trying to deactivate their own account
router.delete("/deactivateMe", protect, async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return res.status(403).json({
      status: "fail",
      message: "You can only deactivate your own account!",
    });
  }
  next();
});

export default router;
