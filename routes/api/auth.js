const express = require('express');
const router = express.Router();
const controllerWrapper = require('../../middlewares/controllerWrapper.js');
const authenticate = require('../../middlewares/authenticate');

const cntrl = require('../../controllers/auth');
//
router.post('/signup', controllerWrapper(cntrl.signup));
router.post('/login', controllerWrapper(cntrl.login));
router.get('/logout', authenticate, controllerWrapper(cntrl.logout));
router.get('/current', authenticate, controllerWrapper(cntrl.current));

module.exports = router;
