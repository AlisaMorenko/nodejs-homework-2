const express = require('express');
const router = express.Router();
const controllerWrapper = require('../../middlewares/controllerWrapper.js');
const authenticate = require('../../middlewares/authenticate');
const upload = require('../../middlewares/upload');
const ctrl = require('../../controllers/avatars');

// router.get('./verify/:verificationToken', controllerWrapper(ctrl.verify));

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  controllerWrapper(ctrl.updateAvatar),
);

module.exports = router;
