const express = require('express');
const router = express.Router();
const controllerWrapper = require('../../middlewares/controllerWrapper');

const ctrl = require('../../controllers/verify');

router.get('/verify/:verificationToken', controllerWrapper(ctrl.verify));
router.post('/verify', controllerWrapper(ctrl.subVerify));

module.exports = router;
