const express = require('express');

const usersController = require('../controllers/UserController');
const verifyToken = require('../middleware/verfiyToken');
const appError = require('../utils/appError');

const router = express.Router();

const multer = require('multer');

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    const fileName = `user-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split('/')[0];

  if (imageType === 'image') {
    return cb(null, true);
  } else {
    return cb(appError.create('file must be an image', 400), false);
  }
};

const upload = multer({
  storage: diskStorage,
  fileFilter,
});

// get all users

// register

// login
router.route('/SignUp').post(upload.single('avatar'), usersController.SignUp);

router.route('/login').post(usersController.login);
// router.route('/logout').get(usersController.Logout);
router.get('/logout', usersController.logout);

router.use(verifyToken);

router.route('/').get(usersController.getAllUsers);
router
  .route('/:UserID')
  .get(usersController.GetOne)
  .delete(usersController.DeleteOne)
  .patch(usersController.UpdateUser);

module.exports = router;
